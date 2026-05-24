import { Skeleton } from "@/components/ui/skeleton";
import { useQueryKeys } from "@/hooks/useQueryKeys";
import { ProductSummaryDTO } from "@/model/internal/product";
import { ProductService } from "@/services/ProductService";
import { formatPrice } from "@/utils/helpers/formatPrice";
import { toProductSlug } from "@/utils/helpers/toSlug";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";

interface RelatedBooksProps {
	productId: number;
}

const PLACEHOLDER = "/assets/img/placeholder/placeholder.svg?height=200&width=140";

export const RelatedBooks: React.FC<RelatedBooksProps> = ({ productId }) => {
	const { data: related = [], isLoading } = useQuery({
		queryKey: useQueryKeys.relatedProducts(productId),
		queryFn: () => ProductService.getRelatedProducts(productId, 8).then((r) => r.data),
		enabled: !!productId,
		staleTime: 5 * 60 * 1000 // 5 min
	});

	if (!isLoading && related.length === 0) return null;

	return (
		<div className="space-y-4">
			<h3 className="text-lg font-semibold text-gray-900">Sách liên quan</h3>
			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
				{isLoading
					? Array.from({ length: 6 }).map((_, i) => (
							<div key={i} className="space-y-2">
								<Skeleton className="aspect-[2/3] w-full rounded-lg" />
								<Skeleton className="h-4 w-full" />
								<Skeleton className="h-4 w-2/3" />
							</div>
					  ))
					: related.map((book) => <RelatedBookCard key={book.id} book={book} />)}
			</div>
		</div>
	);
};

const RelatedBookCard: React.FC<{ book: ProductSummaryDTO }> = ({ book }) => {
	const slug = toProductSlug(book.id, book.name);
	const discount =
		book.regularPrice > 0 ? Math.round(((book.regularPrice - book.salePrice) / book.regularPrice) * 100) : 0;

	return (
		<Link
			to={`/products/${slug}`}
			className="group flex flex-col gap-2 rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-200">
			<div className="relative aspect-[2/3] bg-gray-100 rounded-lg overflow-hidden">
				<img
					src={book.thumbnailUrl || PLACEHOLDER}
					alt={book.name}
					className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
					onError={(e) => {
						(e.currentTarget as HTMLImageElement).src = PLACEHOLDER;
					}}
				/>
				{discount > 0 && (
					<span className="absolute top-1.5 right-1.5 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded">
						-{discount}%
					</span>
				)}
			</div>
			<div className="px-1 pb-2 space-y-1">
				<p className="text-sm font-medium text-gray-800 line-clamp-2 leading-tight group-hover:text-blue-700 transition-colors">
					{book.name}
				</p>
				<div className="flex items-baseline gap-1.5 flex-wrap">
					<span className="text-sm font-bold text-gray-900">{formatPrice(book.salePrice)}</span>
					{discount > 0 && <span className="text-xs text-gray-400 line-through">{formatPrice(book.regularPrice)}</span>}
				</div>
			</div>
		</Link>
	);
};
