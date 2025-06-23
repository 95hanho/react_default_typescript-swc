import { useContext } from "react";
import { authContext } from "../../contexts/authContext";
import type { AuthContextType } from "../../types/auth";

/* 인증컨텍스트 훅으로 가져오기 */
export default function useAuth(): AuthContextType {
	const context = useContext(authContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
}
