import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCartStore } from "@/store/useCartStore";
import { formatPrice } from "@/utils/helpers/formatPrice";
import { toProductSlug } from "@/utils/helpers/toSlug";
import { Heart, ShoppingCart, Star } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const PLACEHOLDER = "/assets/img/placeholder/placeholder.svg?height=400&width=600";

interface BookCardProps {
	book: any;
	rank?: number;
	showAddToCart?: boolean;
}

export const BookCard: React.FC<BookCardProps> = ({ book, rank, showAddToCart = true }) => {
	const { addToCart, isLoading } = useCartStore();

	const imageUrl = book.thumbnailUrl || book.url || PLACEHOLDER;
	const slug = toProductSlug(book.id, book.name ?? "");
	const salePrice = Number(book.salePrice) || 0;
	const regularPrice = Number(book.regularPrice) || 0;
	const hasDiscount = regularPrice > 0 && regularPrice > salePrice;
	const discountPct = hasDiscount ? Math.round(((regularPrice - salePrice) / regularPrice) * 100) : 0;

	const handleAddToCart = async (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		try {
			await addToCart(book.id, 1);
			toast.success("Đã thêm vào giỏ hàng");
		} catch {
			toast.error("Không thể thêm vào giỏ hàng");
		}
	};

	return (
		<Card className="group relative overflow-hidden border-0 bg-card shadow-sm hover:shadow-lg transition-all duration-300 h-full">
			{rank != null && (
				<div className="absolute top-3 left-3 z-10 w-7 h-7 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-xs">
					{rank}
				</div>
			)}

			{discountPct > 0 && (
				<Badge
					className={`absolute top-3 z-10 text-xs font-semibold bg-destructive text-destructive-foreground ${
						rank != null ? "left-12" : "left-3"
					}`}>
					-{discountPct}%
				</Badge>
			)}

			<div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
				<Button
					size="icon"
					variant="secondary"
					className="h-8 w-8 rounded-full shadow-md"
					onClick={(e) => e.preventDefault()}>
					<Heart className="h-4 w-4" />
				</Button>
			</div>

			<CardContent className="p-0 flex flex-col h-full">
				<Link to={`/products/${slug}`} className="block">
					<div className="relative aspect-[3/4] overflow-hidden bg-secondary/40">
						<img
							src={imageUrl}
							alt={book.name}
							className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
							onError={(e) => {
								(e.currentTarget as HTMLImageElement).src = PLACEHOLDER;
							}}
						/>
					</div>
				</Link>

				<div className="p-3 flex flex-col flex-1 space-y-1.5">
					{book.category && <p className="text-xs text-muted-foreground">{book.category}</p>}

					<Link to={`/products/${slug}`}>
						<h3 className="font-medium text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors">
							{book.name}
						</h3>
					</Link>

					{book.author && <p className="text-xs text-muted-foreground">{book.author}</p>}

					{book.rating != null && Number(book.rating) > 0 && (
						<div className="flex items-center gap-1">
							<Star className="h-3 w-3 fill-accent text-accent" />
							<span className="text-xs font-medium">{Number(book.rating).toFixed(1)}</span>
						</div>
					)}

					<div className="flex items-center justify-between pt-1 mt-auto">
						<div className="flex flex-col">
							<span className="font-semibold text-sm text-primary">{formatPrice(salePrice)}</span>
							{hasDiscount && (
								<span className="text-xs text-muted-foreground line-through">{formatPrice(regularPrice)}</span>
							)}
						</div>
						{showAddToCart && (
							<Button
								size="icon"
								className="h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
								onClick={handleAddToCart}
								disabled={isLoading}>
								<ShoppingCart className="h-3.5 w-3.5" />
							</Button>
						)}
					</div>
				</div>
			</CardContent>
		</Card>
	);
};
