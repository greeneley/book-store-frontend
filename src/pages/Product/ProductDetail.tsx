import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@/model/internal/product";
import { ProductService } from "@/services/ProductService";
import { convertToCurrency } from "@/utils/helpers/convertToCurrency";
import { ShoppingCart } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

// Import Swiper styles
import "swiper/css";
export const ProductDetail: React.FC = () => {
	const [product, setProduct] = useState<Product>();
	const [selectedImage, setSelectedImage] = useState(0);

	const [activeThumb, setActiveThumb] = useState();

	const [quantity, setQuantity] = useState(1);
	const { slug } = useParams();
	console.log({ slug });
	console.log({ product });
	const bookImages = [
		"/assets/img/placeholder/placeholder.svg?height=400&width=600",
		"/assets/img/placeholder/placeholder.svg?height=400&width=600",
		"/assets/img/placeholder/placeholder.svg?height=400&width=600",
		"/assets/img/placeholder/placeholder.svg?height=400&width=600"
	];

	useEffect(() => {
		const productId = Number(slug.split("-")[0]);

		async function fetchData(productId: number) {
			return await ProductService.getProductById(productId);
		}
		fetchData(productId)
			.then((response) => {
				const data = response.data as Product;
				setProduct(data);
			})
			.catch((error) => {
				console.error("Error fetching product:", error);
			});
	}, [slug]);

	const bookImageUrls = useMemo(() => {
		return product
			? product.productImages
					.map((productImage) => {
						return productImage.image.url;
					})
					.sort()
			: [];
	}, [product]);

	const [thumbsSwiper, setThumbsSwiper] = useState(null);

	return product ? (
		<div className="bg-gray-50">
			<div className="max-w-7xl mx-auto px-4 py-8">
				<div className="grid lg:grid-cols-2 gap-8 mb-12">
					<div className="space-y-4">
						<div className="max-w-md mx-auto relative overflow-hidden rounded-lg bg-white shadow-lg">
							{bookImageUrls && bookImageUrls.length && <img src={bookImageUrls[0]} className="object-cover" />}
						</div>
						<div className="flex gap-2 overflow-x-auto pb-2">
							{bookImageUrls.map((url, index) => (
								<button
									key={index}
									onClick={() => setSelectedImage(index)}
									className={`flex-shrink-0 w-16 relative overflow-hidden rounded-md border-2 transition-colors ${
										selectedImage === index ? "border-primary" : "border-gray-200"
									}`}>
									<img src={url} className="object-cover" />
								</button>
							))}
						</div>
					</div>

					<div className="space-y-6">
						<div>
							<h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
							<p className="text-lg text-gray-600 mb-4">Tác giả: {product.author}</p>
						</div>
						<div className="flex items-baseline gap-3 mb-6">
							<span className="text-3xl font-bold text-gray-900">{convertToCurrency(product.salePrice)}</span>
							<span className="text-lg text-gray-500 line-through">{convertToCurrency(product.regularPrice)}</span>
							<Badge variant="destructive" className="text-md px-2">
								{(((product.regularPrice - product.salePrice) / product.regularPrice) * 100).toFixed(0)}% OFF
							</Badge>
						</div>
						<div className="space-y-4">
							<div className="flex items-center gap-4">
								<label htmlFor="quantity" className="text-sm font-medium">
									Số lượng:
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
					<h3 className="text-xl font-semibold mb-4">Mô tả nội dung</h3>
					<Card className="rounded-none">
						<CardContent className="p-6">
							{product && <div className="prose max-w-none text-gray-700 space-y-4">{product.description}</div>}
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	) : (
		<></>
	);
};
