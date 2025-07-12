import { CarouselImages } from "@/components/commerce-ui/image-carousel-basic";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Galery from "@/components/ui/galery";
import { Skeleton } from "@/components/ui/skeleton";
import { Product } from "@/model/internal/product";
import { ProductService } from "@/services/ProductService";
import { formatPrice } from "@/utils/helpers/formatPrice";
import { ShoppingCart } from "lucide-react";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
// Import Swiper styles
import { AppContext } from "@/contexts/AppContextProvider";
import { CartItemService } from "@/services/CartItemService";
import { CartService } from "@/services/CartService";
import toast from "react-hot-toast";
import "swiper/css";

export const ProductDetail: React.FC = () => {
	const [product, setProduct] = useState<Product>();

	const [quantity, setQuantity] = useState(1);
	const { slug } = useParams();
	const { setCountBadge } = useContext(AppContext);

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
		return product?.productImages.length > 0
			? product.productImages
					.map((productImage) => {
						return productImage.image.url;
					})
					.sort()
			: ["/assets/img/placeholder/placeholder.svg?height=400&width=600"];
	}, [product]);

	const images: CarouselImages = bookImageUrls.map((url, idx) => ({
		url
	}));

	if (!product) {
		return (
			<div className="bg-gray-50">
				<div className="max-w-7xl mx-auto px-4 py-8">
					<div className="grid lg:grid-cols-2 gap-8 mb-12">
						<div className="space-y-4">
							<Skeleton className="aspect-square w-full rounded-lg" />
							<div className="flex gap-2 overflow-x-auto pb-2">
								<Skeleton className="h-16 w-16 rounded-md" />
								<Skeleton className="h-16 w-16 rounded-md" />
								<Skeleton className="h-16 w-16 rounded-md" />
								<Skeleton className="h-16 w-16 rounded-md" />
							</div>
						</div>

						<div className="space-y-6">
							<div className="space-y-2">
								<Skeleton className="h-8 w-3/4" />
								<Skeleton className="h-6 w-1/2" />
							</div>
							<div className="space-y-2">
								<Skeleton className="h-8 w-1/4" />
								<Skeleton className="h-6 w-1/3" />
							</div>

							<div className="space-y-4">
								<Skeleton className="h-12 w-full" />
								<Skeleton className="h-12 w-full" />
							</div>
						</div>
					</div>

					<div>
						<Skeleton className="h-8 w-48 mb-4" />
						<Card className="rounded-none">
							<CardContent className="p-6 space-y-4">
								<Skeleton className="h-4 w-full" />
								<Skeleton className="h-4 w-full" />
								<Skeleton className="h-4 w-5/6" />
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		);
	}

	const onAddToCart = () => {
		CartItemService.addCartItem(1, product.id).then(() => {
			CartService.getCart().then((res) => {
				setCountBadge(res.data.items.length);
				toast.success("Đã thêm sản phẩm vào giỏ hàng");
			});
		});
	};

	return (
		<div className="bg-gray-50">
			<div className="max-w-7xl mx-auto px-4 py-8">
				<div className="grid lg:grid-cols-2 gap-8 mb-12">
					<div className="space-y-4">
						<Galery images={images} />
					</div>

					<div className="space-y-6">
						<div>
							<h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
							<p className="text-lg text-gray-600 mb-4">Tác giả: {product.author}</p>
						</div>
						<div className="flex items-baseline gap-3 mb-6">
							<span className="text-3xl font-bold text-gray-900">{formatPrice(product.salePrice)}</span>
							<span className="text-lg text-gray-500 line-through">{formatPrice(product.regularPrice)}</span>
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
							<Button
								size="lg"
								className="flex-1 text-blue-700 hover:bg-blue-600 hover:text-white"
								variant="outline"
								onClick={onAddToCart}>
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
	);
};
