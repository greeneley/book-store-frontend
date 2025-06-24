import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import React from "react";
interface HeroSlide {
	id: number;
	image: string;
	title: string;
	subtitle: string;
	description: string;
	buttonText: string;
	buttonLink: string;
}

const heroSlides: HeroSlide[] = [
	{
		id: 1,
		image: "/assets/img/image-slider/slider_1.jpg",
		title: "Discover Amazing Photography",
		subtitle: "Explore the World Through Our Lens",
		description: "Join thousands of photographers sharing their best moments",
		buttonText: "Start Exploring",
		buttonLink: "#gallery"
	},
	{
		id: 2,
		image: "/assets/img/image-slider/slider_2.jpg",
		title: "Capture Every Moment",
		subtitle: "Professional Photography Made Simple",
		description: "Learn from the best photographers and improve your skills",
		buttonText: "Learn More",
		buttonLink: "#courses"
	},
	{
		id: 3,
		image: "/assets/img/image-slider/slider_1.jpg",
		title: "Share Your Vision",
		subtitle: "Connect with Creative Community",
		description: "Upload, share, and get feedback on your photography",
		buttonText: "Join Community",
		buttonLink: "#community"
	}
];

export const HeroCarousel: React.FC = () => {
	return (
		<div className="w-1/2 xl:w-2/3 relative mx-auto my-auto">
			<Carousel opts={{ align: "start", loop: true }}>
				<CarouselContent>
					{heroSlides.map((slide) => {
						return (
							<CarouselItem key={slide.id}>
								<div className="flex items-center justify-center bg-gray-100 relative h-[300px] md:h-[400px] w-[600px] mx-auto my-auto">
									<img
										src={slide.image || "/placeholder.svg"}
										alt={slide.title}
										className="max-h-full max-w-full object-contain"
									/>
								</div>
							</CarouselItem>
						);
					})}
				</CarouselContent>
				<CarouselPrevious className="left-4" />
				<CarouselNext className="right-4" />
			</Carousel>
		</div>
	);
};
