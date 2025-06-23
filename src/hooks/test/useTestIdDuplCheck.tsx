/* 아이디 중복확인 */
import { useMutation } from "@tanstack/react-query";
import { get_normal } from "../../api/apiFilter";
import { API_URL } from "../../api/endpoints";

export default function useTestIdDuplCheck() {
	return useMutation({
		mutationFn: async (id: string) => (await get_normal(API_URL.TEST_ID_DUPL_CHECK, { id })).data,
	});
}
