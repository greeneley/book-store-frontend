export const useQueryKeys = {
	all: [""] as const,
	categories: ["categories"] as const,
	cart: ["cart"] as const,
	product: (id: number) => ["product", id] as const,
	productReviews: (productId: number) => ["productReviews", productId] as const,
	relatedProducts: (productId: number) => ["relatedProducts", productId] as const,
	wishlist: ["wishlist"] as const,
	wishlistCheck: (productId: number) => ["wishlistCheck", productId] as const
};
