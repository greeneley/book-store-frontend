import { HeroCarousel } from "@/components/hero-carousel/HeroCarousel";
import { ImageCarousel } from "@/components/image-carousel/ImageCarousel";
import React from "react";
import "swiper/css";
import "swiper/css/navigation";
export const HomePage: React.FC = () => {
	return (
		<div className="my-10">
			<HeroCarousel />
			<div className="py-16">
				<ImageCarousel />
			</div>
		</div>
	);
};
