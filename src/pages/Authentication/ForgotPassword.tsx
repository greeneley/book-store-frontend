import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
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

	const form = useForm<ForgotPasswordFormValues>({
		resolver: zodResolver(forgotPasswordSchema)
	});

	const onSubmit = async (data: ForgotPasswordFormValues) => {
		setIsLoading(true);
		// Simulate API call
		await new Promise((resolve) => setTimeout(resolve, 2000));
		console.log(data);
		setIsLoading(false);
		toast({
			title: "Reset email sent",
			description: "If an account exists with this email, you will receive password reset instructions."
		});
	};

	return (
		<div className="w-full flex items-center justify-center bg-gray-50 py-5">
			<Card className="w-[350px]">
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
