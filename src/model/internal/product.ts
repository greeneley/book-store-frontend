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
	image: Image;
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
}

export interface Product {
	id: number;
	name: string;
	description: string;
	stock: number;
	rating: number;
	isPublish: boolean;
	crtId: number | null;
	crtDt: string | null;
	updtId: number | null;
	updtDt: string | null;
	regularPrice: number;
	salePrice: number;
	author: string;
	user: User;
	productCategories: ProductCategory[];
	productAttributes: ProductAttribute[];
	productVariants: ProductVariant[];
	productImages: ProductImage[];
}
