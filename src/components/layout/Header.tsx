import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContextProvider";
import { AuthService } from "@/services/AuthService";
import { BookOpen, LogOut, Menu, Search, ShoppingCart, User } from "lucide-react";
import React, { useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";

interface HeaderProps {
	name?: string;
	avatar?: string;
	userid?: string;
	email?: string;
}

export const Header: React.FC<HeaderProps> = (props) => {
	const { user, setUser } = useAuth();
	const navigate = useNavigate();

	const onLogout = useCallback(async () => {
		try {
			await AuthService.logout(user._id);
			setUser(null);
			navigate("/login");
		} catch (error) {
			console.error("Logout error:", error);
		}
	}, [navigate, setUser, user]);

	return (
		<header className="border-b">
			<div className="container mx-auto px-4 py-4 flex items-center justify-between">
				<Link to="/" className="flex items-center space-x-2">
					<BookOpen className="h-6 w-6" />
					<span className="text-xl font-bold">BookStore</span>
				</Link>
				<nav className="hidden md:flex space-x-4">
					<Link to="/" className="text-sm font-medium hover:underline">
						Trang chủ
					</Link>
					<Link to="/categories" className="text-sm font-medium hover:underline">
						Tất cả sách
					</Link>
					<Link to="/contact" className="text-sm font-medium hover:underline">
						Liên hệ
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
					{user ? (
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="ghost" size="sm">
									<User className="h-4 w-4 mr-2" />
									{user.firstName}
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuItem
									onSelect={() => {
										navigate("/profile");
									}}>
									My Account
								</DropdownMenuItem>
								<DropdownMenuItem onSelect={() => {}}>My Orders</DropdownMenuItem>
								<DropdownMenuItem onSelect={onLogout}>
									<LogOut className="h-4 w-4 mr-2" />
									Logout
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					) : (
						<Button variant="ghost" size="sm">
							<Link to="/login">Login</Link>
						</Button>
					)}

					<Button variant="ghost" size="icon" className="md:hidden">
						<Menu className="h-6 w-6" />
						<span className="sr-only">Menu</span>
					</Button>
				</div>
			</div>
		</header>
	);
};
