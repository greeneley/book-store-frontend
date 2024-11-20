const pad = (v: number): any => {
	return v < 10 ? "0" + v : v;
};

export const getDateStringFormat = (date: Date): string => {
	const year = date.getFullYear();
	const month = pad(date.getMonth() + 1);
	const day = pad(date.getDate());
	const hour = pad(date.getHours());
	const min = pad(date.getMinutes());
	const sec = pad(date.getSeconds());
	return year + month + day + hour + min + sec;
};
