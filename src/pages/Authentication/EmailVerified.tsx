import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AuthService } from "@/services/AuthService";
import { CheckCircle, LoaderCircle, XCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export const EmailVerified: React.FC = () => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const [verificationState, setVerificationState] = useState<"loading" | "success" | "error">("loading");
	// Your email has been confirmed and your registration is now complete.

	useEffect(() => {
		const verifyCode = async () => {
			const verificationCode = searchParams.get("code");
			try {
				const response = await AuthService.verify(verificationCode);
				if (response.data === "success") {
					setVerificationState("success");
				} else if (response.data === "verified") {
					navigate("/");
				} else {
					throw new Error("Verification failed");
				}
			} catch (error) {
				console.error("Verification error:", error);
				setVerificationState("error");
			}
		};
		verifyCode();
	}, [navigate, searchParams]);

	const handleContinue = () => {
		// Redirect to the main app or dashboard
		navigate("/");
	};
	const handleTryAgain = () => {
		setVerificationState("loading");
		navigate(0); // This will re-run the useEffect hook
	};
	return (
		<div className="w-full flex items-center justify-center bg-gray-50">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle className="text-2xl font-bold text-center">Email Verified</CardTitle>
					<CardDescription className="text-center">
						{verificationState === "loading" && "We're verifying your email..."}
						{verificationState === "success" && "Your email has been successfully verified."}
						{verificationState === "error" && "There was an error verifying your email."}
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex justify-center">
						{verificationState === "loading" && <LoaderCircle className="h-16 w-16 text-blue-500 animate-spin" />}
						{verificationState === "success" && <CheckCircle className="h-16 w-16 text-green-500" />}
						{verificationState === "error" && <XCircle className="h-16 w-16 text-red-500" />}
					</div>
					<p className="text-center text-sm text-gray-600">
						{verificationState === "loading" && "Please wait while we verify your email address."}
						{verificationState === "success" &&
							"Thank you for verifying your email address. Your account is now active."}
						{verificationState === "error" &&
							"We couldn't verify your email address. Please try again or contact support if the problem persists."}
					</p>
				</CardContent>
				<CardFooter>
					{verificationState === "success" && (
						<Button onClick={handleContinue} className="w-full">
							Continue to Your Account
						</Button>
					)}
					{verificationState === "error" && (
						<Button onClick={handleTryAgain} className="w-full">
							Try Again
						</Button>
					)}
				</CardFooter>
			</Card>
		</div>
	);
};
