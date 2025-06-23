/* 전체 레이아웃 */
import AllLoding from "../components/AllLoding";
import Nav from "../components/Nav";

export default function AppLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<>
			<Nav />
			{children}
			<AllLoding />
		</>
	);
}
