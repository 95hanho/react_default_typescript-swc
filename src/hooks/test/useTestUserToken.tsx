/* 테스트 토큰 재발급 */
import { useMutation } from "@tanstack/react-query";
import { post_urlFormData } from "../../api/apiFilter";
import { API_URL } from "../../api/endpoints";

export default function useTestUserToken() {
	return useMutation({
		mutationFn: async (obj: { refresh_token: string }) => (await post_urlFormData(API_URL.TEST_USER_TOKEN, obj)).data,
	});
}
