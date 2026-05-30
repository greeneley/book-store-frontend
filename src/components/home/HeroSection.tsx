import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import React from "react";
import { Link } from "react-router-dom";

interface HeroSlide {
	id: number;
	title: string;
	subtitle: string;
	cta: string;
	ctaLink: string;
	image: string;
	gradient: string;
}

const heroSlides: HeroSlide[] = [
	{
		id: 1,
		title: "Khuyến Mãi Mùa Xuân",
		subtitle: "Giảm đến 50% cho sách bán chạy. Khám phá cuốn sách yêu thích tiếp theo của bạn.",
		cta: "Mua Ngay",
		ctaLink: "/home",
		image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=600&fit=crop",
		gradient: "from-primary/85 to-primary/60"
	},
	{
		id: 2,
		title: "Sách Mới Hàng Tuần",
		subtitle: "Tựa sách mới được cập nhật mỗi tuần. Hãy là người đầu tiên khám phá.",
		cta: "Khám Phá Ngay",
		ctaLink: "/home",
		image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&h=600&fit=crop",
		gradient: "from-foreground/80 to-foreground/50"
	},
	{
		id: 3,
		title: "Thành Viên Premium",
		subtitle: "Đăng ký Premium để nhận ưu đãi độc quyền và quyền truy cập sớm.",
		cta: "Đăng Ký Ngay",
		ctaLink: "/signup",
		image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1200&h=600&fit=crop",
		gradient: "from-accent/80 to-accent/50"
	}
];

export const HeroSection: React.FC = () => {
	const plugin = React.useRef(Autoplay({ delay: 5000, stopOnInteraction: false }));

	return (
		<section className="relative overflow-hidden">
			<Carousel opts={{ loop: true }} plugins={[plugin.current]} className="w-full">
				<CarouselContent>
					{heroSlides.map((slide) => (
						<CarouselItem key={slide.id}>
							<div
								className="relative h-[360px] sm:h-[460px] lg:h-[540px] w-full overflow-hidden"
								style={{
									backgroundImage: `url(${slide.image})`,
									backgroundSize: "cover",
									backgroundPosition: "center"
								}}>
								<div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`} />
								<div className="absolute inset-0 flex items-center">
									<div className="container mx-auto px-6 lg:px-10">
										<div className="max-w-xl text-white">
											<h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
												{slide.title}
											</h1>
											<p className="text-base sm:text-lg mb-7 text-white/90 leading-relaxed">{slide.subtitle}</p>
											<Button size="lg" className="bg-white text-foreground hover:bg-white/90 font-semibold" asChild>
												<Link to={slide.ctaLink}>{slide.cta}</Link>
											</Button>
										</div>
									</div>
								</div>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious className="left-4 bg-white/20 hover:bg-white/40 text-white border-0 backdrop-blur-sm h-10 w-10" />
				<CarouselNext className="right-4 bg-white/20 hover:bg-white/40 text-white border-0 backdrop-blur-sm h-10 w-10" />
			</Carousel>
		</section>
	);
};
