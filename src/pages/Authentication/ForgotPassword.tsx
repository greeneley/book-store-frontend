import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthService } from "@/services/AuthService";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Mail } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";
import { AuthLayout } from "./AuthLayout";

const forgotPasswordSchema = z.object({
	email: z.string().email({ message: "Địa chỉ email không hợp lệ" })
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export const ForgotPassword: React.FC = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const form = useForm<ForgotPasswordFormValues>({
		resolver: zodResolver(forgotPasswordSchema)
	});

	const onSubmit = async (data: ForgotPasswordFormValues) => {
		setIsLoading(true);
		setSuccess(false);
		setError(null);
		try {
			await AuthService.forgotPassword(data.email);
			setSuccess(true);
		} catch (error) {
			setError(error.response?.data?.message ?? "Đã xảy ra lỗi. Vui lòng thử lại.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<AuthLayout>
			<div className="space-y-8">
				<div className="flex flex-col items-center space-y-3 text-center">
					<div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
						<Mail className="w-5 h-5 text-gray-700" />
					</div>
					<div className="space-y-1">
						<h1 className="text-2xl font-semibold tracking-tight text-gray-900">Quên mật khẩu?</h1>
						<p className="text-sm text-gray-500">Nhập email của bạn, chúng tôi sẽ gửi link đặt lại mật khẩu.</p>
					</div>
				</div>

				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5" noValidate>
					<div className="space-y-1.5">
						<Label htmlFor="email" className="text-xs font-medium text-gray-700 uppercase tracking-wide">
							Email
						</Label>
						<Input
							id="email"
							type="email"
							placeholder="ban@example.com"
							className="h-11 border-gray-200 focus:border-gray-900 focus:ring-0 transition-colors"
							{...form.register("email")}
						/>
						{form.formState.errors.email && (
							<p className="text-xs text-red-500">{form.formState.errors.email.message}</p>
						)}
					</div>

					{success && (
						<div className="rounded-md bg-green-50 border border-green-100 px-4 py-3">
							<p className="text-sm text-green-700">Link đặt lại mật khẩu đã được gửi đến email của bạn!</p>
						</div>
					)}

					{error && (
						<div className="rounded-md bg-red-50 border border-red-100 px-4 py-3">
							<p className="text-sm text-red-600">{error}</p>
						</div>
					)}

					<Button
						type="submit"
						className="w-full h-11 bg-gray-900 hover:bg-gray-700 text-white font-medium transition-colors"
						disabled={isLoading}>
						{isLoading ? (
							<span className="flex items-center gap-2">
								<Loader2 className="w-4 h-4 animate-spin" /> Đang gửi...
							</span>
						) : (
							"Gửi link đặt lại"
						)}
					</Button>
				</form>

				<p className="text-center text-sm text-gray-500">
					Nhớ mật khẩu rồi?{" "}
					<Link to="/login" className="text-gray-900 font-medium hover:underline">
						Quay lại đăng nhập
					</Link>
				</p>
			</div>
		</AuthLayout>
	);
};
