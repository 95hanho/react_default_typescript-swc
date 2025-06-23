/* 테스트 게시판 가져오기 */
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { get_normal } from "../../api/apiFilter";
import { API_URL } from "../../api/endpoints";
import { AxiosError } from "axios";
import type { Board } from "../../types/board";

interface GetBoardResponse {
	msg: string;
	boardList: Board[];
}

export default function useTestGetBoards(): UseQueryResult<GetBoardResponse, AxiosError> {
	return useQuery({
		queryKey: ["testGetBoards"],
		queryFn: async () => (await get_normal(API_URL.TEST_BOARD)).data,
		retry: false, // ❌ 실패 시 자동 재요청 안 함
	});
}
