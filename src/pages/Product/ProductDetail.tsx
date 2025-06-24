import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import React, { useState } from "react";

export const ProductDetail: React.FC = () => {
	const [selectedImage, setSelectedImage] = useState(0);
	const [quantity, setQuantity] = useState(1);

	const bookImages = [
		"/assets/img/placeholder/placeholder.svg?height=400&width=600",
		"/assets/img/placeholder/placeholder.svg?height=400&width=600",
		"/assets/img/placeholder/placeholder.svg?height=400&width=600",
		"/assets/img/placeholder/placeholder.svg?height=400&width=600"
	];

	return (
		<div className="min-h-screen bg-gray-50">
			<div className="max-w-7xl mx-auto px-4 py-8">
				<div className="grid lg:grid-cols-2 gap-8 mb-12">
					<div className="space-y-4">
						<div className="aspect-[3/4] max-w-md mx-auto relative overflow-hidden rounded-lg bg-white shadow-lg">
							<img src="/assets/img/placeholder/placeholder.svg?height=400&width=600" className="object-cover" />
						</div>
						<div className="flex gap-2 overflow-x-auto pb-2">
							{bookImages.map((image, index) => (
								<button
									key={index}
									onClick={() => setSelectedImage(index)}
									className={`flex-shrink-0 aspect-[3/4] w-16 relative overflow-hidden rounded-md border-2 transition-colors ${
										selectedImage === index ? "border-primary" : "border-gray-200"
									}`}>
									<img src="/assets/img/placeholder/placeholder.svg?height=400&width=600" className="object-cover" />
								</button>
							))}
						</div>
					</div>

					<div className="space-y-6">
						<div>
							<Badge variant="secondary" className="mb-2">
								Fiction
							</Badge>
							<h1 className="text-3xl font-bold text-gray-900 mb-2">The Art of Mindful Living</h1>
							<p className="text-lg text-gray-600 mb-4">by Sarah Mitchell</p>
							<div className="flex items-center gap-4 mb-4">
								<div className="flex items-center gap-1">
									{[...Array(5)].map((_, i) => (
										<Star
											key={i}
											className={`w-5 h-5 ${i < 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
										/>
									))}
								</div>
								<span className="text-sm text-gray-600">4.2 (128 reviews)</span>
							</div>
						</div>
						<div className="flex items-baseline gap-3 mb-6">
							<span className="text-3xl font-bold text-gray-900">$24.99</span>
							<span className="text-lg text-gray-500 line-through">$34.99</span>
							<Badge variant="destructive" className="text-md px-2">
								30% OFF
							</Badge>
						</div>
						<div className="space-y-4">
							<div className="flex items-center gap-4">
								<label htmlFor="quantity" className="text-sm font-medium">
									Quantity:
								</label>
								<div className="flex items-center border rounded-md">
									<button
										onClick={() => setQuantity(Math.max(1, quantity - 1))}
										className="px-3 py-1 hover:bg-gray-100">
										-
									</button>
									<span className="px-4 py-1 border-x">{quantity}</span>
									<button onClick={() => setQuantity(quantity + 1)} className="px-3 py-1 hover:bg-gray-100">
										+
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
