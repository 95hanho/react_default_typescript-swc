import { createContext } from "react";
import type { AuthContextType } from "../types/auth";

// 인증관련 컨텍스트
export const authContext = createContext<AuthContextType | null>(null);
