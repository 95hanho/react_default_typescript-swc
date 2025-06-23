/* 메뉴바 */
import { Link, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import useAuth from "../hooks/context/useAuth";

const MenuBar = styled.div`
	padding: 0 20px;
`;

export default function Nav() {
	const navigate = useNavigate();
	const { loginOn, logout } = useAuth();

	return (
		<MenuBar className="nav">
			{loginOn && (
				<>
					<div>
						<button
							onClick={() => {
								logout();
								navigate("/");
							}}
						>
							로그아웃
						</button>
					</div>
					<Link to={"/board"}>board</Link>
				</>
			)}
		</MenuBar>
	);
}
