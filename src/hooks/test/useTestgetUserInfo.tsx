/* 테스트 유저정보 가져오기 */
import { useQuery } from "@tanstack/react-query";
import { get_normal } from "../../api/apiFilter";
import { API_URL } from "../../api/endpoints";

export default function useTestgetUserInfo(id: string) {
	return useQuery({
		queryKey: ["testGetUserInfo", { id }],
		queryFn: () => get_normal(API_URL.TEST_USER, { id }),
		select: (res) => res.data,
	});
}
