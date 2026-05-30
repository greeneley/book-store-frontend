import { BookOpen } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

interface AuthLayoutProps {
	children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
	return (
		<div className="min-h-screen bg-white flex flex-col">
			{/* Top bar */}
			<header className="px-6 py-4 border-b border-gray-100">
				<Link to="/" className="inline-flex items-center gap-2 text-gray-900 hover:text-gray-600 transition-colors">
					<BookOpen className="w-5 h-5" />
					<span className="text-sm font-semibold tracking-tight">BookStore</span>
				</Link>
			</header>

			{/* Content */}
			<main className="flex-1 flex items-center justify-center px-4 py-12">
				<div className="w-full max-w-[420px]">{children}</div>
			</main>

			{/* Footer */}
			<footer className="px-6 py-4 border-t border-gray-100 text-center">
				<p className="text-xs text-gray-400">© {new Date().getFullYear()} BookStore. All rights reserved.</p>
			</footer>
		</div>
	);
};
