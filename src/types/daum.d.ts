interface DaumPostcodeData {
	zonecode: string;
	roadAddress: string;
	jibunAddress: string;
	userSelectedType: "R" | "J";
}

interface PostcodeOptions {
	oncomplete: (data: DaumPostcodeData) => void;
}

interface DaumPostcodeConstructor {
	new (options: PostcodeOptions): {
		open: (options?: { popupKey?: string }) => void;
	};
}

interface Daum {
	Postcode: DaumPostcodeConstructor;
}

declare global {
	interface Window {
		daum: Daum;
	}
}

export {};
