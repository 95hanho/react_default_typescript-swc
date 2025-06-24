import { API_URL } from "./endpoints";

async function logJSONData() {
	const response = await fetch(API_URL.TEST_USER);
	const jsonData = await response.json();
	console.log(jsonData);
}

// POST 메서드 구현 예제
async function postData(url = "", data = {}) {
	// 옵션 기본 값은 *로 강조
	const response = await fetch(url, {
		method: "POST", // *GET, POST, PUT, DELETE 등
		mode: "cors", // no-cors, *cors, same-origin
		cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
		credentials: "same-origin", // include, *same-origin, omit
		headers: {
			"Content-Type": "application/json",
			// 'Content-Type': 'application/x-www-form-urlencoded',
		},
		redirect: "follow", // manual, *follow, error
		referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
		body: JSON.stringify(data), // body의 데이터 유형은 반드시 "Content-Type" 헤더와 일치해야 함
	});
	return response.json(); // JSON 응답을 네이티브 JavaScript 객체로 파싱
}

// - mode: "no-cors"를 지정하면 요청에 사용할 수 있는 헤더 : Accept, Accept-Language, Content-Language,
// Content-Type는 application/x-www-form-urlencoded, multipart/form-data, 또는 text/plain 만 가능

postData("https://example.com/answer", { answer: 42 }).then((data) => {
	console.log(data); // JSON 데이터가 `data.json()` 호출에 의해 파싱됨
});

const controller = new AbortController();
const signal = controller.signal;
const url = "video.mp4";

const downloadBtn = document.querySelector("#download");
const abortBtn = document.querySelector("#abort");

downloadBtn?.addEventListener("click", async () => {
	try {
		const response = await fetch(url, { signal });
		console.log("다운로드 완료", response);
	} catch (error) {
		console.error(`다운로드 오류: ${error.message}`);
	}
});

abortBtn?.addEventListener("click", () => {
	controller.abort();
	console.log("다운로드 중단됨");
});
