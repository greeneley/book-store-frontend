import { HeroCarousel } from "@/components/HeroCarousel/HeroCarousel";
import { ProductCardList } from "@/components/ProductCard/ProductCardList";
import { useCategoryStore } from "@/store/useCategoryStore";
import React from "react";
import "swiper/css";
import "swiper/css/navigation";

export const HomePage: React.FC = () => {
	const { category } = useCategoryStore();

	return (
		<div className="my-10">
			<HeroCarousel />
			{category.map((item, index) => {
				return <ProductCardList product={item} key={index} />;
			})}
		</div>
	);
};
