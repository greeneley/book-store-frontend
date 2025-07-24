import { Mail, MapPin, Phone } from "lucide-react";
import React from "react";

export const Footer: React.FC = () => {
	return (
		<footer className="bg-white text-black py-4">
			<div className="container flex justify-center mx-auto px-4">
				<div className="px-5 my-4">
					<img src="/assets/logo-footer.png" alt="logo Nhà Sách Văn Lang - Vanlangbooks" />
					<div className="flex gap-2 mt-2">
						<MapPin scale={2} className="min-w-[24px]" />
						<div>
							<strong>Địa chỉ: </strong>
							<span>40 - 42 Nguyễn Thị Minh Khai, Phường Sài Gòn, TP.HCM</span>
						</div>
					</div>
					<div className="flex gap-2 mt-2">
						<Phone />
						<div>
							<strong>Số điện thoại: </strong>
							<a title="028.38.233.022" href="tel:028.38.233.022">
								028.38.233.022
							</a>
						</div>
					</div>
					<div className="flex gap-2 mt-2">
						<Mail />
						<div>
							<strong>Email: </strong>
							<a title="support@vanlang.vn" href="mailto:support@vanlang.vn">
								support@vanlang.vn
							</a>
						</div>
					</div>
					<a href="http://online.gov.vn/Home/WebDetails/14675" title="Logo Bộ Công Thương" className="mt-2">
						<img src="/assets/logo_bct.png" width="104" height="40" alt="Logo Bộ Công Thương" />
					</a>
				</div>
				<div className="px-5 my-4">
					<h4 className="font-bold text-xl mb-4">HỖ TRỢ</h4>
					<ul className="flex flex-col gap-3">
						<li>
							<a href="/pages/huong-dan-dat-hang" title="Hướng dẫn đặt hàng">
								Hướng dẫn đặt hàng
							</a>
						</li>
						<li>
							<a href="/pages/cac-cau-hoi-thuong-gap" title="Câu hỏi thường gặp">
								Câu hỏi thường gặp
							</a>
						</li>
						<li>
							<a href="/pages/chinh-sach-doi-tra" title="Chính sách đổi trả">
								Chính sách đổi trả
							</a>
						</li>
						<li>
							<a href="/pages/chinh-sach-bao-mat" title="Chính sách bảo mật">
								Chính sách bảo mật
							</a>
						</li>
					</ul>
				</div>
				<div className="px-5 my-4">
					<h4 className="font-bold text-xl mb-4">VỀ VĂN LANG</h4>
					<ul className="flex flex-col gap-3">
						<li>
							<a href="https://vanlang.vn/pages/van-lang" title="Giới thiệu về Vanlangbooks">
								Giới thiệu về Vanlangbooks
							</a>
						</li>
					</ul>
				</div>
				<div className="px-5 my-4">
					<h4 className="font-bold text-xl mb-4">Tổng đài hỗ trợ </h4>
					<p>
						<span>Gọi mua hàng:</span>
						<a className="font-bold mx-1 text-blue-500" href="tel:0961348148">
							0961348148
						</a>
						<span>(7h30-17h00)</span>
					</p>
					<p>
						<span>Gọi khiếu nại:</span>
						<a className="font-bold mx-1 text-blue-500" href="tel:0961348148">
							0961348148
						</a>
						<span>(7h30-17h00)</span>
					</p>
					<h4 className="font-bold text-xl mb-4">Phương thức thanh toán </h4>
				</div>
			</div>
			<div className="text-center text-sm">© {new Date().getFullYear()} BookStore. All rights reserved.</div>
		</footer>
	);
};
