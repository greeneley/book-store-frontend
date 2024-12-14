import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Mail } from "lucide-react";
import React, { useState } from "react";

export const CheckYourEmail: React.FC = () => {
	const [isResending, setIsResending] = useState(false);

	const handleResendEmail = async () => {
		setIsResending(true);
		// Simulate API call to resend verification email
		await new Promise((resolve) => setTimeout(resolve, 2000));
		setIsResending(false);
		toast({
			title: "Verification email resent",
			description: "Please check your inbox for the verification link."
		});
	};

	return (
		<>
			<div className="w-full flex items-center justify-center bg-gray-50">
				<Card className="w-full max-w-md">
					<CardHeader>
						<CardTitle className="text-2xl font-bold text-center">Check Your Email</CardTitle>
						<CardDescription className="text-center">
							We&apos;ve sent a verification link to your email address.
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="flex justify-center">
							<Mail className="h-16 w-16 text-blue-500" />
						</div>
						<p className="text-center text-sm text-gray-600">
							Please click the link in the email to verify your account. If you don&apos;t see the email, check your
							spam folder.
						</p>
					</CardContent>
					<CardFooter className="flex flex-col space-y-4">
						<Button onClick={handleResendEmail} disabled={isResending} className="w-full">
							{isResending ? "Resending..." : "Resend Verification Email"}
						</Button>
						<p className="text-center text-sm text-gray-600">
							Wrong email?{" "}
							<a href="/signup" className="text-blue-500 hover:underline">
								Go back to sign up
							</a>
						</p>
					</CardFooter>
				</Card>
			</div>
		</>
	);
};
