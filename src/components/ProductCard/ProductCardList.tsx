import { ProductGrid } from "@/components/ProductCard/ProductGrid";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

export const ProductCardList: React.FC<{ product: any }> = ({ product }) => {
	const [activeTab, setActiveTab] = useState(() => product.children.length > 0 && product.children[0].slug);

	const subCategories = product.children.map((item) => {
		return {
			slug: item.slug,
			name: item.name
		};
	});

	return (
		<div className="bg-slate-100 p-4">
			<div className="max-w-7xl mx-auto">
				<h1>{product.name}</h1>
				<Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
					<TabsList className="flex justify-end mb-8 gap-5">
						{subCategories.map((category: any, index: number) => (
							<TabsTrigger key={index} value={category.slug} className="text-sm">
								{category.name}
							</TabsTrigger>
						))}
					</TabsList>
					{product.children.map((subCategory: any, index: number) => {
						return (
							<TabsContent key={index} value={subCategory.slug}>
								<ProductGrid products={subCategory.books} />
							</TabsContent>
						);
					})}
				</Tabs>
				<div className="text-center">
					<Button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 text-sm font-medium">
						<p>Xem tất cả</p>
						<ArrowRight />
					</Button>
				</div>
			</div>
		</div>
	);
};
