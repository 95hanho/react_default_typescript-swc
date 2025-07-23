// 주소 API
// <script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
interface AddressResult {
	zonecode: string;
	address: string;
}

export const onAddressPopup = async (): Promise<AddressResult> => {
	return new Promise((resolve) => {
		new window.daum.Postcode({
			oncomplete: (data) => {
				// 우편번호를 입력한다.
				const zonecode = data.zonecode;
				// 선택주소, 사용자가 도로명 주소를 선택했을 경우(R) : 사용자가 지번 주소를 선택했을 경우(J)
				const address = data.userSelectedType === "R" ? data.roadAddress : data.jibunAddress;
				resolve({
					zonecode,
					address,
				});
			},
		}).open({
			popupKey: "addpopup1",
		});
	});
};
