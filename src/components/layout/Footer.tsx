import { BookOpen, CreditCard, Facebook, Instagram, Mail, MapPin, Phone, Twitter, Youtube } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const footerLinks = {
	shop: [
		{ name: "Tất cả sách", href: "/home" },
		{ name: "Sách bán chạy", href: "/home" },
		{ name: "Sách mới", href: "/home" },
		{ name: "Khuyến mãi", href: "/home" },
		{ name: "Thẻ quà tặng", href: "/home" }
	],
	categories: [
		{ name: "Kinh doanh", href: "/home" },
		{ name: "Công nghệ", href: "/home" },
		{ name: "Phát triển bản thân", href: "/home" },
		{ name: "Tiểu thuyết", href: "/home" },
		{ name: "Giáo dục", href: "/home" },
		{ name: "Thiếu nhi", href: "/home" }
	],
	support: [
		{ name: "Hướng dẫn đặt hàng", href: "/pages/huong-dan-dat-hang" },
		{ name: "Câu hỏi thường gặp", href: "/pages/cac-cau-hoi-thuong-gap" },
		{ name: "Chính sách đổi trả", href: "/pages/chinh-sach-doi-tra" },
		{ name: "Chính sách bảo mật", href: "/pages/chinh-sach-bao-mat" },
		{ name: "Liên hệ", href: "/home" }
	],
	company: [
		{ name: "Về Văn Lang", href: "https://vanlang.vn/pages/van-lang" },
		{ name: "Tuyển dụng", href: "/home" },
		{ name: "Blog", href: "/home" },
		{ name: "Chương trình liên kết", href: "/home" }
	]
};

const socialLinks = [
	{ name: "Facebook", Icon: Facebook, href: "#" },
	{ name: "Twitter", Icon: Twitter, href: "#" },
	{ name: "Instagram", Icon: Instagram, href: "#" },
	{ name: "YouTube", Icon: Youtube, href: "#" }
];

const paymentMethods = ["Visa", "Mastercard", "MoMo", "ZaloPay", "VNPay"];

export const Footer: React.FC = () => {
	return (
		<footer className="bg-foreground text-background">
			<div className="container mx-auto px-4 py-12 lg:py-16">
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-10">
					{/* Brand */}
					<div className="col-span-2 md:col-span-3 lg:col-span-2">
						<Link to="/home" className="flex items-center gap-2 mb-4">
							<BookOpen className="h-7 w-7" />
							<span className="font-serif text-xl font-semibold">Nhà Sách Văn Lang</span>
						</Link>
						<p className="text-background/70 text-sm mb-5 max-w-xs leading-relaxed">
							Điểm đến cao cấp dành cho sách của bạn. Khám phá sách bán chạy, sách mới và tìm cuốn sách yêu thích tiếp
							theo.
						</p>
						<div className="space-y-2 text-sm text-background/70">
							<div className="flex items-start gap-2">
								<MapPin className="h-4 w-4 mt-0.5 shrink-0" />
								<span>40 - 42 Nguyễn Thị Minh Khai, Phường Sài Gòn, TP.HCM</span>
							</div>
							<div className="flex items-center gap-2">
								<Phone className="h-4 w-4 shrink-0" />
								<a href="tel:02838233022" className="hover:text-background transition-colors">
									028.38.233.022
								</a>
							</div>
							<div className="flex items-center gap-2">
								<Mail className="h-4 w-4 shrink-0" />
								<a href="mailto:support@vanlang.vn" className="hover:text-background transition-colors">
									support@vanlang.vn
								</a>
							</div>
						</div>
					</div>

					{/* Shop */}
					<div>
						<h3 className="font-semibold mb-4 text-sm uppercase tracking-wider">Cửa Hàng</h3>
						<ul className="space-y-2">
							{footerLinks.shop.map((link) => (
								<li key={link.name}>
									<Link to={link.href} className="text-sm text-background/70 hover:text-background transition-colors">
										{link.name}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Categories */}
					<div>
						<h3 className="font-semibold mb-4 text-sm uppercase tracking-wider">Danh Mục</h3>
						<ul className="space-y-2">
							{footerLinks.categories.map((link) => (
								<li key={link.name}>
									<Link to={link.href} className="text-sm text-background/70 hover:text-background transition-colors">
										{link.name}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Support */}
					<div>
						<h3 className="font-semibold mb-4 text-sm uppercase tracking-wider">Hỗ Trợ</h3>
						<ul className="space-y-2">
							{footerLinks.support.map((link) => (
								<li key={link.name}>
									<Link to={link.href} className="text-sm text-background/70 hover:text-background transition-colors">
										{link.name}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Company */}
					<div>
						<h3 className="font-semibold mb-4 text-sm uppercase tracking-wider">Công Ty</h3>
						<ul className="space-y-2">
							{footerLinks.company.map((link) => (
								<li key={link.name}>
									<a href={link.href} className="text-sm text-background/70 hover:text-background transition-colors">
										{link.name}
									</a>
								</li>
							))}
						</ul>
						<div className="mt-5">
							<a href="http://online.gov.vn/Home/WebDetails/14675" title="Logo Bộ Công Thương">
								<img
									src="/assets/logo_bct.png"
									width="104"
									height="40"
									alt="Bộ Công Thương"
									className="opacity-70 hover:opacity-100 transition-opacity"
								/>
							</a>
						</div>
					</div>
				</div>

				<div className="my-8 border-t border-background/20" />

				{/* Bottom */}
				<div className="flex flex-col lg:flex-row items-center justify-between gap-5">
					<div className="flex items-center gap-3">
						{socialLinks.map(({ name, Icon, href }) => (
							<a
								key={name}
								href={href}
								className="w-9 h-9 rounded-full bg-background/10 hover:bg-background/25 flex items-center justify-center transition-colors"
								title={name}>
								<Icon className="h-4 w-4" />
							</a>
						))}
					</div>

					<div className="flex items-center gap-2">
						<CreditCard className="h-4 w-4 text-background/50" />
						<div className="flex items-center gap-1.5">
							{paymentMethods.map((m) => (
								<span key={m} className="text-xs bg-background/10 px-2 py-0.5 rounded">
									{m}
								</span>
							))}
						</div>
					</div>

					<p className="text-xs text-background/50">
						&copy; {new Date().getFullYear()} Nhà Sách Văn Lang. Bản quyền thuộc về chúng tôi.
					</p>
				</div>
			</div>
		</footer>
	);
};
