/**
 * 토큰이 만료됐는지
 * @param token JWT 토큰
 * @returns 토큰만료 true, 아니면 false
 */
export const isTokenExpired = (token: string): boolean => {
	if (!token) return true; // 토큰이 없으면 만료된 것으로 간주

	try {
		const payload = JSON.parse(atob(token.split(".")[1])); // payload 디코딩
		const exp = payload.exp * 1000; // 초 단위를 밀리초로 변환
		return Date.now() >= exp; // 현재 시간이 만료 시간을 넘었는지 확인
	} catch (error) {
		console.error("Invalid token", error);
		return true; // 디코딩 실패하면 만료된 것으로 처리
	}
};
