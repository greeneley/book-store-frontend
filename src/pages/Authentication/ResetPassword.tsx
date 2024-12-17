import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthService } from "@/services/AuthService";
import { zodResolver } from "@hookform/resolvers/zod";
import { KeyRound } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { z } from "zod";

const resetPasswordSchema = z
	.object({
		password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
		confirmPassword: z.string().min(8, { message: "Confirm password must be at least 8 characters long" })
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ["confirmPassword"]
	});

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export const ResetPassword: React.FC = () => {
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const [error, setError] = useState<string | null>(null);
	const [searchParams] = useSearchParams();

	const form = useForm<ResetPasswordFormValues>({
		resolver: zodResolver(resetPasswordSchema)
	});

	useEffect(() => {
		if (!searchParams.get("code")) {
			navigate("/login");
		}
	}, [navigate, searchParams]);

	const onSubmit = async (data: ResetPasswordFormValues) => {
		setIsLoading(true);
		setError(null);

		try {
			const token = searchParams.get("code");
			const password = data.password;
			await AuthService.resetPassword(token, password);
			navigate("/password-updated");
		} catch (error) {
			setError(error.response.data.message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="w-full flex items-center justify-center bg-gray-50">
			<Card className="min-w-[450px]">
				<CardHeader>
					<div className="flex justify-center mb-4">
						<KeyRound className="h-12 w-12 text-blue-500" />
					</div>
					<CardTitle>Reset Password</CardTitle>
					<CardDescription>Enter your new password below.</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="password">New Password</Label>
							<Input
								id="password"
								type="password"
								placeholder="Enter your new password"
								{...form.register("password")}
							/>
							{form.formState.errors.password && (
								<p className="text-sm text-red-500">{form.formState.errors.password.message}</p>
							)}
						</div>
						<div className="space-y-2">
							<Label htmlFor="confirmPassword">Confirm New Password</Label>
							<Input
								id="confirmPassword"
								type="password"
								placeholder="Confirm your new password"
								{...form.register("confirmPassword")}
							/>
							{form.formState.errors.confirmPassword && (
								<p className="text-sm text-red-500">{form.formState.errors.confirmPassword.message}</p>
							)}
						</div>
						{error && <p className="text-sm text-red-500">{error}</p>}
						<Button type="submit" className="w-full" disabled={isLoading}>
							{isLoading ? "Resetting..." : "Reset Password"}
						</Button>
					</form>
				</CardContent>
				<CardFooter className="flex justify-center">
					<p className="text-sm text-gray-500">
						Remember your password?{" "}
						<a href="/login" className="text-blue-500 hover:underline">
							Back to login
						</a>
					</p>
				</CardFooter>
			</Card>
		</div>
	);
};
