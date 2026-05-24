import { User } from "@/model/internal/user";

export interface ProductCategory {
	id: number;
	cat: Category;
}

export interface Category {
	id: number;
	name: string;
}

export interface ProductAttribute {
	id: number;
	attribute: Attribute;
}

export interface Attribute {
	id: number;
	name: string;
}

export interface ProductVariant {
	id: number;
	price: string;
	sku: string | null;
	stock: number;
	description: string;
	isPublish: boolean;
	crtId: number | null;
	crtDt: string | null;
	updtId: number | null;
	updtDt: string | null;
}

export interface ProductImage {
	// Kept for backward compatibility — same shape as Image (API returns flat ImageDto)
	id: number;
	title: string;
	url: string;
	altText: string | null;
	description: string | null;
	crtId: number | null;
	crtDt: string | null;
	updtId: number | null;
	updtDt: string | null;
	isThumbnail?: boolean;
}

export interface Image {
	id: number;
	title: string;
	url: string;
	altText: string | null;
	description: string | null;
	crtId: number | null;
	crtDt: string | null;
	updtId: number | null;
	updtDt: string | null;
	isThumbnail?: boolean;
}

export interface Product {
	id: number;
	name: string;
	description: string;
	stock: number;
	rating: number | null;
	isPublish: boolean;
	crtId: number | null;
	crtDt: string | null;
	updtId: number | null;
	updtDt: string | null;
	regularPrice: number;
	salePrice: number;
	author: string | null;
	user: User;
	productCategories: ProductCategory[];
	productAttributes: ProductAttribute[];
	productVariants: ProductVariant[];
	/** Non-thumbnail gallery images — renamed from productImages in the API */
	galleryImages: ProductImage[];
	/** Main cover image (isThumbnail = true) */
	thumbnail: Image | null;
}

// ─── Review Types ────────────────────────────────────────────────

export interface ReviewUser {
	id: number;
	username: string;
	firstName: string;
	lastName: string;
	photos: string | null;
}

export interface ReviewResponse {
	id: number;
	rating: number;
	title: string | null;
	body: string;
	verifiedPurchase: boolean;
	crtDt: string;
	user: ReviewUser;
}

export interface ReviewRequest {
	productId: number;
	rating: number;
	title?: string;
	body: string;
}

// ─── Related / Summary Types ─────────────────────────────────────

export interface ProductSummaryDTO {
	id: number;
	name: string;
	description: string;
	regularPrice: number;
	salePrice: number;
	thumbnailUrl: string | null;
}
