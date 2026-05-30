import { Card, CardContent } from "@/components/ui/card";
import { useCategoryStore } from "@/store/useCategoryStore";
import { Baby, BookOpen, Briefcase, Cpu, GraduationCap, Heart } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const CATEGORY_IMAGES: Record<string, string> = {
	default: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop"
};

const ICONS = [Briefcase, Cpu, Heart, BookOpen, GraduationCap, Baby, BookOpen, BookOpen];

export const CategoriesSection: React.FC = () => {
	const { category } = useCategoryStore();
	if (category.length === 0) return null;

	return (
		<section className="py-12 lg:py-16 bg-secondary/40">
			<div className="container mx-auto px-4">
				<div className="text-center mb-10">
					<h2 className="font-serif text-2xl lg:text-3xl font-semibold mb-2">Duyệt Theo Danh Mục</h2>
					<p className="text-muted-foreground text-sm max-w-lg mx-auto">
						Khám phá các bộ sưu tập được chọn lọc theo nhiều thể loại và chủ đề
					</p>
				</div>

				<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
					{category.slice(0, 6).map((cat: any, index: number) => {
						const IconComponent = ICONS[index % ICONS.length];
						const totalBooks = [...(cat.books ?? []), ...(cat.children ?? []).flatMap((c: any) => c.books ?? [])]
							.length;

						return (
							<Link key={cat.cat_id} to="/home">
								<Card className="group overflow-hidden border-0 bg-card hover:shadow-lg transition-all duration-300 h-full cursor-pointer">
									<CardContent className="p-0">
										<div
											className="relative h-32 sm:h-36 overflow-hidden"
											style={{
												backgroundImage: `url(${CATEGORY_IMAGES[cat.slug] ?? CATEGORY_IMAGES.default})`,
												backgroundSize: "cover",
												backgroundPosition: "center"
											}}>
											<div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-foreground/20 group-hover:from-primary/80 transition-colors duration-300" />
											<div className="absolute inset-0 flex flex-col items-center justify-center text-white px-2">
												<IconComponent className="h-7 w-7 mb-1.5 opacity-90" />
												<h3 className="font-semibold text-sm text-center leading-tight">{cat.name}</h3>
												{totalBooks > 0 && <p className="text-xs text-white/75 mt-0.5">{totalBooks} cuốn sách</p>}
											</div>
										</div>
									</CardContent>
								</Card>
							</Link>
						);
					})}
				</div>
			</div>
		</section>
	);
};
