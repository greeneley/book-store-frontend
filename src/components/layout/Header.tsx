import { BookOpen } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

interface HeaderProps {
	name?: string;
	avatar?: string;
	userid?: string;
	email?: string;
}

export const Header: React.FC<HeaderProps> = (props) => {
	return (
		<header className="border-b">
			<div className="container mx-auto px-4 py-4 flex items-center justify-between">
				<Link to="/" className="flex items-center space-x-2">
					<BookOpen className="h-6 w-6" />
					<span className="text-xl font-bold">BookStore</span>
				</Link>
				<nav className="hidden md:flex space-x-4">
					<Link to="/" className="text-sm font-medium hover:underline">
						Home
					</Link>
					<Link to="/categories" className="text-sm font-medium hover:underline">
						Categories
					</Link>
					<Link to="/about" className="text-sm font-medium hover:underline">
						About
					</Link>
					<Link to="/contact" className="text-sm font-medium hover:underline">
						Contact
					</Link>
				</nav>
			</div>
		</header>
	);
};
