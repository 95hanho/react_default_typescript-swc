// 타이머 '분:초' 텍스트
export const getTimerText = (millisecond: number): string => {
	const totalSeconds = millisecond / 1000;
	const minutes = Math.floor(totalSeconds / 60);
	const seconds = totalSeconds % 60;
	return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};
// 타이머 시작
/*
export const startTimer = (timerIndex: number, curTimer: number) => {
	clearInterval(timerIndex);
	let newTimerIndex = 0;
	newTimerIndex = window.setInterval(() => {
		curTimer -= 1000;
		if (curTimer === 0) {
			clearInterval(newTimerIndex);
		}
	}, 1000);
	return timerIndex;
};
*/
