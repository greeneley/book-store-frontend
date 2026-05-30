import { CartItemInterface } from "@/model/internal/cart-item-interface";
import { useCartStore } from "@/store/useCartStore";
import { formatPrice } from "@/utils/helpers/formatPrice";
import { toProductSlug } from "@/utils/helpers/toSlug";
import { Minus, Plus, Trash2 } from "lucide-react";
import React, { useCallback, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const PLACEHOLDER = "/assets/img/placeholder/placeholder.svg?height=400&width=600";

interface CartItemProps {
	/** Cart item data from store */
	product: CartItemInterface;
}

export const CartItem: React.FC<CartItemProps> = ({ product }) => {
	const { updateQuantity, removeFromCart, isLoading, syncingIds } = useCartStore();
	const { productId, title, salePrice, regularPrice, quantity, image } = product;
	const hasDiscount = regularPrice > 0 && regularPrice > salePrice;
	const slug = toProductSlug(productId, title ?? "");
	const isSyncing = syncingIds.has(productId);
	const stepperCls = `flex items-center gap-1 border rounded-md overflow-hidden transition-colors ${
		isSyncing ? "border-muted-foreground/30" : "border-border"
	}`;
	const qtyCls = `w-8 text-center text-sm font-medium select-none transition-opacity ${isSyncing ? "opacity-60" : ""}`;

	const pendingQty = useRef<number>(quantity);
	useEffect(() => {
		pendingQty.current = quantity;
	}, [quantity]);

	const handleChangeQty = useCallback(
		(delta: 1 | -1) => {
			const next = pendingQty.current + delta;
			if (next < 1) return;
			pendingQty.current = next;
			updateQuantity(productId, next);
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[productId, updateQuantity]
	);

	return (
		<div className="flex gap-4 py-5 border-b border-border last:border-0">
			<Link to={`/products/${slug}`} className="flex-shrink-0">
				<img
					src={image || PLACEHOLDER}
					alt={title}
					className="w-[72px] h-24 object-cover rounded-md border border-border bg-muted"
					onError={(e) => {
						(e.currentTarget as HTMLImageElement).src = PLACEHOLDER;
					}}
				/>
			</Link>
			<div className="flex flex-1 flex-col gap-2 min-w-0">
				<div className="flex items-start justify-between gap-2">
					<Link to={`/products/${slug}`} className="hover:underline">
						<p className="text-sm font-medium leading-snug line-clamp-2 text-foreground">{title}</p>
					</Link>
					<button
						onClick={() => removeFromCart(productId)}
						disabled={isLoading}
						aria-label="Xóa sản phẩm"
						className="flex-shrink-0 text-muted-foreground hover:text-destructive transition-colors disabled:opacity-40 mt-0.5">
						<Trash2 className="w-4 h-4" />
					</button>
				</div>
				<div className="flex items-center justify-between mt-auto flex-wrap gap-2">
					<div className="flex items-center gap-2">
						<span className="text-sm font-semibold text-primary">{formatPrice(salePrice)}</span>
						{hasDiscount && (
							<span className="text-xs text-muted-foreground line-through">{formatPrice(regularPrice)}</span>
						)}
					</div>
					<div className={stepperCls}>
						<button
							onClick={() => handleChangeQty(-1)}
							disabled={quantity <= 1}
							aria-label="Giảm số lượng"
							className="w-8 h-8 flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-30">
							<Minus className="w-3.5 h-3.5" />
						</button>
						<span className={qtyCls}>{quantity}</span>
						<button
							onClick={() => handleChangeQty(1)}
							aria-label="Tăng số lượng"
							className="w-8 h-8 flex items-center justify-center hover:bg-muted transition-colors">
							<Plus className="w-3.5 h-3.5" />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
