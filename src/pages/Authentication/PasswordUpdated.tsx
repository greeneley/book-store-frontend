import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { AuthLayout } from "./AuthLayout";

export const PasswordUpdated: React.FC = () => {
	return (
		<AuthLayout>
			<div className="space-y-8 text-center">
				<div className="flex flex-col items-center space-y-4">
					<div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center">
						<CheckCircle className="w-7 h-7 text-green-600" />
					</div>
					<div className="space-y-1">
						<h1 className="text-2xl font-semibold tracking-tight text-gray-900">Mật khẩu đã được cập nhật</h1>
						<p className="text-sm text-gray-500">Mật khẩu của bạn đã được thay đổi thành công.</p>
					</div>
				</div>

				<p className="text-sm text-gray-500 leading-relaxed">
					Tài khoản của bạn hiện đã được bảo mật với mật khẩu mới. Bạn có thể dùng nó để đăng nhập.
				</p>

				<div className="space-y-3">
					<Button
						asChild
						className="w-full h-11 bg-gray-900 hover:bg-gray-700 text-white font-medium transition-colors">
						<Link to="/login">Đến trang đăng nhập</Link>
					</Button>
					<Button
						asChild
						variant="outline"
						className="w-full h-11 border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors">
						<Link to="/">Về trang chủ</Link>
					</Button>
				</div>
			</div>
		</AuthLayout>
	);
};
