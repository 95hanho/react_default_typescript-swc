import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AxiosInterceptor from "./AxiosInterceptor";
import AuthProvider from "./AuthProvider";

export default function AppProvider({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<>
			<AuthProvider>
				<AxiosInterceptor>{children}</AxiosInterceptor>
			</AuthProvider>
			{import.meta.env.VITE_ENV == "dev" && (
				/* 데이터확인용 */
				<ReactQueryDevtools />
			)}
		</>
	);
}
