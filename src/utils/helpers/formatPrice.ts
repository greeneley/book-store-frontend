export const formatPrice = (input: number): string => {
	return new Intl.NumberFormat("en-EN", { style: "currency", currency: "VND" }).format(input);
};
