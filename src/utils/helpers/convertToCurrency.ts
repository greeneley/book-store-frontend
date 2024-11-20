export const convertToCurrency = (input: number): string => {
	return new Intl.NumberFormat().format(input) + " VND";
};
