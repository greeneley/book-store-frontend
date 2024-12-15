import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContextProvider";
import { toast } from "@/hooks/use-toast";
import { AuthService } from "@/services/AuthService";
import { zodResolver } from "@hookform/resolvers/zod";
import { HttpStatusCode } from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

const loginSchema = z.object({
	username: z.string().min(2, { message: "Name must be at least 2 characters long" }),
	password: z.string().min(8, { message: "Password must be at least 8 characters" })
});

type LoginFormValues = z.infer<typeof loginSchema>;
export const Login: React.FC = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
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
			toast({
				title: "Login successful",
				description: "You have successfully logged in."
			});
			navigate("/");
		} catch (error) {
			const status = error.response.status;
			if (status === HttpStatusCode.Unauthorized) {
				setError("Invalid email or password");
			} else if (status === HttpStatusCode.Conflict) {
				setError("Your account is currently inactive");
			} else {
				setError("An error occurred. Please try again.");
			}
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<div className="w-full flex items-center justify-center bg-gray-50 py-5">
			<Card className="w-[350px] md:w-[500px]">
				<CardHeader>
					<CardTitle>Login</CardTitle>
					<CardDescription>Enter your credentials to access your account.</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="username">Username</Label>
							<Input id="username" placeholder="Enter your username" {...form.register("username")} />
							{form.formState.errors.username && (
								<p className="text-sm text-red-500">{form.formState.errors.username.message}</p>
							)}
						</div>
						<div className="space-y-2">
							<Label htmlFor="password">Password</Label>
							<Input id="password" type="password" placeholder="Enter your password" {...form.register("password")} />
							{form.formState.errors.password && (
								<p className="text-sm text-red-500">{form.formState.errors.password.message}</p>
							)}
						</div>
						<div className="text-sm text-right">
							<Link to="/forgot-password" className="text-blue-500 hover:underline">
								Forgot password?
							</Link>
						</div>
						{error && <p className="text-sm text-red-500">{error}</p>}
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
