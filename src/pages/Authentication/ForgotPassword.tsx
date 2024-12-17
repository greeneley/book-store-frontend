import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthService } from "@/services/AuthService";
import { zodResolver } from "@hookform/resolvers/zod";
import { Key } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const forgotPasswordSchema = z.object({
	email: z.string().email({ message: "Invalid email address" })
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
			setError(error.response.data.message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="w-full flex items-center justify-center bg-gray-50 py-5">
			<Card className="min-w-[450px]">
				<CardHeader>
					<div className="flex justify-center mb-4">
						<Key className="h-12 w-12 text-blue-500" />
					</div>
					<CardTitle>Forgot Password</CardTitle>
					<CardDescription>Enter your email to reset your password.</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="email">Email</Label>
							<Input id="email" type="email" placeholder="Enter your email" {...form.register("email")} />
							{form.formState.errors.email && (
								<p className="text-sm text-red-500">{form.formState.errors.email.message}</p>
							)}
						</div>
						{success && <p className="text-sm p-3 bg-green-200">We have e-mailed your password reset link!</p>}
						{error && <p className="text-sm text-red-500">{error}</p>}
						<Button type="submit" className="w-full" disabled={isLoading}>
							{isLoading ? "Sending..." : "Send Reset Link"}
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
