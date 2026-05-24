import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/useCartStore";
import { formatPrice } from "@/utils/helpers/formatPrice";
import { toProductSlug } from "@/utils/helpers/toSlug";
import { Plus } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const PLACEHOLDER = "/assets/img/placeholder/placeholder.svg?height=400&width=600";

export const ProductGrid: React.FC<{ products: any[] }> = ({ products }) => {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-8">
			{products.map((product: any) => (
				<ProductCard product={product} key={product.id} />
			))}
		</div>
	);
};

const ProductCard: React.FC<{ product: any }> = ({ product }) => {
	const { addToCart, isLoading } = useCartStore();

	// API returns thumbnailUrl — fall back gracefully
	const imageUrl = product.thumbnailUrl || product.url || PLACEHOLDER;
	const slug = toProductSlug(product.id, product.name ?? "");

	const salePrice = Number(product.salePrice) || 0;
	const regularPrice = Number(product.regularPrice) || 0;
	const hasDiscount = regularPrice > 0 && regularPrice > salePrice;
	const discountPct = hasDiscount ? Math.round(((regularPrice - salePrice) / regularPrice) * 100) : 0;

	const handleAddToCart = async (e: React.MouseEvent) => {
		e.preventDefault();
		try {
			await addToCart(product.id, 1);
			toast.success("Đã thêm vào giỏ hàng");
		} catch {
			toast.error("Không thể thêm vào giỏ hàng");
		}
	};

	return (
		<Link
			to={`/products/${slug}`}
			className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col overflow-hidden">
			{/* Book Cover */}
			<div className="relative p-3 flex items-center justify-center bg-gray-50 overflow-hidden">
				{discountPct > 0 && (
					<span className="absolute top-2 right-2 z-10 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded">
						-{discountPct}%
					</span>
				)}
				<img
					src={imageUrl}
					alt={product.name}
					className="h-48 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
					onError={(e) => {
						(e.currentTarget as HTMLImageElement).src = PLACEHOLDER;
					}}
				/>
			</div>

			{/* Product Info */}
			<div className="p-3 flex flex-col flex-1">
				<h3 className="text-sm font-semibold text-gray-800 mb-2 line-clamp-2 leading-snug min-h-[2.5rem] group-hover:text-blue-700 transition-colors">
					{product.name}
				</h3>

				{/* Price + Cart */}
				<div className="flex items-end justify-between mt-auto">
					<div className="flex flex-col">
						<span className="text-red-600 font-bold text-base leading-tight">{formatPrice(salePrice)}</span>
						{hasDiscount && <span className="text-gray-400 text-xs line-through">{formatPrice(regularPrice)}</span>}
					</div>
					<Button
						size="sm"
						className="bg-blue-600 hover:bg-blue-700 rounded-full w-8 h-8 p-0 flex-shrink-0"
						onClick={handleAddToCart}
						disabled={isLoading}
						title="Thêm vào giỏ hàng">
						<Plus className="w-4 h-4" />
					</Button>
				</div>
			</div>
		</Link>
	);
};
