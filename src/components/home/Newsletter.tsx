import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, CheckCircle, Mail, Send } from "lucide-react";
import React, { useState } from "react";

export const Newsletter: React.FC = () => {
	const [email, setEmail] = useState("");
	const [submitted, setSubmitted] = useState(false);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (email.trim()) {
			setSubmitted(true);
			setEmail("");
			setTimeout(() => setSubmitted(false), 3000);
		}
	};

	return (
		<section className="py-12 lg:py-16">
			<div className="container mx-auto px-4">
				<div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary to-primary/80 p-8 lg:p-12">
					{/* decorative circles */}
					<div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
					<div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

					<div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
						<div className="text-center lg:text-left text-primary-foreground max-w-md">
							<div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
								<Mail className="h-6 w-6" />
								<BookOpen className="h-6 w-6" />
							</div>
							<h2 className="font-serif text-2xl lg:text-3xl font-semibold mb-3">Đừng Bỏ Lỡ Tin Tức</h2>
							<p className="text-primary-foreground/80 leading-relaxed text-sm">
								Đăng ký nhận bản tin để nhận ưu đãi độc quyền, sách mới ra mắt, và gợi ý đọc sách được cá nhân hóa gửi
								thẳng đến hộp thư của bạn.
							</p>
						</div>

						<div className="w-full lg:w-auto shrink-0">
							{submitted ? (
								<div className="flex items-center justify-center gap-3 bg-white/20 backdrop-blur-sm rounded-xl px-6 py-4 text-primary-foreground">
									<CheckCircle className="h-5 w-5" />
									<span className="font-medium">Cảm ơn bạn đã đăng ký!</span>
								</div>
							) : (
								<form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
									<Input
										type="email"
										placeholder="Nhập email của bạn"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										required
										className="min-w-[260px] bg-white/90 border-0 text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-white"
									/>
									<Button type="submit" className="bg-white text-primary hover:bg-white/90 font-semibold gap-2">
										<Send className="h-4 w-4" />
										Đăng Ký
									</Button>
								</form>
							)}
							<p className="text-xs text-primary-foreground/60 mt-3 text-center lg:text-left">
								Không spam. Hủy đăng ký bất cứ lúc nào.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
