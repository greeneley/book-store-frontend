import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Quote, Star } from "lucide-react";
import React from "react";

const testimonials = [
	{
		id: "1",
		name: "Nguyễn Thị Lan",
		avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
		rating: 5,
		comment:
			"Nhà Sách Văn Lang đã trở thành địa chỉ tin cậy của tôi. Bộ sưu tập đa dạng và giao hàng luôn đúng hẹn. Rất đáng tin cậy!",
		date: "2024-01-15"
	},
	{
		id: "2",
		name: "Trần Văn Minh",
		avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
		rating: 5,
		comment: "Tuyệt vời với bộ sưu tập sách kinh doanh và công nghệ. Các đợt Flash Sale có giá trị cực kỳ hấp dẫn!",
		date: "2024-01-10"
	},
	{
		id: "3",
		name: "Lê Thu Hà",
		avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
		rating: 4,
		comment: "Yêu thích giao diện thân thiện và giợi ý cá nhân hóa. Đã tìm thấy nhiều cuốn sách hay ở đây.",
		date: "2024-01-08"
	},
	{
		id: "4",
		name: "Phạm Đức Long",
		avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
		rating: 5,
		comment: "Trải nghiệm mua sách trực tuyến tốt nhất. Đóng gói cẩn thận và dịch vụ khách hàng tuyệt vời mỗi lần.",
		date: "2024-01-05"
	}
];

export const Testimonials: React.FC = () => {
	const plugin = React.useRef(Autoplay({ delay: 4000, stopOnInteraction: false }));

	return (
		<section className="py-12 lg:py-16 bg-secondary/40">
			<div className="container mx-auto px-4">
				<div className="text-center mb-10">
					<h2 className="font-serif text-2xl lg:text-3xl font-semibold mb-2">Độc Giả Nói Gì</h2>
					<p className="text-muted-foreground text-sm max-w-lg mx-auto">
						Tham gia cùng hàng ngàn độc giả hài lòng tin tưởng Nhà Sách Văn Lang
					</p>
				</div>

				<div className="max-w-3xl mx-auto">
					<Carousel opts={{ loop: true }} plugins={[plugin.current]} className="w-full">
						<CarouselContent>
							{testimonials.map((t) => (
								<CarouselItem key={t.id}>
									<Card className="border-0 bg-card shadow-sm mx-2">
										<CardContent className="p-8 text-center">
											<Quote className="h-10 w-10 text-primary/20 mx-auto mb-5" />
											<div className="flex justify-center gap-1 mb-4">
												{Array.from({ length: 5 }).map((_, i) => (
													<Star
														key={i}
														className={`h-5 w-5 ${
															i < t.rating ? "fill-accent text-accent" : "text-muted-foreground/30"
														}`}
													/>
												))}
											</div>
											<p className="text-base text-foreground mb-6 leading-relaxed italic">&ldquo;{t.comment}&rdquo;</p>
											<div className="flex items-center justify-center gap-3">
												<Avatar className="h-12 w-12">
													<AvatarImage src={t.avatar} alt={t.name} />
													<AvatarFallback>
														{t.name
															.split(" ")
															.map((n) => n[0])
															.join("")
															.slice(0, 2)}
													</AvatarFallback>
												</Avatar>
												<div className="text-left">
													<p className="font-medium text-sm">{t.name}</p>
													<p className="text-xs text-muted-foreground">Khách hàng đã xác minh</p>
												</div>
											</div>
										</CardContent>
									</Card>
								</CarouselItem>
							))}
						</CarouselContent>
						<CarouselPrevious className="-left-4 hidden lg:flex" />
						<CarouselNext className="-right-4 hidden lg:flex" />
					</Carousel>
				</div>
			</div>
		</section>
	);
};
