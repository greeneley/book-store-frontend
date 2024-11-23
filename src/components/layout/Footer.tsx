import React from "react";

export const Footer: React.FC = () => {
	return (
		<footer className="bg-gray-800 text-white py-4">
			<div className="container mx-auto px-4">
				<div className="text-center text-sm">© {new Date().getFullYear()} BookStore. All rights reserved.</div>
			</div>
		</footer>
	);
};
