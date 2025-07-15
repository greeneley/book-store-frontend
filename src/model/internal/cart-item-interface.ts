export interface CartItemInterface {
	productId: number;
	title: string;
	salePrice: number;
	regularPrice: number;
	quantity: number;
	image: string;
}

// Interface cho response từ API /api/v1/cart
export interface ProductCartResponse {
	id?: number; // ID của cart item (có thể không có trong response)
	product: ProductDto;
	quantity: number;
}

export interface ProductDto {
	id: number;
	name: string;
	description: string;
	regularPrice: string;
	salePrice: string;
	productImages: ProductImageDto[];
}

export interface ProductImageDto {
	image: ImageDto;
}

export interface ImageDto {
	id: number;
	title: string;
	url: string;
	altText: string;
}

// Interface cho cart response tổng thể
export interface CartResponse {
	id: number;
	userId: number;
	items: ProductCartResponse[];
	total: number;
	createdAt: string;
	updatedAt: string;
}
