import { ProductTabs } from "@/components/ProductDetail/ProductTabs";
import { RelatedBooks } from "@/components/ProductDetail/RelatedBooks";
import { StarRating } from "@/components/StarRating";
import { CarouselImages } from "@/components/commerce-ui/image-carousel-basic";
import { Badge } from "@/components/ui/badge";
import {
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	Breadcrumb as BreadcrumbMain,
	BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import Galery from "@/components/ui/galery";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/contexts/AuthContextProvider";
import { Product } from "@/model/internal/product";
import { ProductService } from "@/services/ProductService";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { formatPrice } from "@/utils/helpers/formatPrice";
import { Heart, RotateCcw, Share2, ShieldCheck, ShoppingCart, Truck } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import "swiper/css";

export const ProductDetail: React.FC = () => {
	const [product, setProduct] = useState<Product | null>(null);
	const [isLoadingProduct, setIsLoadingProduct] = useState(true);
	const [quantity, setQuantity] = useState(1);
	const { slug } = useParams<{ slug: string }>();
	const { addToCart, isLoading: cartLoading } = useCartStore();
	const { addToWishlist, removeFromWishlist, isInWishlist, fetchWishlist } = useWishlistStore();
	const { accessToken, user } = useAuth();

	const productId = useMemo(() => {
		if (!slug) return null;
		const parsed = Number(slug.split("-")[0]);
		return isNaN(parsed) ? null : parsed;
	}, [slug]);

	// Fetch wishlist on mount if authenticated
	useEffect(() => {
		if (accessToken && user) {
			fetchWishlist().catch(() => {});
		}
	}, [accessToken, user, fetchWishlist]);

	useEffect(() => {
		if (!productId) return;
		setIsLoadingProduct(true);
		ProductService.getProductById(productId)
			.then((response) => setProduct(response.data))
			.catch(() => toast.error("Không thể tải thông tin sản phẩm"))
			.finally(() => setIsLoadingProduct(false));
	}, [productId]);

	// ── Derived values ──────────────────────────────────────────────
	const bookImageUrls = useMemo(() => {
		if (!product) return ["/assets/img/placeholder/placeholder.svg?height=400&width=600"];

		const urls: string[] = [];

		// Put thumbnail first
		if (product.thumbnail?.url) {
			urls.push(product.thumbnail.url);
		}

		// Append remaining gallery images (skip any that duplicate the thumbnail)
		const thumbnailUrl = product.thumbnail?.url ?? null;
		(product.galleryImages ?? []).forEach((img) => {
			if (img?.url && img.url !== thumbnailUrl) {
				urls.push(img.url);
			}
		});

		return urls.length > 0 ? urls : ["/assets/img/placeholder/placeholder.svg?height=400&width=600"];
	}, [product]);

	const images: CarouselImages = bookImageUrls.map((url) => ({ url }));

	const discountPercent = useMemo(() => {
		if (!product || !product.regularPrice || product.regularPrice <= product.salePrice) return 0;
		return Math.round(((product.regularPrice - product.salePrice) / product.regularPrice) * 100);
	}, [product]);

	const categoryName = product?.productCategories?.[0]?.cat?.name ?? null;
	const wishlisted = product ? isInWishlist(product.id) : false;

	// ── Handlers ────────────────────────────────────────────────────
	const onAddToCart = async () => {
		if (!product) return;
		try {
			await addToCart(product.id, quantity);
			toast.success("Đã thêm sản phẩm vào giỏ hàng");
		} catch {
			toast.error("Không thể thêm sản phẩm vào giỏ hàng");
		}
	};

	const onBuyNow = async () => {
		if (!product) return;
		try {
			await addToCart(product.id, quantity);
			toast.success("Đã thêm vào giỏ — chuyển đến thanh toán");
			// Navigation to /cart — using react-router
			window.location.href = "/cart";
		} catch {
			toast.error("Không thể xử lý yêu cầu");
		}
	};

	const onToggleWishlist = async () => {
		if (!accessToken) {
			toast.error("Vui lòng đăng nhập để lưu sản phẩm yêu thích");
			return;
		}
		if (!product) return;
		try {
			if (wishlisted) {
				await removeFromWishlist(product.id);
				toast.success("Đã xóa khỏi danh sách yêu thích");
			} else {
				await addToWishlist(product.id);
				toast.success("Đã thêm vào danh sách yêu thích");
			}
		} catch {
			toast.error("Có lỗi xảy ra, vui lòng thử lại");
		}
	};

	const onShare = () => {
		if (navigator.share) {
			navigator.share({ title: product?.name, url: window.location.href }).catch(() => {});
		} else {
			navigator.clipboard.writeText(window.location.href);
			toast.success("Đã sao chép liên kết");
		}
	};

	// ── Loading Skeleton ─────────────────────────────────────────────
	if (isLoadingProduct) {
		return (
			<div className="bg-gray-50 min-h-screen">
				<div className="max-w-7xl mx-auto px-4 py-6">
					<Skeleton className="h-5 w-64 mb-6" />
					<div className="grid lg:grid-cols-2 gap-10 mb-12">
						<div className="space-y-4">
							<Skeleton className="aspect-[3/4] w-full rounded-xl" />
							<div className="flex gap-2">
								{[1, 2, 3, 4].map((i) => (
									<Skeleton key={i} className="h-16 w-16 rounded-lg flex-shrink-0" />
								))}
							</div>
						</div>
						<div className="space-y-5">
							<div className="space-y-2">
								<Skeleton className="h-8 w-4/5" />
								<Skeleton className="h-5 w-1/2" />
							</div>
							<Skeleton className="h-6 w-1/4" />
							<Skeleton className="h-10 w-2/5" />
							<div className="space-y-3">
								<Skeleton className="h-12 w-full" />
								<Skeleton className="h-12 w-full" />
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	if (!product) {
		return (
			<div className="bg-gray-50 min-h-screen flex items-center justify-center">
				<div className="text-center">
					<p className="text-xl font-semibold text-gray-700 mb-2">Không tìm thấy sản phẩm</p>
					<p className="text-gray-500 text-sm">Sản phẩm không tồn tại hoặc đã bị xóa.</p>
				</div>
			</div>
		);
	}

	// ── Main Render ──────────────────────────────────────────────────
	return (
		<div className="bg-gray-50 min-h-screen pb-24 lg:pb-0">
			<div className="max-w-7xl mx-auto px-4 py-6 space-y-10">
				{/* Breadcrumb */}
				<BreadcrumbMain>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink href="/home">Trang chủ</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						{categoryName && (
							<>
								<BreadcrumbItem>
									<BreadcrumbLink href="/home">{categoryName}</BreadcrumbLink>
								</BreadcrumbItem>
								<BreadcrumbSeparator />
							</>
						)}
						<BreadcrumbItem>
							<span className="text-gray-700 font-medium line-clamp-1 max-w-[200px] sm:max-w-xs">{product.name}</span>
						</BreadcrumbItem>
					</BreadcrumbList>
				</BreadcrumbMain>

				{/* Hero Section: Gallery + Info */}
				<div className="grid lg:grid-cols-[auto_1fr] gap-10 items-start">
					{/* Gallery */}
					<div className="w-full max-w-sm mx-auto lg:mx-0">
						<Galery images={images} />
					</div>

					{/* Product Info */}
					<div className="space-y-5">
						{/* Badges */}
						<div className="flex flex-wrap gap-2">
							{categoryName && (
								<Badge variant="outline" className="text-blue-700 border-blue-300">
									{categoryName}
								</Badge>
							)}
							{(product.stock ?? 0) === 0 && <Badge variant="destructive">Hết hàng</Badge>}
						</div>

						{/* Title & Author */}
						<div>
							<h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug mb-2">{product.name}</h1>
							{product.author && (
								<p className="text-base text-gray-600">
									Tác giả:{" "}
									<span className="font-medium text-blue-700 hover:underline cursor-pointer">{product.author}</span>
								</p>
							)}
						</div>

						{/* Rating row */}
						{product.rating != null && product.rating > 0 && (
							<div className="flex items-center gap-2">
								<StarRating rating={Number(product.rating)} size="md" />
								<span className="text-sm font-medium text-gray-700">{Number(product.rating).toFixed(1)}</span>
								<span className="text-sm text-gray-400">/ 5</span>
							</div>
						)}

						{/* Pricing */}
						<div className="flex items-baseline gap-3 flex-wrap">
							<span className="text-3xl font-bold text-red-600">{formatPrice(product.salePrice)}</span>
							{discountPercent > 0 && (
								<>
									<span className="text-lg text-gray-400 line-through">{formatPrice(product.regularPrice)}</span>
									<Badge variant="destructive" className="text-sm px-2 py-0.5">
										-{discountPercent}%
									</Badge>
								</>
							)}
						</div>

						{/* Stock info */}
						{product.stock != null && product.stock > 0 && (
							<p className="text-sm text-green-600 font-medium">✓ Còn {product.stock} sản phẩm trong kho</p>
						)}

						{/* Quantity selector */}
						<div className="flex items-center gap-4">
							<span className="text-sm font-medium text-gray-700">Số lượng:</span>
							<div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
								<button
									onClick={() => setQuantity((q) => Math.max(1, q - 1))}
									className="px-3 py-2 hover:bg-gray-100 text-gray-700 font-medium transition-colors"
									aria-label="Giảm số lượng">
									−
								</button>
								<span className="px-5 py-2 border-x border-gray-300 font-medium text-gray-900 min-w-[3rem] text-center">
									{quantity}
								</span>
								<button
									onClick={() => setQuantity((q) => (product.stock ? Math.min(product.stock, q + 1) : q + 1))}
									className="px-3 py-2 hover:bg-gray-100 text-gray-700 font-medium transition-colors"
									aria-label="Tăng số lượng">
									+
								</button>
							</div>
						</div>

						{/* CTA Buttons */}
						<div className="flex flex-col sm:flex-row gap-3">
							<Button
								size="lg"
								className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold h-12"
								onClick={onBuyNow}
								disabled={cartLoading || (product.stock ?? 0) === 0}>
								MUA NGAY
							</Button>
							<Button
								size="lg"
								variant="outline"
								className="flex-1 border-blue-600 text-blue-700 hover:bg-blue-600 hover:text-white font-semibold h-12 transition-colors"
								onClick={onAddToCart}
								disabled={cartLoading || (product.stock ?? 0) === 0}>
								<ShoppingCart className="w-4 h-4 mr-2" />
								{cartLoading ? "Đang thêm..." : "Thêm vào giỏ"}
							</Button>
						</div>

						{/* Wishlist & Share */}
						<div className="flex gap-2">
							<Button
								variant="ghost"
								size="sm"
								onClick={onToggleWishlist}
								className={`gap-1.5 ${wishlisted ? "text-red-500" : "text-gray-500"}`}>
								<Heart className={`w-4 h-4 ${wishlisted ? "fill-red-500" : ""}`} />
								{wishlisted ? "Đã lưu" : "Lưu yêu thích"}
							</Button>
							<Button variant="ghost" size="sm" onClick={onShare} className="gap-1.5 text-gray-500">
								<Share2 className="w-4 h-4" />
								Chia sẻ
							</Button>
						</div>

						{/* Shipping Info */}
						<div className="border border-gray-200 rounded-xl p-4 space-y-3 bg-white">
							<div className="flex items-start gap-3">
								<Truck className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
								<div>
									<p className="text-sm font-medium text-gray-800">Miễn phí vận chuyển</p>
									<p className="text-xs text-gray-500">Đơn hàng từ 299.000₫ • Giao 2–4 ngày</p>
								</div>
							</div>
							<div className="flex items-start gap-3">
								<RotateCcw className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
								<div>
									<p className="text-sm font-medium text-gray-800">Đổi trả trong 30 ngày</p>
									<p className="text-xs text-gray-500">Miễn phí đổi trả nếu sách bị lỗi</p>
								</div>
							</div>
							<div className="flex items-start gap-3">
								<ShieldCheck className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
								<div>
									<p className="text-sm font-medium text-gray-800">Hàng chính hãng 100%</p>
									<p className="text-xs text-gray-500">Cam kết sách thật từ nhà xuất bản</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Tabs: Description / Specifications / Reviews / Q&A */}
				<div className="bg-white rounded-xl shadow-sm p-5 sm:p-6">
					<ProductTabs product={product} />
				</div>

				{/* Related Books */}
				{productId && (
					<div className="bg-white rounded-xl shadow-sm p-5 sm:p-6">
						<RelatedBooks productId={productId} />
					</div>
				)}
			</div>

			{/* Mobile Sticky CTA */}
			<div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 flex gap-3 z-50 shadow-lg">
				<Button
					variant="outline"
					className="flex-1 border-blue-600 text-blue-700 font-semibold h-11"
					onClick={onAddToCart}
					disabled={cartLoading || (product.stock ?? 0) === 0}>
					<ShoppingCart className="w-4 h-4 mr-1.5" />
					Giỏ hàng
				</Button>
				<Button
					className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold h-11"
					onClick={onBuyNow}
					disabled={cartLoading || (product.stock ?? 0) === 0}>
					Mua ngay — {formatPrice(product.salePrice * quantity)}
				</Button>
			</div>
		</div>
	);
};
