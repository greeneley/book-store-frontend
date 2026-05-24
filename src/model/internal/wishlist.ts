export interface WishlistItemResponse {
	productId: number;
	name: string;
	author: string;
	regularPrice: number;
	salePrice: number;
	thumbnailUrl: string | null;
	stock: number;
}
