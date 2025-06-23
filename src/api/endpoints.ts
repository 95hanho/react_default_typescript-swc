// API 엔드포인트 목록 - API url 모음집, pathstring은 ':변수명' 이렇게 쓰기
// const API_ENDPOINTS = {

const test_auth = "/bapi/auth";
const test_board = "/bapi/board";

export const API_URL = {
	// 테스트
	TEST_USER: test_auth, // 유저정보가져오기, 로그인
	TEST_ID_DUPL_CHECK: test_auth + "/id", // 아이디중복확인
	TEST_PHONE_AUTH: test_auth + "/phone", // 휴대폰 인증
	TEST_USER_JOIN: test_auth + "/member", // 회원가입
	TEST_USER_TOKEN: test_auth + "/token", // 토큰재발급
	TEST_BOARD: test_board, // 게시물리스트
};
