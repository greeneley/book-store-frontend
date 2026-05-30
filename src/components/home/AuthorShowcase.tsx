import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { BookOpen } from "lucide-react";
import React from "react";

const authors = [
	{
		id: "1",
		name: "Nguyễn Văn An",
		avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
		bio: "Tác giả của Thói Quen Nguyên Tử, diễn giả và doanh nhân tập trung vào thói quen và cải tiến liên tục.",
		bookCount: 3,
		featuredBooks: ["Thói Quen Nguyên Tử", "Nghệ Thuật Tư Duy Chiến Lược"]
	},
	{
		id: "2",
		name: "Trần Minh Tuấn",
		avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
		bio: "Giáo sư công nghệ và tác giả về chủ đề sống tối giản và làm việc tập trung.",
		bookCount: 5,
		featuredBooks: ["Làm Việc Sâu", "Sống Tối Giản Thời Công Nghệ"]
	},
	{
		id: "3",
		name: "Lê Hoàng Nam",
		avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
		bio: "Chuyên gia tài chính và tác giả khám phá tâm lý đằng sau các quyết định tài chính.",
		bookCount: 2,
		featuredBooks: ["Tâm Lý Học Về Tiền"]
	},
	{
		id: "4",
		name: "Phạm Thị Hương",
		avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
		bio: "Tác giả bestseller của các tiểu thuyết tâm lý hấp dẫn độc giả khắp nơi.",
		bookCount: 4,
		featuredBooks: ["Bệnh Nhân Im Lặng", "Những Trinh Nữ"]
	}
];

export const AuthorShowcase: React.FC = () => {
	return (
		<section className="py-12 lg:py-16">
			<div className="container mx-auto px-4">
				<div className="flex items-end justify-between mb-8">
					<div>
						<h2 className="font-serif text-2xl lg:text-3xl font-semibold mb-1">Tác Giả Nổi Bật</h2>
						<p className="text-muted-foreground text-sm">
							Gặp gỡ những tác giả đằng sau các tác phẩm yêu thích của bạn
						</p>
					</div>
				</div>

				<Carousel opts={{ align: "start", loop: false }} className="w-full">
					<CarouselContent className="-ml-4">
						{authors.map((author) => (
							<CarouselItem key={author.id} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
								<Card className="h-full border-0 bg-card hover:shadow-lg transition-all duration-300">
									<CardContent className="p-6">
										<div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
											<Avatar className="h-20 w-20 shrink-0">
												<AvatarImage src={author.avatar} alt={author.name} />
												<AvatarFallback>
													{author.name
														.split(" ")
														.map((n) => n[0])
														.join("")
														.slice(0, 2)}
												</AvatarFallback>
											</Avatar>
											<div className="text-center sm:text-left flex-1">
												<h3 className="font-serif text-lg font-semibold mb-1">{author.name}</h3>
												<p className="text-sm text-muted-foreground mb-3 line-clamp-2">{author.bio}</p>
												<div className="flex items-center justify-center sm:justify-start gap-1.5 text-sm text-muted-foreground mb-3">
													<BookOpen className="h-4 w-4" />
													<span>{author.bookCount} cuốn sách</span>
												</div>
												<div className="flex flex-wrap justify-center sm:justify-start gap-1">
													{author.featuredBooks.slice(0, 2).map((book, i) => (
														<span key={i} className="text-xs bg-secondary px-2 py-1 rounded-full">
															{book}
														</span>
													))}
												</div>
											</div>
										</div>
										<Button variant="outline" className="w-full mt-4" size="sm">
											Xem hồ sơ
										</Button>
									</CardContent>
								</Card>
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious className="-left-4" />
					<CarouselNext className="-right-4" />
				</Carousel>
			</div>
		</section>
	);
};
