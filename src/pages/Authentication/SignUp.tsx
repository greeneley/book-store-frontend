import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthService } from "@/services/AuthService";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const signupSchema = z
	.object({
		username: z.string().min(3, { message: "Username must be at least 3 characters long" }),
		password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
		confirmPassword: z.string().min(8, { message: "Password must be at least 8 characters long" }),
		email: z.string().email({ message: "Invalid email address" }),
		firstName: z.string().min(1, { message: "First name is required" }),
		lastName: z.string().min(1, { message: "Last name is required" }),
		phone: z
			.string()
			.regex(/^0\d{1,14}$/, { message: "Invalid phone number" })
			.optional()
			.or(z.literal("")),
		birthday: z
			.string()
			.refine(
				(date) => {
					const birthDate = new Date(date);
					const today = new Date();
					return (
						birthDate < today && birthDate > new Date(today.getFullYear() - 120, today.getMonth(), today.getDate())
					);
				},
				{ message: "Invalid birth date" }
			)
			.optional()
			.or(z.literal(""))
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ["confirmPassword"]
	});

type SignupFormValues = z.infer<typeof signupSchema>;
export const SignUp: React.FC = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();

	const form = useForm<SignupFormValues>({
		reValidateMode: "onSubmit",
		resolver: zodResolver(signupSchema)
	});

	const onSubmit = async (data: SignupFormValues) => {
		setIsLoading(true);
		setError(null);

		try {
			const request = {
				username: data.username,
				password: data.password,
				email: data.email,
				firstName: data.firstName,
				lastName: data.lastName,
				phone: data.phone,
				birthday: data.birthday
			};

			const result = await AuthService.signup(request);

			navigate("/check-email");
		} catch (error) {
			setError(error.message);
		} finally {
			setIsLoading(false);
		}
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
							<Label htmlFor="name" className="after:ml-0.5 after:text-red-500 after:content-['*']">
								Username
							</Label>
							<Input id="name" placeholder="Enter your username" {...form.register("username")} />
							{form.formState.errors.username && (
								<p className="text-sm text-red-500">{form.formState.errors.username.message}</p>
							)}
						</div>
						<div className="space-y-2">
							<Label htmlFor="password" className="after:ml-0.5 after:text-red-500 after:content-['*']">
								Password
							</Label>
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
						<div className="space-y-2">
							<Label htmlFor="email" className="after:ml-0.5 after:text-red-500 after:content-['*']">
								Email
							</Label>
							<Input id="email" type="email" placeholder="Enter your email" {...form.register("email")} />
							{form.formState.errors.email && (
								<p className="text-sm text-red-500">{form.formState.errors.email.message}</p>
							)}
						</div>
						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label htmlFor="firstName" className="after:ml-0.5 after:text-red-500 after:content-['*']">
									First Name
								</Label>
								<Input id="firstName" placeholder="Enter your first name" {...form.register("firstName")} />
								{form.formState.errors.firstName && (
									<p className="text-sm text-red-500">{form.formState.errors.firstName.message}</p>
								)}
							</div>
							<div className="space-y-2">
								<Label htmlFor="lastName" className="after:ml-0.5 after:text-red-500 after:content-['*']">
									Last Name
								</Label>
								<Input id="lastName" placeholder="Enter your last name" {...form.register("lastName")} />
								{form.formState.errors.lastName && (
									<p className="text-sm text-red-500">{form.formState.errors.lastName.message}</p>
								)}
							</div>
						</div>
						<div className="space-y-2">
							<Label htmlFor="phone">Phone</Label>
							<Input id="phone" type="tel" placeholder="Enter your phone number" {...form.register("phone")} />
							{form.formState.errors.phone && (
								<p className="text-sm text-red-500">{form.formState.errors.phone.message}</p>
							)}
						</div>
						<div className="space-y-2">
							<Label htmlFor="birthday">Birthday</Label>
							<Input id="birthday" type="date" {...form.register("birthday")} />
							{form.formState.errors.birthday && (
								<p className="text-sm text-red-500">{form.formState.errors.birthday.message}</p>
							)}
						</div>
						<p className="text-sm text-gray-500 mt-4">
							Fields marked with <span className="text-red-500">*</span> are required
						</p>
						{error && <p className="text-sm text-red-500">{error}</p>}
						<Button type="submit" className="w-full" disabled={isLoading}>
							{isLoading ? "Signing up..." : "Sign up"}
						</Button>
					</form>
				</CardContent>
				<CardFooter className="flex justify-center">
					<p className="text-sm text-gray-500">
						Already have an account?{" "}
						<a href="/login" className="text-blue-500 hover:underline">
							Login
						</a>
					</p>
				</CardFooter>
			</Card>
		</div>
	);
};
