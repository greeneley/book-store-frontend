import { BookCard } from "@/components/home/BookCard";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import { useCategoryStore } from "@/store/useCategoryStore";
import { ChevronRight, TrendingUp } from "lucide-react";
import React, { useMemo } from "react";
import { Link } from "react-router-dom";

function getAllBooks(categories: any[]): any[] {
	const books: any[] = [];
	const seen = new Set<number>();
	const collect = (cats: any[]) => {
		for (const cat of cats) {
			for (const book of cat.books ?? []) {
				if (!seen.has(book.id)) {
					seen.add(book.id);
					books.push(book);
				}
			}
			collect(cat.children ?? []);
		}
	};
	collect(categories);
	return books;
}

export const BestSellersSection: React.FC = () => {
	const { category } = useCategoryStore();
	const books = useMemo(() => getAllBooks(category).slice(0, 10), [category]);

	return (
		<section className="py-12 lg:py-16 bg-secondary/40">
			<div className="container mx-auto px-4">
				<div className="flex items-end justify-between mb-8">
					<div>
						<div className="flex items-center gap-2 mb-1">
							<TrendingUp className="h-5 w-5 text-primary" />
							<span className="text-xs font-semibold text-primary uppercase tracking-wider">Top Bảng Xếp Hạng</span>
						</div>
						<h2 className="font-serif text-2xl lg:text-3xl font-semibold mb-1">Sách Bán Chạy</h2>
						<p className="text-muted-foreground text-sm">Những cuốn sách được yêu thích nhất hiện nay</p>
					</div>
					<Button variant="ghost" asChild className="hidden sm:flex gap-1 text-sm text-muted-foreground">
						<Link to="/home">
							Xem tất cả <ChevronRight className="h-4 w-4" />
						</Link>
					</Button>
				</div>

				{books.length === 0 ? (
					<div className="flex gap-4">
						{Array.from({ length: 5 }).map((_, i) => (
							<div key={i} className="w-48 shrink-0 space-y-2">
								<Skeleton className="aspect-[3/4] w-full rounded-xl" />
								<Skeleton className="h-4 w-3/4" />
							</div>
						))}
					</div>
				) : (
					<Carousel opts={{ align: "start", loop: false }} className="w-full">
						<CarouselContent className="-ml-3">
							{books.map((book, index) => (
								<CarouselItem key={book.id} className="pl-3 basis-1/2 sm:basis-1/3 lg:basis-1/4 xl:basis-1/5">
									<BookCard book={book} rank={index + 1} />
								</CarouselItem>
							))}
						</CarouselContent>
						<CarouselPrevious className="-left-4" />
						<CarouselNext className="-right-4" />
					</Carousel>
				)}
			</div>
		</section>
	);
};
