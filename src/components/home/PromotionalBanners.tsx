import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookMarked, Gift, Truck } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const promotions = [
	{
		id: "1",
		title: "Bộ Sưu Tập Mùa Hè",
		description: "Những lựa chọn được chọn lọc cho mùa hè này",
		cta: "Khám Phá Ngay",
		ctaLink: "/home",
		Icon: BookMarked,
		image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop"
	},
	{
		id: "2",
		title: "Thẻ Quà Tặng",
		description: "Món quà hoàn hảo cho người yêu sách",
		cta: "Mua Thẻ Quà",
		ctaLink: "/home",
		Icon: Gift,
		image: "https://images.unsplash.com/photo-1513001900722-370f803f498d?w=600&h=400&fit=crop"
	},
	{
		id: "3",
		title: "Miễn Phí Vận Chuyển",
		description: "Cho tất cả đơn hàng trên 299.000₫ toàn quốc",
		cta: "Mua Ngay",
		ctaLink: "/home",
		Icon: Truck,
		image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600&h=400&fit=crop"
	}
];

export const PromotionalBanners: React.FC = () => {
	return (
		<section className="py-12 lg:py-16 bg-secondary/40">
			<div className="container mx-auto px-4">
				<div className="grid md:grid-cols-3 gap-6">
					{promotions.map(({ id, title, description, cta, ctaLink, Icon, image }) => (
						<Card
							key={id}
							className="group overflow-hidden border-0 bg-card hover:shadow-lg transition-all duration-300">
							<CardContent className="p-0">
								<div className="relative h-48 overflow-hidden">
									<img
										src={image}
										alt={title}
										className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/50 to-transparent" />
									<div className="absolute inset-0 p-5 flex flex-col justify-end text-white">
										<div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mb-3">
											<Icon className="h-5 w-5" />
										</div>
										<h3 className="font-serif text-lg font-semibold mb-1">{title}</h3>
										<p className="text-sm text-white/80 mb-3">{description}</p>
										<Button
											variant="secondary"
											size="sm"
											asChild
											className="w-fit bg-white text-foreground hover:bg-white/90">
											<Link to={ctaLink}>{cta}</Link>
										</Button>
									</div>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
};
