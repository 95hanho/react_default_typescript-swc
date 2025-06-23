import { useEffect } from "react";

export default function Notice() {
	console.log("Notice");

	useEffect(() => {}, []);

	return (
		<>
			<h2>Notice</h2>
			<div>
				<table>
					<thead>
						<tr>
							<th>아이디</th>
							<th>닉네임</th>
							<th>비번</th>
							<th>생성날짜</th>
							<th>토큰</th>
						</tr>
					</thead>
					<tbody></tbody>
				</table>
			</div>
		</>
	);
}
