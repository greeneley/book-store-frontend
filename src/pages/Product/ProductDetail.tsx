import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, Star } from "lucide-react";
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

						<Button
							size="lg"
							className="w-full bg-blue-700 hover:bg-blue-500 text-white flex flex-col items-center h-fit py-2">
							<p>MUA NGAY</p>
							<span className="text-sm flex items-center">
								<ShoppingCart className="w-4 h-4 mr-2" /> Giao hàng tận nơi, Freeship cho đơn hàng trên 299K
							</span>
						</Button>
						<div className="flex gap-3">
							<Button size="lg" className="flex-1 text-blue-700 hover:bg-blue-600 hover:text-white" variant="outline">
								Thêm vào giỏ
							</Button>
						</div>
					</div>
				</div>

				<div>
					<h3 className="text-xl font-semibold mb-4">Book Description</h3>
					<Card>
						<CardContent className="p-6">
							<div className="prose max-w-none text-gray-700 space-y-4">
								<p>
									"The Art of Mindful Living" is a transformative guide that explores the profound impact of mindfulness
									on our daily lives. Through practical exercises, real-world examples, and scientific insights, author
									Sarah Mitchell presents a comprehensive approach to cultivating awareness and presence in every
									moment.
								</p>
								<p>
									This book delves deep into the principles of mindful living, offering readers tools to reduce stress,
									enhance creativity, and build stronger relationships. Mitchell's accessible writing style makes
									complex concepts easy to understand and implement, making this an essential read for anyone seeking
									greater fulfillment and peace.
								</p>
								<p>
									Whether you're new to mindfulness or looking to deepen your practice, this book provides valuable
									insights that will help you navigate life's challenges with greater clarity and compassion.
								</p>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
};
