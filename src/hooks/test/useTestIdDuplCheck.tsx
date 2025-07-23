/* 아이디 중복확인 */
import { useMutation } from "@tanstack/react-query";
import { get_normal } from "../../api/axiosFilter";
import { ENDPOINTS } from "../../api/endpoints";

export default function useTestIdDuplCheck() {
	return useMutation({
		mutationFn: async (id: string) => (await get_normal(ENDPOINTS.TEST_ID_DUPL_CHECK, { id })).data,
	});
}
