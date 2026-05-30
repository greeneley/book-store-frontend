import { CartSkeleton } from "@/components/Cart/CartSkeleton";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useCartStore } from "@/store/useCartStore";
import { formatPrice } from "@/utils/helpers/formatPrice";
import { AlertCircle, ShoppingBag } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartItem } from "./CartItem";

export default function Cart() {
	const { cart, totalAmount, isLoading, error, fetchCart } = useCartStore();
	const navigate = useNavigate();
	const [orderNotes, setOrderNotes] = useState("");

	const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
	const shippingFee = 0; // free shipping
	const grandTotal = totalAmount + shippingFee;

	if (isLoading) return <CartSkeleton />;

	if (error) {
		return (
			<div className="w-full max-w-5xl mx-auto px-4 py-16 flex flex-col items-center text-center gap-4">
				<AlertCircle className="w-12 h-12 text-destructive" />
				<h2 className="text-lg font-semibold">Có lỗi xảy ra</h2>
				<p className="text-sm text-muted-foreground">{error}</p>
				<Button onClick={() => fetchCart()} variant="outline">
					Thử lại
				</Button>
			</div>
		);
	}

	if (cart.length === 0) {
		return (
			<div className="w-full max-w-5xl mx-auto px-4 py-16 flex flex-col items-center text-center gap-6">
				<img
					src="/assets/cart_empty_background.png"
					alt="Giỏ hàng trống"
					className="w-48 h-auto opacity-80"
					onError={(e) => {
						(e.currentTarget as HTMLImageElement).style.display = "none";
					}}
				/>
				<div className="space-y-2">
					<h2 className="text-xl font-semibold">Giỏ hàng trống</h2>
					<p className="text-sm text-muted-foreground">Hãy thêm sản phẩm vào giỏ hàng để tiến hành mua sắm.</p>
				</div>
				<Button size="lg" className="gap-2" onClick={() => navigate("/")}>
					<ShoppingBag className="w-4 h-4" />
					Mua sắm ngay
				</Button>
			</div>
		);
	}

	return (
		<div className="w-full max-w-5xl mx-auto px-4 py-8">
			<h1 className="text-2xl font-semibold mb-6">
				Giỏ hàng
				<span className="ml-2 text-base font-normal text-muted-foreground">({itemCount} sản phẩm)</span>
			</h1>

			<div className="flex flex-col lg:flex-row gap-8">
				{/* ── Left: item list + notes ── */}
				<div className="flex-1 min-w-0">
					<div className="rounded-xl border border-border overflow-hidden">
						<div className="divide-y divide-border px-4">
							{cart.map((item) => (
								<CartItem key={item.productId} product={item} />
							))}
						</div>
					</div>

					{/* Order notes */}
					<div className="mt-6 space-y-2">
						<Label htmlFor="notes" className="text-sm font-medium">
							Ghi chú đơn hàng <span className="text-muted-foreground font-normal">(tuỳ chọn)</span>
						</Label>
						<Textarea
							id="notes"
							value={orderNotes}
							onChange={(e) => setOrderNotes(e.target.value)}
							placeholder="Nhập ghi chú cho đơn hàng..."
							className="min-h-[90px] resize-none"
						/>
					</div>
				</div>

				{/* ── Right: order summary ── */}
				<div className="w-full lg:w-80 flex-shrink-0">
					<div className="rounded-xl border border-border p-6 space-y-4 sticky top-6">
						<h2 className="text-base font-semibold">Tóm tắt đơn hàng</h2>

						<div className="space-y-2 text-sm">
							<div className="flex justify-between">
								<span className="text-muted-foreground">Tạm tính</span>
								<span>{formatPrice(totalAmount)}</span>
							</div>
							<div className="flex justify-between">
								<span className="text-muted-foreground">Phí vận chuyển</span>
								<span className="text-green-600 font-medium">Miễn phí</span>
							</div>
						</div>

						<Separator />

						<div className="flex justify-between text-sm font-semibold">
							<span>Tổng cộng</span>
							<span className="text-primary text-base">{formatPrice(grandTotal)}</span>
						</div>

						<p className="text-xs text-muted-foreground">(Đã bao gồm VAT nếu có)</p>

						<Button className="w-full h-11 font-medium" disabled={isLoading} size="lg">
							{isLoading ? "Đang xử lý..." : "Thanh toán"}
						</Button>

						<Button variant="outline" className="w-full" onClick={() => navigate("/")}>
							Tiếp tục mua sắm
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
