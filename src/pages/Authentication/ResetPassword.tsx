import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthService } from "@/services/AuthService";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, KeyRound, Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { z } from "zod";
import { AuthLayout } from "./AuthLayout";

const resetPasswordSchema = z
	.object({
		password: z.string().min(8, { message: "Mật khẩu phải có ít nhất 8 ký tự" }),
		confirmPassword: z.string().min(8, { message: "Mật khẩu xác nhận phải có ít nhất 8 ký tự" })
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Mật khẩu xác nhận không khớp",
		path: ["confirmPassword"]
	});

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export const ResetPassword: React.FC = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirm, setShowConfirm] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();

	const form = useForm<ResetPasswordFormValues>({
		resolver: zodResolver(resetPasswordSchema)
	});

	useEffect(() => {
		if (!searchParams.get("code")) navigate("/login");
	}, [navigate, searchParams]);

	const onSubmit = async (data: ResetPasswordFormValues) => {
		setIsLoading(true);
		setError(null);
		try {
			const token = searchParams.get("code");
			await AuthService.resetPassword(token, data.password);
			navigate("/password-updated");
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
						<KeyRound className="w-5 h-5 text-gray-700" />
					</div>
					<div className="space-y-1">
						<h1 className="text-2xl font-semibold tracking-tight text-gray-900">Đặt mật khẩu mới</h1>
						<p className="text-sm text-gray-500">Mật khẩu mới phải có ít nhất 8 ký tự.</p>
					</div>
				</div>

				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5" noValidate>
					<div className="space-y-1.5">
						<Label htmlFor="password" className="text-xs font-medium text-gray-700 uppercase tracking-wide">
							Mật khẩu mới
						</Label>
						<div className="relative">
							<Input
								id="password"
								type={showPassword ? "text" : "password"}
								placeholder="••••••••"
								className="h-11 pr-10 border-gray-200 focus:border-gray-900 focus:ring-0 transition-colors"
								{...form.register("password")}
							/>
							<button
								type="button"
								onClick={() => setShowPassword((p) => !p)}
								className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
								aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}>
								{showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
							</button>
						</div>
						{form.formState.errors.password && (
							<p className="text-xs text-red-500">{form.formState.errors.password.message}</p>
						)}
					</div>

					<div className="space-y-1.5">
						<Label htmlFor="confirmPassword" className="text-xs font-medium text-gray-700 uppercase tracking-wide">
							Xác nhận mật khẩu mới
						</Label>
						<div className="relative">
							<Input
								id="confirmPassword"
								type={showConfirm ? "text" : "password"}
								placeholder="••••••••"
								className="h-11 pr-10 border-gray-200 focus:border-gray-900 focus:ring-0 transition-colors"
								{...form.register("confirmPassword")}
							/>
							<button
								type="button"
								onClick={() => setShowConfirm((p) => !p)}
								className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
								aria-label={showConfirm ? "Ẩn mật khẩu" : "Hiện mật khẩu"}>
								{showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
							</button>
						</div>
						{form.formState.errors.confirmPassword && (
							<p className="text-xs text-red-500">{form.formState.errors.confirmPassword.message}</p>
						)}
					</div>

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
								<Loader2 className="w-4 h-4 animate-spin" /> Đang đặt lại...
							</span>
						) : (
							"Đặt lại mật khẩu"
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
