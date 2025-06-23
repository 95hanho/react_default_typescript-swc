import { AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from "axios";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { instance } from "../api/instance";
import useAuth from "../hooks/context/useAuth";

interface RetryableAxiosRequestConfig extends InternalAxiosRequestConfig {
	_retry?: boolean;
}

let isRefreshing = false; // 재발급 중인지
let requestQueue: ((token: string) => void)[] = []; // 처리 못 한 요청함수들을 저장
const isBearerRequired = false; // Bearer 필요 여부를 조건으로 제어

export default function AxiosInterceptor({ children }: { children: React.ReactNode }) {
	const location = useLocation();
	const { accessToken, reissueAccessToken } = useAuth();

	// 요청 성공
	const requestFulfill = async (config: RetryableAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
		console.log(config.url);

		if (config?._retry) console.log("재시도 요청"); // undefined | true

		if (!config.headers.Authorization && accessToken) {
			console.log("accessToken =>", accessToken);
			config.headers.Authorization = isBearerRequired ? `Bearer ${accessToken}` : accessToken;
		}
		return config;
	};
	// 요청 에러
	const requestReject = (error: AxiosError): Promise<never> => {
		console.log(error.message + "--->>>" + error.config?.url);
		return Promise.reject(error);
	};
	// 응답 성공
	const responseFulfill = (response: AxiosResponse): AxiosResponse => {
		return response;
	};
	// 응답 에러
	const responseReject = async (error: AxiosError): Promise<never> => {
		// console.log(error);
		const originalRequest = error.config as RetryableAxiosRequestConfig;
		// console.log(originalRequest._retry); // 이게머지??

		// 액세스 토큰 만료 & 재시도 안 한 경우만 처리
		if (error.response?.status === 401 && !originalRequest._retry) {
			if (isRefreshing) {
				// 이미 재발급 중이면 Promise 대기
				return new Promise((resolve, reject) => {
					requestQueue.push((newToken: string) => {
						if (!newToken) {
							reject(error);
						} else {
							originalRequest.headers.Authorization = isBearerRequired ? `Bearer ${newToken}` : newToken;
							originalRequest._retry = true;
							resolve(instance(originalRequest));
						}
					});
				});
			}

			// 최초 재발급 시도
			originalRequest._retry = true;
			isRefreshing = true;

			try {
				const newToken = await reissueAccessToken();

				instance.defaults.headers.Authorization = isBearerRequired ? `Bearer ${newToken}` : newToken;

				// 대기 중이던 요청들 처리
				requestQueue.forEach((cb) => cb(newToken));
				requestQueue = [];
				isRefreshing = false;

				// 원래 요청 재시도
				originalRequest.headers.Authorization = isBearerRequired ? `Bearer ${newToken}` : newToken;
				return instance(originalRequest);
			} catch (refreshError) {
				// 재발급 실패 → 대기 중 요청들 모두 실패 처리
				requestQueue.forEach((cb) => cb(""));
				requestQueue = [];
				isRefreshing = false;

				// 로그아웃 처리 등
				console.error("토큰 재발급 실패");
				// window.location.href = "/login";
				return Promise.reject(refreshError);
			}
		}

		return Promise.reject(error);
	};

	const requestInterceptors = instance.interceptors.request.use(requestFulfill, requestReject);
	const responseInterceptors = instance.interceptors.response.use(responseFulfill, responseReject);
	useEffect(() => {
		return () => {
			instance.interceptors.request.eject(requestInterceptors);
			instance.interceptors.response.eject(responseInterceptors);
		};
	}, [location.pathname, requestInterceptors, responseInterceptors]);

	return children;
}
