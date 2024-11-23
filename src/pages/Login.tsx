import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const loginSchema = z.object({
	email: z.string().email({ message: "Invalid email address" }),
	password: z.string().min(8, { message: "Password must be at least 8 characters" })
});

type LoginFormValues = z.infer<typeof loginSchema>;
export const Login: React.FC = () => {
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	const form = useForm<LoginFormValues>({
		resolver: zodResolver(loginSchema)
	});

	const onSubmit = async (data: LoginFormValues) => {
		setIsLoading(true);
		await new Promise((resolve) => setTimeout(resolve, 2000));
		setIsLoading(false);
		// toast({
		// 	title: "Login successful",
		// 	description: "You have successfully logged in."
		// });

		navigate("/");
	};
	return (
		<div className="w-full flex items-center justify-center bg-gray-50">
			<Card className="w-[350px] md:w-[500px]">
				<CardHeader>
					<CardTitle>Login</CardTitle>
					<CardDescription>Enter your credentials to access your account.</CardDescription>
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
						<div className="space-y-2">
							<Label htmlFor="password">Password</Label>
							<Input id="password" type="password" placeholder="Enter your password" {...form.register("password")} />
							{form.formState.errors.password && (
								<p className="text-sm text-red-500">{form.formState.errors.password.message}</p>
							)}
						</div>
						<Button type="submit" className="w-full" disabled={isLoading}>
							{isLoading ? "Logging in..." : "Login"}
						</Button>
					</form>
				</CardContent>
				<CardFooter className="flex justify-center">
					<p className="text-sm text-gray-500">
						Don't have an account?{" "}
						<a href="/signup" className="text-blue-500 hover:underline">
							Sign up
						</a>
					</p>
				</CardFooter>
			</Card>
		</div>
	);
};
