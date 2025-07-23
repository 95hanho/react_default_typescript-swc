// 번호만 리턴
export const onlyNumberReturn = (value: string): string => {
	const onlyNumbers = value.replace(/\D/g, "");
	return onlyNumbers;
};

// 포커스 가능한지
export const isFocusable = (el: HTMLElement): boolean => {
	const focusableSelectors = [
		"input:not([disabled])",
		"select:not([disabled])",
		"textarea:not([disabled])",
		"button:not([disabled])",
		"a[href]",
		'[tabindex]:not([tabindex="-1"])',
		'[contenteditable="true"]',
	];
	return el.matches(focusableSelectors.join(","));
};
// 스크롤/포커스, 시스템알람도 필요하면
export const scrollFocusAndAlert = (selector: string, ment?: string) => {
	const element = document.querySelector<HTMLElement>(selector);
	if (!element) return;
	const rect = element.getBoundingClientRect();
	const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
	const offsetTop = rect.top + scrollTop;
	const winHeight = window.innerHeight / 3;
	// 스크롤 이동
	window.scrollTo({
		top: offsetTop - winHeight,
		behavior: "smooth",
	});
	// alert 표시
	if (ment) alert(ment);
	// focus 가능한 경우에만 focus
	if (typeof element.focus === "function" && isFocusable(element)) {
		element.focus();
	}
};
