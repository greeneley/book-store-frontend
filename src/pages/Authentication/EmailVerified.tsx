import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AuthService } from "@/services/AuthService";
import { AlertTriangle, CheckCircle, LoaderCircle, XCircle } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { NavigateFunction, useNavigate, useSearchParams } from "react-router-dom";

type VerificationState = "loading" | "success" | "error" | "verified";
const useVerification = (navigate: NavigateFunction, searchParams: URLSearchParams) => {
	const [verificationState, setVerificationState] = useState<VerificationState>("loading");
	const [countdown, setCountdown] = useState(5);
	const hasVerified = useRef(false);

	useEffect(() => {
		if (hasVerified.current) return;
		hasVerified.current = true;

		const verifyCode = async () => {
			const verificationCode = searchParams.get("code");
			try {
				const response = await AuthService.verify(verificationCode);
				if (response.data === "success") {
					setVerificationState("success");
					const timer = setInterval(() => {
						setCountdown((preCount) => {
							if (preCount <= 1) {
								clearInterval(timer);
								navigate("/login");
							}
							return preCount - 1;
						});
					}, 1000);
				} else if (response.data === "verified") {
					setVerificationState("verified");
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

	return { verificationState, countdown, setVerificationState };
};

export const EmailVerified: React.FC = () => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const { verificationState, countdown, setVerificationState } = useVerification(navigate, searchParams);

	const handleContinue = useCallback(() => navigate("/login"), [navigate]);
	const handleTryAgain = useCallback(() => {
		setVerificationState("loading");
		navigate(0);
	}, [navigate, setVerificationState]);

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
				<CardContent className="space-y-2">
					<div className="flex justify-center">
						{verificationState === "loading" && <LoaderCircle className="h-16 w-16 text-blue-500 animate-spin" />}
						{verificationState === "success" && <CheckCircle className="h-16 w-16 text-green-500" />}
						{verificationState === "error" && <XCircle className="h-16 w-16 text-red-500" />}
					</div>
					<p className="text-center text-sm text-gray-600">
						{verificationState === "loading" && "Please wait while we verify your email address."}
						{(verificationState === "success" || verificationState === "verified") && "Your account is now active."}
						{verificationState === "error" &&
							"We couldn't verify your email address. Please try again or contact support if the problem persists."}
					</p>
					{verificationState === "success" && (
						<>
							<p className="text-center text-sm text-gray-600">Please log in again to access your account.</p>
							<p className="text-center text-sm font-semibold">
								Redirecting to login page in <span className="text-red-600">{countdown}</span> seconds...
							</p>
						</>
					)}
					{verificationState === "verified" && (
						<>
							<Alert>
								<AlertTriangle className="h-4 w-4" />
								<AlertTitle>Already Verified</AlertTitle>
								<AlertDescription>This email has already been verified. You can proceed to login.</AlertDescription>
							</Alert>
						</>
					)}
				</CardContent>
				<CardFooter>
					{(verificationState === "success" || verificationState === "verified") && (
						<Button onClick={handleContinue} className="w-full">
							Click here to log in now
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
