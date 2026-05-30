import { BookCard } from "@/components/home/BookCard";
import { Button } from "@/components/ui/button";
import { useCategoryStore } from "@/store/useCategoryStore";
import { ChevronRight, Clock, Zap } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

function getAllDiscountBooks(categories: any[]): any[] {
	const books: any[] = [];
	const seen = new Set<number>();
	const collect = (cats: any[]) => {
		for (const cat of cats) {
			for (const book of cat.books ?? []) {
				if (!seen.has(book.id)) {
					seen.add(book.id);
					const sale = Number(book.salePrice) || 0;
					const regular = Number(book.regularPrice) || 0;
					if (regular > sale) books.push(book);
				}
			}
			collect(cat.children ?? []);
		}
	};
	collect(categories);
	return books;
}

function TimeBlock({ value, label }: { value: number; label: string }) {
	return (
		<div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 min-w-[56px] text-center">
			<div className="text-white text-xl lg:text-2xl font-bold leading-none">{value.toString().padStart(2, "0")}</div>
			<div className="text-white/70 text-xs mt-0.5">{label}</div>
		</div>
	);
}

export const FlashSaleSection: React.FC = () => {
	const { category } = useCategoryStore();
	const discountBooks = useMemo(() => getAllDiscountBooks(category).slice(0, 4), [category]);

	const [time, setTime] = useState({ hours: 23, minutes: 45, seconds: 30 });

	useEffect(() => {
		const timer = setInterval(() => {
			setTime((prev) => {
				const { hours, minutes, seconds } = prev;
				if (seconds > 0) return { hours, minutes, seconds: seconds - 1 };
				if (minutes > 0) return { hours, minutes: minutes - 1, seconds: 59 };
				if (hours > 0) return { hours: hours - 1, minutes: 59, seconds: 59 };
				return { hours: 23, minutes: 59, seconds: 59 };
			});
		}, 1000);
		return () => clearInterval(timer);
	}, []);

	if (discountBooks.length === 0) return null;

	return (
		<section className="py-12 lg:py-16">
			<div className="container mx-auto px-4">
				<div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-6 lg:p-10">
					{/* Header */}
					<div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
						<div className="text-primary-foreground">
							<div className="flex items-center gap-2 mb-1">
								<Zap className="h-5 w-5" />
								<span className="text-xs font-semibold uppercase tracking-wider">Thời Gian Có Hạn</span>
							</div>
							<h2 className="font-serif text-2xl lg:text-3xl font-semibold mb-1">Flash Sale</h2>
							<p className="text-primary-foreground/80 text-sm">Nhanh tay sở hữu với giá ưu đãi trước khi hết hàng!</p>
						</div>
						<div className="flex items-center gap-2">
							<Clock className="h-5 w-5 text-primary-foreground shrink-0" />
							<div className="flex items-center gap-2">
								<TimeBlock value={time.hours} label="Giờ" />
								<span className="text-white text-2xl font-bold">:</span>
								<TimeBlock value={time.minutes} label="Phút" />
								<span className="text-white text-2xl font-bold">:</span>
								<TimeBlock value={time.seconds} label="Giây" />
							</div>
						</div>
					</div>

					{/* Books grid */}
					<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
						{discountBooks.map((book) => (
							<BookCard key={book.id} book={book} />
						))}
					</div>

					<div className="flex justify-center mt-8">
						<Button variant="secondary" asChild className="bg-white text-foreground hover:bg-white/90">
							<Link to="/home">
								Xem tất cả ưu đãi <ChevronRight className="ml-1 h-4 w-4" />
							</Link>
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
};
