import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const getCookie = (name: string): string => cookies.get(name);
export const setCookie = (name: string, value: string, seconds: number) => {
	cookies.set(name, value, {
		path: "/",
		secure: true,
		expires: new Date(Date.now() + seconds * 1000),
	});
};
export const removeCookie = (name: string) => {
	cookies.remove(name);
};
export const hasCookie = (name: string): boolean => {
	return cookies.get(name) ? true : false;
};
