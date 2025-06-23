/* 전체로딩 */
import { useAppSelector } from "../app/storeHooks";
import styled from "@emotion/styled";

const LodingWrap = styled.div`
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	display: flex;
	align-items: center;
	justify-content: center;
`;

export default function AllLoding() {
	const lodingOn = useAppSelector((state) => state.loding.ing);

	if (lodingOn) {
		return (
			<LodingWrap className="loding-wrap">
				<div>로딩 아이콘</div>
			</LodingWrap>
		);
	}
}
