export type LoginData = {
	id: string;
	password: string;
};

export interface AuthContextType {
	loginOn: boolean;
	accessToken: string | null;
	loginToken: (aToken: string, rToken: string) => void;
	logout: () => void;
	reissueAccessToken: () => Promise<string>;
}
