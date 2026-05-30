import { AuthorShowcase } from "@/components/home/AuthorShowcase";
import { BestSellersSection } from "@/components/home/BestSellersSection";
import { CategoriesSection } from "@/components/home/CategoriesSection";
import { FeaturedBooksSection } from "@/components/home/FeaturedBooksSection";
import { FlashSaleSection } from "@/components/home/FlashSaleSection";
import { HeroSection } from "@/components/home/HeroSection";
import { NewArrivalsSection } from "@/components/home/NewArrivalsSection";
import { Newsletter } from "@/components/home/Newsletter";
import { PromotionalBanners } from "@/components/home/PromotionalBanners";
import { Testimonials } from "@/components/home/Testimonials";
import React from "react";

export const HomePage: React.FC = () => {
	return (
		<div className="min-h-screen">
			<HeroSection />
			<FeaturedBooksSection />
			<BestSellersSection />
			<CategoriesSection />
			<FlashSaleSection />
			<NewArrivalsSection />
			<PromotionalBanners />
			<AuthorShowcase />
			<Testimonials />
			<Newsletter />
		</div>
	);
};
