import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthService } from "@/services/AuthService";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { AuthLayout } from "./AuthLayout";

const signupSchema = z
	.object({
		username: z.string().min(3, { message: "Tên đăng nhập phải có ít nhất 3 ký tự" }),
		password: z.string().min(8, { message: "Mật khẩu phải có ít nhất 8 ký tự" }),
		confirmPassword: z.string().min(8, { message: "Mật khẩu xác nhận phải có ít nhất 8 ký tự" }),
		email: z.string().email({ message: "Địa chỉ email không hợp lệ" }),
		firstName: z.string().min(1, { message: "Vui lòng nhập tên" }),
		lastName: z.string().min(1, { message: "Vui lòng nhập họ" }),
		phone: z
			.string()
			.regex(/^0\d{1,14}$/, { message: "Số điện thoại không hợp lệ" })
			.optional()
			.or(z.literal("")),
		birthday: z
			.string()
			.refine(
				(date) => {
					if (!date) return true;
					const birthDate = new Date(date);
					const today = new Date();
					return (
						birthDate < today && birthDate > new Date(today.getFullYear() - 120, today.getMonth(), today.getDate())
					);
				},
				{ message: "Ngày sinh không hợp lệ" }
			)
			.optional()
			.or(z.literal(""))
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Mật khẩu xác nhận không khớp",
		path: ["confirmPassword"]
	});

type SignupFormValues = z.infer<typeof signupSchema>;

const FieldError: React.FC<{ message?: string }> = ({ message }) =>
	message ? <p className="text-xs text-red-500">{message}</p> : null;

const fieldClass = "h-11 border-gray-200 focus:border-gray-900 focus:ring-0 transition-colors";
const labelClass = "text-xs font-medium text-gray-700 uppercase tracking-wide";

export const SignUp: React.FC = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirm, setShowConfirm] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();

	const form = useForm<SignupFormValues>({
		reValidateMode: "onSubmit",
		resolver: zodResolver(signupSchema)
	});

	const onSubmit = async (data: SignupFormValues) => {
		setIsLoading(true);
		setError(null);
		const { username, password, email, firstName, lastName, phone, birthday } = data;
		try {
			await AuthService.signup({ username, password, email, firstName, lastName, phone, birthday });
			navigate("/check-email", { state: { email } });
		} catch (error) {
			setError(error.response?.data?.message ?? "Đã xảy ra lỗi. Vui lòng thử lại.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<AuthLayout>
			<div className="space-y-8">
				<div className="space-y-1">
					<h1 className="text-2xl font-semibold tracking-tight text-gray-900">Tạo tài khoản</h1>
					<p className="text-sm text-gray-500">Điền thông tin bên dưới để bắt đầu.</p>
				</div>

				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5" noValidate>
					{/* Username */}
					<div className="space-y-1.5">
						<Label htmlFor="username" className={labelClass}>
							Tên đăng nhập <span className="text-red-500 normal-case">*</span>
						</Label>
						<Input
							id="username"
							placeholder="Tên đăng nhập của bạn"
							className={fieldClass}
							{...form.register("username")}
						/>
						<FieldError message={form.formState.errors.username?.message} />
					</div>

					{/* Password */}
					<div className="space-y-1.5">
						<Label htmlFor="password" className={labelClass}>
							Mật khẩu <span className="text-red-500 normal-case">*</span>
						</Label>
						<div className="relative">
							<Input
								id="password"
								type={showPassword ? "text" : "password"}
								placeholder="••••••••"
								className={`${fieldClass} pr-10`}
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
						<FieldError message={form.formState.errors.password?.message} />
					</div>

					{/* Confirm Password */}
					<div className="space-y-1.5">
						<Label htmlFor="confirmPassword" className={labelClass}>
							Xác nhận mật khẩu <span className="text-red-500 normal-case">*</span>
						</Label>
						<div className="relative">
							<Input
								id="confirmPassword"
								type={showConfirm ? "text" : "password"}
								placeholder="••••••••"
								className={`${fieldClass} pr-10`}
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
						<FieldError message={form.formState.errors.confirmPassword?.message} />
					</div>

					{/* Email */}
					<div className="space-y-1.5">
						<Label htmlFor="email" className={labelClass}>
							Email <span className="text-red-500 normal-case">*</span>
						</Label>
						<Input
							id="email"
							type="email"
							placeholder="ban@example.com"
							className={fieldClass}
							{...form.register("email")}
						/>
						<FieldError message={form.formState.errors.email?.message} />
					</div>

					{/* First / Last Name */}
					<div className="grid grid-cols-2 gap-3">
						<div className="space-y-1.5">
							<Label htmlFor="firstName" className={labelClass}>
								Tên <span className="text-red-500 normal-case">*</span>
							</Label>
							<Input id="firstName" placeholder="Tên" className={fieldClass} {...form.register("firstName")} />
							<FieldError message={form.formState.errors.firstName?.message} />
						</div>
						<div className="space-y-1.5">
							<Label htmlFor="lastName" className={labelClass}>
								Họ <span className="text-red-500 normal-case">*</span>
							</Label>
							<Input id="lastName" placeholder="Họ" className={fieldClass} {...form.register("lastName")} />
							<FieldError message={form.formState.errors.lastName?.message} />
						</div>
					</div>

					{/* Phone */}
					<div className="space-y-1.5">
						<Label htmlFor="phone" className={labelClass}>
							Số điện thoại
						</Label>
						<Input id="phone" type="tel" placeholder="0xxxxxxxxx" className={fieldClass} {...form.register("phone")} />
						<FieldError message={form.formState.errors.phone?.message} />
					</div>

					{/* Birthday */}
					<div className="space-y-1.5">
						<Label htmlFor="birthday" className={labelClass}>
							Ngày sinh
						</Label>
						<Input id="birthday" type="date" className={fieldClass} {...form.register("birthday")} />
						<FieldError message={form.formState.errors.birthday?.message} />
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
								<Loader2 className="w-4 h-4 animate-spin" /> Đang tạo tài khoản...
							</span>
						) : (
							"Tạo tài khoản"
						)}
					</Button>
				</form>

				<p className="text-center text-sm text-gray-500">
					Đã có tài khoản?{" "}
					<Link to="/login" className="text-gray-900 font-medium hover:underline">
						Đăng nhập
					</Link>
				</p>
			</div>
		</AuthLayout>
	);
};
