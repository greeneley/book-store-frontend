import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCartStore } from "@/store/useCartStore";
import { formatPrice } from "@/utils/helpers/formatPrice";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartItem } from "./CartItem";

export default function Cart() {
	const { cart, totalAmount, isLoading, error, fetchCart } = useCartStore();
	const navigate = useNavigate();

	const [orderNotes, setOrderNotes] = useState("");

	// Fetch cart khi component mount
	useEffect(() => {
		fetchCart();
	}, [fetchCart]);

	// Hiển thị loading
	if (isLoading) {
		return (
			<div className="w-[1000px] mx-auto my-5 p-6 bg-white">
				<div className="flex items-center justify-center py-16">
					<div className="text-center">
						<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
						<p className="text-gray-600">Đang tải giỏ hàng...</p>
					</div>
				</div>
			</div>
		);
	}

	// Hiển thị error
	if (error) {
		return (
			<div className="w-[1000px] mx-auto my-5 p-6 bg-white">
				<div className="flex flex-col items-center justify-center py-16 text-center">
					<div className="text-red-500 mb-4">
						<svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
							<path
								fillRule="evenodd"
								d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
								clipRule="evenodd"
							/>
						</svg>
					</div>
					<h2 className="text-xl font-semibold text-gray-800 mb-2">Có lỗi xảy ra</h2>
					<p className="text-gray-600 mb-4">{error}</p>
					<Button onClick={() => fetchCart()} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded">
						Thử lại
					</Button>
				</div>
			</div>
		);
	}

	return (
		<div className="w-[1000px] mx-auto my-5 p-6 bg-white">
			{cart.length === 0 ? (
				<div className="flex flex-col items-center justify-center px-4 py-16 text-center">
					<img src="/assets/cart_empty_background.png" />
					<div className="space-y-4 max-w-md">
						<h2 className="text-2xl font-bold text-gray-800">Oop! &quot;hông&quot; có gì trong giỏ hết</h2>
						<p className="text-gray-600 text-lg">Về trang chủ hàng để chọn mua sản phẩm bạn nhé!!</p>
					</div>
					<Button
						size="lg"
						className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg font-medium shadow-lg"
						onClick={() => navigate("/")}>
						Mua sắm ngay
					</Button>
				</div>
			) : (
				<div className="grid grid-cols-3 gap-8">
					{/*Left Column*/}
					<div className="col-span-2">
						<h1 className="text-2xl font-semibold mb-6">Giỏ hàng</h1>
						{/*Cart items*/}

						<div className="space-y-6">
							{cart.map((item) => (
								<CartItem key={item.id} product={item} />
							))}
						</div>

						<div className="mt-8">
							<Label htmlFor="notes" className="text-base font-medium mb-3 block">
								Ghi chú đơn hàng
							</Label>
							<Textarea
								id="notes"
								value={orderNotes}
								onChange={(e) => setOrderNotes(e.target.value)}
								className="min-h-[100px]"
								placeholder="Nhập ghi chú cho đơn hàng..."
							/>
						</div>
					</div>
					{/*Right Column*/}
					<div className="col-span-1">
						<div className="bg-gray-50 p-6 rounded-lg sticky top-6">
							<div className="pt-4 mb-6">
								<div className="flex justify-between items-center mb-2">
									<span className="text-lg font-semibold">TỔNG CỘNG</span>
									<span className="text-xl font-bold text-red-500">{formatPrice(totalAmount)}</span>
								</div>
								<p className="text-sm text-gray-600">(Đã bao gồm VAT nếu có)</p>
							</div>
							<Button
								className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-medium mb-6"
								disabled={isLoading}>
								{isLoading ? "Đang xử lý..." : "Thanh Toán"}
							</Button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
