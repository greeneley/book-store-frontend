import { HeroCarousel } from "@/components/HeroCarousel/HeroCarousel";
import { ProductCardList } from "@/components/ProductCard/ProductCardList";
import { useCategoryStore } from "@/store/useCategoryStore";
import React from "react";
import "swiper/css";
import "swiper/css/navigation";

// const products = {
// 	categories: [
// 		{
// 			value: "business",
// 			text: "Kinh Doanh"
// 		},
// 		{
// 			value: "language",
// 			text: "Ngoại ngữ"
// 		},
// 		{
// 			value: "finance",
// 			text: "Tài chính"
// 		}
// 	],
// 	data: [
// 		{
// 			id: 1,
// 			title: "10 Ngày có thể nói 1000 câu tiếng Anh công sở (kèm CD)",
// 			currentPrice: "55,000",
// 			originalPrice: null,
// 			discount: null,
// 			category: "business",
// 			image: "/assets/img/placeholder/placeholder.svg?height=400&width=600"
// 		},
// 		{
// 			id: 2,
// 			title: "10 Ngày Có Thể Nói 1000 Câu Tiếng Anh Du Lịch (Kèm CD)",
// 			currentPrice: "47,500",
// 			originalPrice: "50,000",
// 			discount: "-5%",
// 			category: "business",
// 			image: "/assets/img/placeholder/placeholder.svg?height=400&width=600"
// 		},
// 		{
// 			id: 3,
// 			title: "10 Ngày Có Thể Nói 1000 Câu Tiếng Anh Kinh Doanh (Kèm CD)",
// 			currentPrice: "49,400",
// 			originalPrice: "52,000",
// 			discount: "-5%",
// 			category: "business",
// 			image: "/assets/img/placeholder/placeholder.svg?height=400&width=600"
// 		},
// 		{
// 			id: 4,
// 			title: "10 Ngày có thể nói 1000 câu tiếng Hoa - Công sở (kèm CD)",
// 			currentPrice: "82,650",
// 			originalPrice: "87,000",
// 			discount: "-5%",
// 			category: "business",
// 			image: "/assets/img/placeholder/placeholder.svg?height=400&width=600"
// 		},
// 		{
// 			id: 5,
// 			title: "10 Phút Mỗi Ngày Để Học Tiếng Anh - Kì Nghỉ Và Du Lịch (Kèm CD)",
// 			currentPrice: "52,250",
// 			originalPrice: "55,000",
// 			discount: "-5%",
// 			category: "finance",
//
// 			image: "/assets/img/placeholder/placeholder.svg?height=400&width=600"
// 		},
// 		{
// 			id: 6,
// 			title: "10 Phút Mỗi Ngày Để Học Tốt Tiếng Anh - Bày Tỏ Cảm Xúc",
// 			currentPrice: "33,250",
// 			originalPrice: "35,000",
// 			discount: "-5%",
// 			category: "finance",
//
// 			image: "/assets/img/placeholder/placeholder.svg?height=400&width=600"
// 		},
// 		{
// 			id: 7,
// 			title: "10 Phút Mỗi Ngày Để Học Tốt Tiếng Anh - Sinh Hoạt Thường Ngày",
// 			currentPrice: "42,750",
// 			originalPrice: "45,000",
// 			discount: "-5%",
// 			category: "finance",
//
// 			image: "/assets/img/placeholder/placeholder.svg?height=400&width=600"
// 		},
// 		{
// 			id: 8,
// 			title: "300 Câu trúc ngữ pháp cơ bản tiếng Hán - Vanlangbooks",
// 			currentPrice: "66,500",
// 			originalPrice: "70,000",
// 			discount: "-5%",
// 			category: "language",
//
// 			image: "/assets/img/placeholder/placeholder.svg?height=400&width=600"
// 		},
// 		{
// 			id: 9,
// 			title: "5500 Câu Giao Tiếp Tiếng Hán Thông Dụng (Tái Bản 2021)",
// 			currentPrice: "72,200",
// 			originalPrice: "76,000",
// 			discount: "-5%",
// 			category: "language",
//
// 			image: "/assets/img/placeholder/placeholder.svg?height=400&width=600"
// 		},
// 		{
// 			id: 10,
// 			title: "5500 Câu giao tiếp tiếng Hoa thông dụng (kèm CD)",
// 			currentPrice: "57,000",
// 			originalPrice: "60,000",
// 			discount: "-5%",
// 			category: "language",
// 			image: "/assets/img/placeholder/placeholder.svg?height=400&width=600"
// 		}
// 	]
// };

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
