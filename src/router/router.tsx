import { createBrowserRouter, Outlet, redirect } from "react-router-dom";
import AppProvider from "../providers/AppProvider";
import AppLayout from "../layouts/AppLayout";
import Login from "../pages/Login";
import BoardPage from "../pages/BoardPage";

// ✅ 로그인 여부 검사
const requireAuth = () => {
	const token = localStorage.getItem("accessToken");
	if (!token) {
		// alert("로그인이 필요한 페이지입니다.");
		return redirect("/?message=need_login"); // 로그인 페이지로 쿼리로 페이지에서 알람 띄워주기
	}
	return null;
};

const router = createBrowserRouter([
	{
		/* 로그인 */
		path: "/",
		element: (
			<AppProvider>
				<AppLayout>
					<Outlet />
				</AppLayout>
			</AppProvider>
		),
		children: [
			{
				path: "/",
				element: <Login />,
			},
			{
				path: "/board",
				element: <BoardPage />,
				loader: requireAuth,
			},
		],
	},
]);

export default router;
