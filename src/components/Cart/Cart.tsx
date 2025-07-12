import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCartStore } from "@/store/useCartStore";
import { formatPrice } from "@/utils/helpers/formatPrice";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartItem } from "./CartItem";

export default function Cart() {
	const { cart } = useCartStore();
	const navigate = useNavigate();

	const [orderNotes, setOrderNotes] = useState("");

	const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

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
							<Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-medium mb-6">
								Thanh Toán
							</Button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
