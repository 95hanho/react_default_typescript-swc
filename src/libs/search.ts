import { validWordsRegexp } from "./regexp";

export const getSearchListFilter = <T extends string | Record<string, unknown>>(
	originalList: T[],
	searchText: string,
	key?: T extends string ? never : keyof T
): T[] => {
	return originalList.filter((v) => {
		const searchingUnit = typeof v === "string" ? v : key ? String(v[key]) : "";
		if (searchingUnit.replace(validWordsRegexp, "").includes(searchText)) return true;
		return false;
	});
};
