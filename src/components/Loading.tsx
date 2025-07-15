import { useCartStore } from "@/store/useCartStore";
import React from "react";

export const Loading: React.FC<{ message?: string }> = ({ message = "Đang tải..." }) => {
	const { isLoading } = useCartStore();

	return (
		isLoading && (
			<div className="fixed inset-0 bg-gray-200 bg-opacity-75 flex items-center justify-center z-50">
				<div className="text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mx-auto mb-4"></div>
					<p className="text-gray-800 text-lg font-medium">{message}</p>
				</div>
			</div>
		)
	);
};
