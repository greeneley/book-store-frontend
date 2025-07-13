import { CartItemInterface } from "@/model/internal/cart-item-interface";
import { useCartStore } from "@/store/useCartStore";
import { formatPrice } from "@/utils/helpers/formatPrice";
import { Minus, Plus, X } from "lucide-react";
import React from "react";

interface CartItemProps {
	product: CartItemInterface;
}
export const CartItem: React.FC<CartItemProps> = ({ product }) => {
	const { updateQuantity, removeFromCart, isLoading } = useCartStore();

	// Sử dụng product.id cho các operations
	const productId = product.id;

	return (
		<div className="flex items-center gap-5 p-7 border-b">
			<button
				onClick={() => removeFromCart(productId)}
				className="text-gray-400 hover:text-gray-600 mt-2"
				disabled={isLoading}>
				<X className="w-4 h-4" />
			</button>
			<div className="flex-shrink-0">
				<img
					src={product.image || "/assets/img/placeholder/placeholder.svg?height=400&width=600"}
					alt={product.title}
					width={60}
					height={80}
					className="rounded border"
				/>
			</div>

			<div className="flex-1">
				<h3 className="font-medium text-gray-900 mb-2">{product.title}</h3>
				<div className="flex items-center justify-between">
					<span className="text-red-500 font-semibold">{formatPrice(product.price)}</span>

					<div className="flex items-center gap-3">
						<button
							onClick={() => updateQuantity(productId, product.quantity - 1)}
							className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50"
							disabled={isLoading}>
							<Minus className="w-4 h-4" />
						</button>
						<span className="w-8 text-center font-medium">{product.quantity}</span>
						<button
							onClick={() => updateQuantity(productId, product.quantity + 1)}
							className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50"
							disabled={isLoading}>
							<Plus className="w-4 h-4" />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
