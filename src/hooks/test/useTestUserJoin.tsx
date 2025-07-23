/* 테스트 회원가입 */
import { useMutation } from "@tanstack/react-query";
import { post_urlFormData } from "../../api/axiosFilter";
import { ENDPOINTS } from "../../api/endpoints";
import type { LoginData } from "../../types/auth";

export default function useTestUserJoin() {
	return useMutation({
		mutationFn: async (obj: LoginData) => (await post_urlFormData(ENDPOINTS.TEST_USER_JOIN, { ...obj })).data,
	});
}
