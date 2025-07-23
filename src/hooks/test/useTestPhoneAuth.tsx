/* 테스트 휴대폰인증 */
import { useMutation } from "@tanstack/react-query";
import { post_urlFormData } from "../../api/axiosFilter";
import { ENDPOINTS } from "../../api/endpoints";

export default function useTestPhoneAuth() {
	return useMutation({
		mutationFn: async ({ phone }: { phone: string }) => (await post_urlFormData(ENDPOINTS.TEST_PHONE_AUTH, { phone })).data,
	});
}
