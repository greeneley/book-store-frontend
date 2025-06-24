import { HeroCarousel } from "@/components/HeroCarousel/HeroCarousel";
import { ImageCarousel } from "@/components/ImageCarousel/ImageCarousel";
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
