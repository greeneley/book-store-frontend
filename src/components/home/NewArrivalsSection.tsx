import { BookCard } from "@/components/home/BookCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCategoryStore } from "@/store/useCategoryStore";
import { ChevronRight, Sparkles } from "lucide-react";
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

export const NewArrivalsSection: React.FC = () => {
	const { category } = useCategoryStore();
	// Show latest books (last 5 by id desc)
	const newBooks = useMemo(
		() =>
			getAllBooks(category)
				.sort((a, b) => b.id - a.id)
				.slice(0, 5),
		[category]
	);

	return (
		<section className="py-12 lg:py-16">
			<div className="container mx-auto px-4">
				<div className="flex items-end justify-between mb-8">
					<div>
						<div className="flex items-center gap-2 mb-1">
							<Sparkles className="h-5 w-5 text-accent" />
							<span className="text-xs font-semibold text-accent uppercase tracking-wider">Vừa Ra Mắt</span>
						</div>
						<h2 className="font-serif text-2xl lg:text-3xl font-semibold mb-1">Sách Mới</h2>
						<p className="text-muted-foreground text-sm">Những tựa sách mới nhất, sẵn sàng để khám phá</p>
					</div>
					<Button variant="ghost" asChild className="hidden sm:flex gap-1 text-sm text-muted-foreground">
						<Link to="/home">
							Xem tất cả <ChevronRight className="h-4 w-4" />
						</Link>
					</Button>
				</div>

				{newBooks.length === 0 ? (
					<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
						{Array.from({ length: 5 }).map((_, i) => (
							<div key={i} className="space-y-2">
								<Skeleton className="aspect-[3/4] w-full rounded-xl" />
								<Skeleton className="h-4 w-3/4" />
							</div>
						))}
					</div>
				) : (
					<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6">
						{newBooks.map((book) => (
							<BookCard key={book.id} book={book} />
						))}
					</div>
				)}
			</div>
		</section>
	);
};
