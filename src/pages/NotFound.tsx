import React from "react";
import { Link } from "react-router-dom";

export const NotFound = () => {
	return (
		<main className="mx-auto mt-24 flex max-w-xl flex-1 flex-col items-center gap-4 px-2 text-xl">
			<h1 className="text-2xl font-bold">Không tìm thấy trang</h1>
			<p>Trang bạn đang tìm không tồn tại</p>
			<Link to="/" className="mx-auto mt-4 w-fit hover:underline">
				Quay lại trang chủ
			</Link>
		</main>
	);
};
