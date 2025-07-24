import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

export const ProductGrid: React.FC<{ products: any[] }> = (props) => {
	const { products } = props;
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-8">
			{products.map((product: any) => {
				return <ProductCard product={product} key={product.id} />;
			})}
		</div>
	);
};

const ProductCard: React.FC<{ product: any }> = (props) => {
	const { product } = props;
	return (
		<div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
			{/* Book Cover */}
			<div className="relative p-4 mb-2">
				<img
					src={product.image || "/assets/img/placeholder/placeholder.svg?height=400&width=600"}
					className="mx-auto mb-3 md:h-72 object-cover group-hover:scale-110 transition-transform duration-500 object-cover rounded"
				/>
			</div>
			{/* Product Info */}
			<div className="p-4 pt-0">
				<h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2 leading-tight min-h-[2.5rem]">
					<Link to={`/products/${product.id}`} className="line-clamp-2 text-ellipsis">
						{product.name}
					</Link>
					{/*<span className="line-clamp-2 text-ellipsis">{product.name}</span>*/}
				</h3>
				{/* Price Section */}
				<div className="flex items-center justify-between">
					<div className="flex flex-col">
						<span className="text-red-600 font-bold text-lg">{product.regularPrice}₫</span>
						{product.salePrice && (
							<div className="flex items-center gap-2">
								<span className="text-gray-400 text-sm line-through">{product.salePrice}₫</span>
								{/*{product.discount && (*/}
								{/*	<Badge variant="destructive" className="text-xs px-1 py-0">*/}
								{/*		{product.discount}*/}
								{/*	</Badge>*/}
								{/*)}*/}
							</div>
						)}
					</div>

					{/* Add to Cart Button */}
					<Button size="sm" className="bg-blue-600 hover:bg-blue-700 rounded-full w-8 h-8 p-0">
						<Plus className="w-4 h-4" />
					</Button>
				</div>
			</div>
		</div>
	);
};
