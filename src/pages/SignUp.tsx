import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const signupSchema = z
	.object({
		name: z.string().min(2, { message: "Name must be at least 2 characters long" }),
		email: z.string().email({ message: "Invalid email address" }),
		password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
		confirmPassword: z.string().min(8, { message: "Password must be at least 8 characters long" })
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ["confirmPassword"]
	});

type SignupFormValues = z.infer<typeof signupSchema>;
export const SignUp: React.FC = () => {
	const [isLoading, setIsLoading] = useState(false);

	const form = useForm<SignupFormValues>({
		resolver: zodResolver(signupSchema)
	});

	const onSubmit = async (data: SignupFormValues) => {
		setIsLoading(true);

		await new Promise((resolve) => setTimeout(resolve, 2000));

		setIsLoading(false);

		toast({
			title: "Signup successful",
			description: "Your account has been created successfully."
		});
	};

	return (
		<div className="w-full flex items-center justify-center bg-gray-50">
			<Card className="w-[350px] md:w-[500px]">
				<CardHeader>
					<CardTitle>Sign Up</CardTitle>
					<CardDescription>Create an account to get started.</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="name">Name</Label>
							<Input id="name" placeholder="Enter your name" {...form.register("name")} />
							{form.formState.errors.name && (
								<p className="text-sm text-red-500">{form.formState.errors.name.message}</p>
							)}
						</div>
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
						<div className="space-y-2">
							<Label htmlFor="confirmPassword">Confirm Password</Label>
							<Input
								id="confirmPassword"
								type="password"
								placeholder="Confirm your password"
								{...form.register("confirmPassword")}
							/>
							{form.formState.errors.confirmPassword && (
								<p className="text-sm text-red-500">{form.formState.errors.confirmPassword.message}</p>
							)}
						</div>
						<Button type="submit" className="w-full" disabled={isLoading}>
							{isLoading ? "Signing up..." : "Sign up"}
						</Button>
					</form>
				</CardContent>
				<CardFooter className="flex justify-center">
					<p className="text-sm text-gray-500">
						Already have an account?
						<a href="/login" className="text-blue-500 hover:underline">
							Login
						</a>
					</p>
				</CardFooter>
			</Card>
		</div>
	);
};
