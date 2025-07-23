// 요청 Method별 빠른 처리하기 위한

import { instance } from "./instance";

type ParamValue =
	| string
	| number
	| boolean
	| Blob
	| File
	| FileList
	| (string | number | boolean | Blob | File)[] // 배열 지원
	| undefined;

type Params = Record<string, ParamValue>;
type Headers = Record<string, string>;

// API패턴 검사
const getInstance = (url: string) => {
	if (url.startsWith("/bapi")) {
		return instance; // Next.js API
	}
	throw new Error(`Invalid URL pattern: ${url}`);
};

// pathString 처리
const pathString_filter = (url: string, params?: Params): [string, Params | undefined] => {
	if (!params) return [url, params];
	url = url.replace(/:([^/]+)/g, (match: string, paramName: string) => {
		if (params[paramName] !== undefined) {
			const changeStr = params[paramName];
			delete params[paramName];
			return String(changeStr); // 문자열 치환이니까 string 변환 필요
		}
		return match;
	});
	return [url, params];
};
// 파라미터 처리
const toUrlSearchParams = (params: Params): URLSearchParams => {
	const searchParams = new URLSearchParams();
	for (const key in params) {
		const value = params[key];
		if (value === undefined) continue;

		if (Array.isArray(value)) {
			for (const item of value) {
				searchParams.append(key, String(item));
			}
		} else {
			searchParams.append(key, String(value));
		}
	}
	return searchParams;
};

// get
export const get_normal = (url: string, params?: Params, headers?: Headers) => {
	const instance = getInstance(url);
	[url, params] = pathString_filter(url, params);
	url = url.replace(/ /gi, "%20");
	const queryString = params && Object.keys(params).length > 0 ? `?${toUrlSearchParams(params).toString()}` : "";
	return instance.get(url + queryString, { headers });
};

// put urlFormData
export const put_urlFormData = (url: string, params: Params, headers?: Headers) => {
	const instance = getInstance(url);
	const [newUrl, newParams] = pathString_filter(url, params);
	url = newUrl;
	params = newParams!;
	const url_form_data = new URLSearchParams();

	for (const key in params) {
		const value = params[key];
		if (value === undefined) continue;

		if (Array.isArray(value)) {
			for (const v of value) {
				url_form_data.append(key, String(v));
			}
		} else if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
			url_form_data.append(key, String(value));
		} else {
			console.warn(`URLSearchParams does not support key "${key}" with value type "${typeof value}"`);
			// URLSearchParams doesn't support Blob/File/FileList
		}
	}
	return instance.put(url, url_form_data, { headers });
};

// download
export const get_download = (url: string, params?: Params, headers?: Headers) => {
	const instance = getInstance(url);
	[url, params] = pathString_filter(url, params);
	url = url.replace(/ /gi, "%20");
	const queryString = params && Object.keys(params).length > 0 ? `?${toUrlSearchParams(params).toString()}` : "";
	let headersObj: Headers = { responseType: "blob" };
	if (headers) {
		headersObj = {
			...headersObj,
			...headers,
		};
	}
	return instance.get(url + queryString, { headers: headersObj });
};

// post body
export const post_json = (url: string, params: Params, headers?: Headers) => {
	const instance = getInstance(url);
	const [newUrl, newParams] = pathString_filter(url, params);
	url = newUrl;
	params = newParams!;
	return instance.post(url, params, { headers });
};

// post formData
export const post_formData = (url: string, params: Params, headers?: Headers) => {
	const instance = getInstance(url);
	const [newUrl, newParams] = pathString_filter(url, params);
	url = newUrl;
	params = newParams!;

	const formData = new FormData();
	Object.entries(params).forEach(([key, value]) => {
		if (Array.isArray(value) || value instanceof FileList) {
			for (const v of value) {
				formData.append(key, v instanceof Blob ? v : String(v)); // 파일(File, Blob)이면 그대로 넘겨야 함.
			}
		} else if (value !== undefined) {
			formData.append(key, value instanceof Blob ? value : String(value)); // 파일(File, Blob)이면 그대로 넘겨야 함.
		}
	});

	return instance.post(url, formData, { headers });
};

// post urlFormData
export const post_urlFormData = (url: string, params: Params, headers?: Headers) => {
	const instance = getInstance(url);
	const [newUrl, newParams] = pathString_filter(url, params);
	url = newUrl;
	params = newParams!;
	const url_form_data = new URLSearchParams();

	for (const key in params) {
		const value = params[key];
		if (value === undefined) continue;

		if (Array.isArray(value)) {
			for (const v of value) {
				url_form_data.append(key, String(v));
			}
		} else if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
			url_form_data.append(key, String(value));
		} else {
			console.warn(`URLSearchParams does not support key "${key}" with value type "${typeof value}"`);
			// URLSearchParams doesn't support Blob/File/FileList
		}
	}

	return instance.post(url, url_form_data, { headers });
	// return;
	// const url_form_data = params ? `?${toUrlSearchParams(params).toString()}` : "";
	// return instance.post(url, url_form_data, headers);
};

// delete
export const delete_normal = (url: string, params?: Params) => {
	const instance = getInstance(url);
	[url, params] = pathString_filter(url, params);
	url = url.replace(/ /gi, "%20");
	const queryString = params && Object.keys(params).length > 0 ? `?${toUrlSearchParams(params).toString()}` : "";
	return instance.delete(url + queryString);
};
