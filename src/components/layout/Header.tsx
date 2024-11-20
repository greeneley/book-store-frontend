import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, Menu, Search, ShoppingCart } from "lucide-react";
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
				<div className="flex items-center space-x-2">
					<form className="hidden md:flex items-center">
						<Input type="search" placeholder="Search books..." className="w-64" />
						<Button type="submit" size="sm" className="ml-2">
							<Search className="h-4 w-4" />
							<span className="sr-only">Search</span>
						</Button>
					</form>
					<Button variant="outline" size="icon">
						<ShoppingCart className="h-4 w-4" />
						<span className="sr-only">Cart</span>
					</Button>
					<Button variant="ghost" size="sm">
						Login
					</Button>
					<Button variant="ghost" size="icon" className="md:hidden">
						<Menu className="h-6 w-6" />
						<span className="sr-only">Menu</span>
					</Button>
				</div>
			</div>
		</header>
	);
};
