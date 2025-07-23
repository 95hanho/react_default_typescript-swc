// 휴대폰 번호 정규표현식
export const phoneRegexp = /^01[016789][0-9]{3,4}[0-9]{4}$/;
// 이메일 정규표현식
export const emailRegexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
// 한글, 영문, 숫자만
export const validWordsRegexp = /[가-힣a-zA-Z0-9]+/g;
