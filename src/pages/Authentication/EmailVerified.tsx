import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AuthService } from "@/services/AuthService";
import { AlertTriangle, CheckCircle, Loader2, XCircle } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { NavigateFunction, useNavigate, useSearchParams } from "react-router-dom";
import { AuthLayout } from "./AuthLayout";

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
						setCountdown((prev) => {
							if (prev <= 1) {
								clearInterval(timer);
								navigate("/login");
							}
							return prev - 1;
						});
					}, 1000);
				} else if (response.data === "verified") {
					setVerificationState("verified");
				} else {
					throw new Error("Verification failed");
				}
			} catch {
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

	const iconMap = {
		loading: <Loader2 className="w-7 h-7 text-gray-500 animate-spin" />,
		success: <CheckCircle className="w-7 h-7 text-green-600" />,
		error: <XCircle className="w-7 h-7 text-red-500" />,
		verified: <CheckCircle className="w-7 h-7 text-green-600" />
	};

	const titleMap = {
		loading: "Đang xác minh email…",
		success: "Xác minh thành công",
		error: "Xác minh thất bại",
		verified: "Đã xác minh trước đó"
	};

	const descMap = {
		loading: "Vui lòng chờ trong khi chúng tôi xác minh địa chỉ email của bạn.",
		success: "Tài khoản của bạn đã được kích hoạt.",
		error: "Chúng tôi không thể xác minh email của bạn. Vui lòng thử lại hoặc liên hệ hỗ trợ.",
		verified: "Email của bạn đã được xác minh trước đó. Bạn có thể đăng nhập."
	};

	return (
		<AuthLayout>
			<div className="space-y-8 text-center">
				<div className="flex flex-col items-center space-y-4">
					<div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
						{iconMap[verificationState]}
					</div>
					<div className="space-y-1">
						<h1 className="text-2xl font-semibold tracking-tight text-gray-900">{titleMap[verificationState]}</h1>
						<p className="text-sm text-gray-500">{descMap[verificationState]}</p>
					</div>
				</div>

				{verificationState === "success" && (
					<p className="text-sm text-gray-500">
						Chuyển hướng đến trang đăng nhập sau <span className="font-semibold text-gray-900">{countdown}</span> giây…
					</p>
				)}

				{verificationState === "verified" && (
					<Alert className="text-left border-amber-200 bg-amber-50">
						<AlertTriangle className="h-4 w-4 text-amber-600" />
						<AlertTitle className="text-amber-800">Đã xác minh rồi</AlertTitle>
						<AlertDescription className="text-amber-700">
							Link này đã được sử dụng. Vui lòng tiến hành đăng nhập.
						</AlertDescription>
					</Alert>
				)}

				<div>
					{(verificationState === "success" || verificationState === "verified") && (
						<Button
							onClick={handleContinue}
							className="w-full h-11 bg-gray-900 hover:bg-gray-700 text-white font-medium transition-colors">
							Đến trang đăng nhập
						</Button>
					)}
					{verificationState === "error" && (
						<Button
							onClick={handleTryAgain}
							className="w-full h-11 bg-gray-900 hover:bg-gray-700 text-white font-medium transition-colors">
							Thử lại
						</Button>
					)}
				</div>
			</div>
		</AuthLayout>
	);
};
