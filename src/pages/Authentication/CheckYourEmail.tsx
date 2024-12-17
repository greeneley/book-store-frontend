import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AuthService } from "@/services/AuthService";
import { Mail } from "lucide-react";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";

export const CheckYourEmail: React.FC = () => {
	const { state } = useLocation();

	const [isResending, setIsResending] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [resendEmail, setResendEmail] = useState(false);
	const handleResendEmail = async () => {
		setIsResending(true);
		setError(null);

		try {
			await AuthService.resend(state.email);
			setResendEmail(true);
		} catch (error) {
			setError(error.response.data.message);
		} finally {
			setIsResending(false);
		}
	};

	return (
		<>
			<div className="w-full flex items-center justify-center bg-gray-50 py-5">
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
						{resendEmail && <p className="text-sm p-3 bg-green-200 text-center w-full">We have re-sent email!</p>}
						{error && <p className="text-sm text-red-500">{error}</p>}
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
