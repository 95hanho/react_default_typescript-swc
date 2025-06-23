/* 게시판페이지 */
import { useEffect, useState } from "react";
import useTestGetBoards from "../hooks/test/useTestGetBoards";
import { useAppDispatch } from "../app/storeHooks";
import moment from "moment/moment";
import type { Board } from "../types/board";

export default function BoardPage() {
	const dispatch = useAppDispatch();
	const { data: boardsData, isSuccess, isError, isLoading, isFetched } = useTestGetBoards();

	const [boardList, set_boardList] = useState<Board[]>([]);

	useEffect(() => {
		if (isLoading) dispatch({ type: "loding/LODING_ON" });
		else if (isSuccess && boardsData) {
			console.log(boardsData.boardList);
			set_boardList(boardsData.boardList);
		}
		if (isError) console.log("오류오류!!");
		if (isFetched) dispatch({ type: "loding/LODING_OFF" });
	}, [boardsData, dispatch, isError, isLoading, isSuccess, isFetched]);

	return (
		<div id="board">
			{boardList.length == 0 ? (
				<p>데이터가 없습니다.</p>
			) : (
				<div>
					<table border={1}>
						<thead>
							<tr>
								<th>No.</th>
								<th>제목</th>
								<th>내용</th>
								<th>작성날짜</th>
								<th>이름</th>
							</tr>
						</thead>
						<tbody>
							{boardList.map((board) => (
								<tr key={"board-" + board.board_id}>
									<td>{boardList.length - board.board_id + 1}</td>
									<td>{board.title}</td>
									<td>{board.content}</td>
									<td>{moment(board.created_at).format("YYYY MM.DD mm:ss")}</td>
									<td>{board.name}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
}
