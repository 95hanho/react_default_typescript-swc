// 요청 Method별 빠른 처리하기 위한

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
	[url, params] = pathString_filter(url, params);
	url = url.replace(/ /gi, "%20");
	const queryString = params && Object.keys(params).length > 0 ? `?${toUrlSearchParams(params).toString()}` : "";
	return fetch(url + queryString, {
		headers,
	});
};

// download
export const get_download = async (url: string, params?: Params, headers?: Headers) => {
	[url, params] = pathString_filter(url, params);
	url = url.replace(/ /gi, "%20");
	const queryString = params && Object.keys(params).length > 0 ? `?${toUrlSearchParams(params).toString()}` : "";

	const res = await fetch(url + queryString, {
		headers,
	});
	if (!res.ok) {
		let errorMessage = "파일 다운로드 실패";
		try {
			const contentType = res.headers.get("Content-Type") || "";
			if (contentType.includes("application/json")) {
				const json = await res.json();
				errorMessage = json?.msg || JSON.stringify(json);
			} else {
				errorMessage = await res.text();
			}
		} catch {
			// 파싱 실패 시 기본 메시지 유지
		}
		throw new Error(errorMessage);
	}

	const blob = await res.blob();
	return blob;
};

// post body
export const post_json = (url: string, params: Params, headers?: Headers) => {
	const [newUrl, newParams] = pathString_filter(url, params);
	url = newUrl;
	params = newParams!;
	return fetch(url, {
		method: "POST",
		body: JSON.stringify(params),
		headers: {
			"Content-Type": "application/json",
			...headers,
		},
	});
};

// post formData
export const post_formData = (url: string, params: Params, headers?: Headers) => {
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

	return fetch(url, {
		method: "POST",
		headers,
		body: formData,
	});
};

// post urlFormData
export const post_urlFormData = (url: string, params: Params, headers?: Headers) => {
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

	return fetch(url, {
		method: "POST",
		body: url_form_data.toString(),
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			...headers,
		},
	});
};

// put urlFormData
export const put_urlFormData = (url: string, params: Params, headers?: Headers) => {
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
	return fetch(url, {
		method: "PUT",
		body: url_form_data.toString(),
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			...headers,
		},
	});
};

// delete
export const delete_normal = (url: string, params?: Params) => {
	[url, params] = pathString_filter(url, params);
	url = url.replace(/ /gi, "%20");
	const queryString = params && Object.keys(params).length > 0 ? `?${toUrlSearchParams(params).toString()}` : "";
	return fetch(url + queryString, {
		method: "DELETE",
	});
};
