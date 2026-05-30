import { Button } from "@/components/ui/button";
import { AuthService } from "@/services/AuthService";
import { Loader2, Mail } from "lucide-react";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthLayout } from "./AuthLayout";

export const CheckYourEmail: React.FC = () => {
	const { state } = useLocation();
	const [isResending, setIsResending] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [resendSuccess, setResendSuccess] = useState(false);

	const handleResendEmail = async () => {
		setIsResending(true);
		setError(null);
		setResendSuccess(false);
		try {
			await AuthService.resend(state?.email);
			setResendSuccess(true);
		} catch (error) {
			setError(error.response?.data?.message ?? "Đã xảy ra lỗi. Vui lòng thử lại.");
		} finally {
			setIsResending(false);
		}
	};

	return (
		<AuthLayout>
			<div className="space-y-8 text-center">
				<div className="flex flex-col items-center space-y-4">
					<div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
						<Mail className="w-7 h-7 text-gray-700" />
					</div>
					<div className="space-y-1">
						<h1 className="text-2xl font-semibold tracking-tight text-gray-900">Kiểm tra email của bạn</h1>
						<p className="text-sm text-gray-500">
							Chúng tôi đã gửi link xác minh
							{state?.email && (
								<>
									{" "}
									đến <span className="font-medium text-gray-800">{state.email}</span>
								</>
							)}
							.
						</p>
					</div>
				</div>

				<p className="text-sm text-gray-500 leading-relaxed">
					Nhấp vào link trong email để kích hoạt tài khoản. Nếu không thấy, hãy kiểm tra thư mục spam.
				</p>

				{resendSuccess && (
					<div className="rounded-md bg-green-50 border border-green-100 px-4 py-3">
						<p className="text-sm text-green-700">Email xác minh đã được gửi lại!</p>
					</div>
				)}
				{error && (
					<div className="rounded-md bg-red-50 border border-red-100 px-4 py-3">
						<p className="text-sm text-red-600">{error}</p>
					</div>
				)}

				<div className="space-y-3">
					<Button
						onClick={handleResendEmail}
						disabled={isResending}
						className="w-full h-11 bg-gray-900 hover:bg-gray-700 text-white font-medium transition-colors">
						{isResending ? (
							<span className="flex items-center gap-2">
								<Loader2 className="w-4 h-4 animate-spin" /> Đang gửi lại...
							</span>
						) : (
							"Gửi lại email xác minh"
						)}
					</Button>

					<p className="text-sm text-gray-500">
						Sai email?{" "}
						<Link to="/signup" className="text-gray-900 font-medium hover:underline">
							Quay lại đăng ký
						</Link>
					</p>
				</div>
			</div>
		</AuthLayout>
	);
};
