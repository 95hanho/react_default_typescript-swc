import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

// react-query 사용하기 위한 컴포넌트
export default function QueryProvider({ children }: Readonly<{ children: React.ReactNode }>) {
	const [queryClient] = useState(() => new QueryClient());

	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
