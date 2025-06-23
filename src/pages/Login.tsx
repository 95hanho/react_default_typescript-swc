/* 로그인 페이지 */
import { useLocation, useNavigate } from "react-router-dom";
import useTestLogin from "../hooks/test/useTestLogin";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import useAuth from "../hooks/context/useAuth";
import type { LoginData } from "../types/auth";

const LoginMain = styled.div`
	padding: 30px;
`;

export default function Login() {
	const navigate = useNavigate();
	const location = useLocation();
	const query = new URLSearchParams(location.search);
	const message = query.get("message");

	const { loginToken, loginOn, logout } = useAuth();
	const { mutate: login } = useTestLogin();

	const [user, set_user] = useState<LoginData>({
		id: "hoseongs",
		password: "aaaaaa1!",
	});

	const login_before = (e: React.FormEvent) => {
		console.log("login_before");
		e.preventDefault();
		if (!user.id) {
			alert("아이디를 입력해주세요.");
			return;
		}
		if (!user.password) {
			alert("비밀번호를 입력해주세요.");
			return;
		}
		logout();
		login(
			{ ...user },
			{
				onSuccess(data) {
					console.log(data);
					// navigate("/1");
					loginToken(data.access_token, data.refresh_token);
				},
				onError(err) {
					console.log(err);
					if (err.status === 400 && err.response?.data?.msg) {
						alert(err.response?.data?.msg);
						return;
					}
					alert("서버 오류!!");
				},
			}
		);
	};

	useEffect(() => {
		if (message === "need_login") {
			alert("로그인이 필요한 메시지 입니다.");
			// 쿼리 파라미터 없이 현재 경로로 이동
			navigate(location.pathname, { replace: true });
		}
	}, [message, location.pathname, navigate]);

	if (!loginOn) {
		return (
			<LoginMain id="login">
				<form onSubmit={login_before}>
					<h4>로그인</h4>
					<div>
						아이디:{" "}
						<input
							type="text"
							value={user.id}
							onChange={(e) =>
								set_user((prev) => ({
									...prev,
									id: e.target.value,
								}))
							}
						/>
					</div>
					<div>
						비밀번호:{" "}
						<input
							type="password"
							autoComplete="false"
							value={user.password}
							onChange={(e) => set_user((prev) => ({ ...prev, password: e.target.value }))}
						/>
					</div>
					<div>
						<input type="submit" value={"로그인"} />
						{/* <input type="button" value={"회원가입"} onClick={() => navigate("/user/sign-up")} />{" "}
						<input type="button" value={"아이디찾기"} onClick={() => navigate("/user/sign-up")} />{" "}
						<input type="button" value={"비밀번호찾기"} onClick={() => navigate("/user/sign-up")} /> */}
					</div>
				</form>
			</LoginMain>
		);
	}
}
