import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContextProvider";
import { toast } from "@/hooks/use-toast";
import { AuthService } from "@/services/AuthService";
import { zodResolver } from "@hookform/resolvers/zod";
import { HttpStatusCode } from "axios";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { AuthLayout } from "./AuthLayout";

const loginSchema = z.object({
	username: z.string().min(2, { message: "Tên đăng nhập phải có ít nhất 2 ký tự" }),
	password: z.string().min(8, { message: "Mật khẩu phải có ít nhất 8 ký tự" })
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const Login: React.FC = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();
	const { setAccessToken, setRefreshToken, setUser } = useAuth();

	const form = useForm<LoginFormValues>({
		reValidateMode: "onSubmit",
		resolver: zodResolver(loginSchema)
	});

	const onSubmit = async (data: LoginFormValues) => {
		setIsLoading(true);
		setError(null);
		try {
			const result = await AuthService.login(data.username, data.password);
			setAccessToken(result.accessToken);
			setRefreshToken(result.refreshToken);
			setUser({
				username: result.username,
				email: result.email,
				firstName: result.firstName,
				lastName: result.lastName,
				_id: result._id
			});
			toast({ title: "Đăng nhập thành công", description: "Bạn đã đăng nhập thành công." });
			navigate("/");
		} catch (error) {
			const status = error.response?.status;
			if (status === HttpStatusCode.Unauthorized) setError("Tên đăng nhập hoặc mật khẩu không đúng.");
			else if (status === HttpStatusCode.Conflict) setError("Tài khoản của bạn hiện đang bị khóa.");
			else setError("Đã xảy ra lỗi. Vui lòng thử lại.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<AuthLayout>
			<div className="space-y-8">
				<div className="space-y-1">
					<h1 className="text-2xl font-semibold tracking-tight text-gray-900">Chào mừng trở lại</h1>
					<p className="text-sm text-gray-500">Nhập thông tin đăng nhập để truy cập tài khoản của bạn.</p>
				</div>

				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5" noValidate>
					<div className="space-y-1.5">
						<Label htmlFor="username" className="text-xs font-medium text-gray-700 uppercase tracking-wide">
							Tên đăng nhập
						</Label>
						<Input
							id="username"
							placeholder="Tên đăng nhập của bạn"
							autoComplete="username"
							className="h-11 border-gray-200 focus:border-gray-900 focus:ring-0 transition-colors"
							{...form.register("username")}
						/>
						{form.formState.errors.username && (
							<p className="text-xs text-red-500">{form.formState.errors.username.message}</p>
						)}
					</div>

					<div className="space-y-1.5">
						<div className="flex items-center justify-between">
							<Label htmlFor="password" className="text-xs font-medium text-gray-700 uppercase tracking-wide">
								Mật khẩu
							</Label>
							<Link to="/forgot-password" className="text-xs text-gray-500 hover:text-gray-900 transition-colors">
								Quên mật khẩu?
							</Link>
						</div>
						<div className="relative">
							<Input
								id="password"
								type={showPassword ? "text" : "password"}
								placeholder="••••••••"
								autoComplete="current-password"
								className="h-11 pr-10 border-gray-200 focus:border-gray-900 focus:ring-0 transition-colors"
								{...form.register("password")}
							/>
							<button
								type="button"
								onClick={() => setShowPassword((p) => !p)}
								className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors"
								aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}>
								{showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
							</button>
						</div>
						{form.formState.errors.password && (
							<p className="text-xs text-red-500">{form.formState.errors.password.message}</p>
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
								<Loader2 className="w-4 h-4 animate-spin" /> Đang đăng nhập...
							</span>
						) : (
							"Đăng nhập"
						)}
					</Button>
				</form>

				<p className="text-center text-sm text-gray-500">
					Chưa có tài khoản?{" "}
					<Link to="/signup" className="text-gray-900 font-medium hover:underline">
						Đăng ký
					</Link>
				</p>
			</div>
		</AuthLayout>
	);
};
