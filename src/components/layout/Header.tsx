import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/contexts/AuthContextProvider";
import { AuthService } from "@/services/AuthService";
import { useCartStore } from "@/store/useCartStore";
import { useCategoryStore } from "@/store/useCategoryStore";
import { BookOpen, ChevronDown, Heart, LogOut, Menu, Search, ShoppingCart, User } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const navigation = [
	{ name: "Trang chủ", href: "/home" },
	{ name: "Cửa hàng", href: "/home" },
	{ name: "Sách mới", href: "/home" },
	{ name: "Khuyến mãi", href: "/home" }
];

export const Header: React.FC = () => {
	const { user, setUser } = useAuth();
	const navigate = useNavigate();
	const { cart } = useCartStore();
	const { category } = useCategoryStore();
	const [isScrolled, setIsScrolled] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [mobileOpen, setMobileOpen] = useState(false);

	useEffect(() => {
		const handleScroll = () => setIsScrolled(window.scrollY > 10);
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const onLogout = useCallback(async () => {
		if (!user) return;
		try {
			await AuthService.logout(user._id);
			setUser(null);
			navigate("/login");
		} catch (error) {
			console.error("Logout error:", error);
		}
	}, [navigate, setUser, user]);

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		if (searchQuery.trim()) navigate(`/home?search=${encodeURIComponent(searchQuery.trim())}`);
	};

	return (
		<header
			className={`sticky top-0 z-50 w-full transition-all duration-300 ${
				isScrolled ? "bg-background/90 backdrop-blur-lg shadow-sm border-b border-border" : "bg-background"
			}`}>
			{/* Top bar */}
			<div className="hidden lg:flex items-center justify-between px-8 py-2 text-xs text-muted-foreground border-b border-border">
				<p>Miễn phí vận chuyển cho đơn hàng trên 299.000₫ &nbsp;•&nbsp; Đổi trả trong 30 ngày</p>
				<div className="flex items-center gap-4">
					<Link to="/home" className="hover:text-foreground transition-colors">
						Trợ giúp
					</Link>
					<Link to="/home" className="hover:text-foreground transition-colors">
						Theo dõi đơn hàng
					</Link>
				</div>
			</div>

			<div className="container mx-auto px-4 flex items-center justify-between h-16 lg:h-18 gap-4">
				{/* Mobile menu */}
				<Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
					<SheetTrigger asChild>
						<Button variant="ghost" size="icon" className="lg:hidden">
							<Menu className="h-5 w-5" />
						</Button>
					</SheetTrigger>
					<SheetContent side="left" className="w-72 p-0">
						<SheetTitle className="sr-only">Menu điều hướng</SheetTitle>
						<div className="flex flex-col h-full">
							<div className="p-4 border-b border-border">
								<Link to="/home" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
									<BookOpen className="h-6 w-6 text-primary" />
									<span className="font-serif text-xl font-semibold">Nhà Sách Văn Lang</span>
								</Link>
							</div>
							<nav className="flex-1 p-4 space-y-1 overflow-y-auto">
								{navigation.map((item) => (
									<Link
										key={item.name}
										to={item.href}
										className="flex items-center px-3 py-2.5 rounded-lg text-foreground hover:bg-secondary transition-colors"
										onClick={() => setMobileOpen(false)}>
										{item.name}
									</Link>
								))}
								{category.length > 0 && (
									<div className="pt-4 border-t border-border mt-4">
										<p className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
											Danh mục
										</p>
										{category.map((cat: any) => (
											<Link
												key={cat.cat_id}
												to="/home"
												className="flex items-center px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
												onClick={() => setMobileOpen(false)}>
												{cat.name}
											</Link>
										))}
									</div>
								)}
							</nav>
						</div>
					</SheetContent>
				</Sheet>

				{/* Logo */}
				<Link to="/home" className="flex items-center gap-2 shrink-0">
					<BookOpen className="h-7 w-7 text-primary" />
					<span className="font-serif text-lg lg:text-xl font-semibold tracking-tight hidden sm:block">
						Nhà Sách Văn Lang
					</span>
				</Link>

				{/* Desktop nav */}
				<nav className="hidden lg:flex items-center gap-1">
					{navigation.map((item) => (
						<Link
							key={item.name}
							to={item.href}
							className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
							{item.name}
						</Link>
					))}
					{category.length > 0 && (
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="ghost"
									className="text-sm font-medium text-muted-foreground hover:text-foreground gap-1">
									Danh mục <ChevronDown className="h-3.5 w-3.5" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="start" className="w-52">
								{category.map((cat: any) => (
									<DropdownMenuItem key={cat.cat_id} asChild>
										<Link to="/home">{cat.name}</Link>
									</DropdownMenuItem>
								))}
							</DropdownMenuContent>
						</DropdownMenu>
					)}
				</nav>

				{/* Search */}
				<form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-sm mx-2">
					<div className="relative w-full">
						<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
						<Input
							type="search"
							placeholder="Tìm kiếm sách, tác giả..."
							className="pl-10 bg-secondary/60 border-0 focus-visible:ring-1 focus-visible:ring-ring"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
					</div>
				</form>

				{/* Right icons */}
				<div className="flex items-center gap-1">
					<Button variant="ghost" size="icon" className="md:hidden">
						<Search className="h-5 w-5" />
					</Button>
					<Button variant="ghost" size="icon" className="hidden sm:flex">
						<Heart className="h-5 w-5" />
					</Button>
					<Button variant="ghost" size="icon" className="relative" onClick={() => navigate("/cart")}>
						<ShoppingCart className="h-5 w-5" />
						{cart.length > 0 && (
							<Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-[10px] bg-primary text-primary-foreground rounded-full">
								{cart.length}
							</Badge>
						)}
					</Button>

					{user ? (
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="ghost" size="sm" className="hidden sm:flex gap-2">
									<User className="h-4 w-4" />
									<span className="max-w-[80px] truncate">{user.firstName}</span>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end" className="w-48">
								<DropdownMenuItem onSelect={() => navigate("/profile")}>
									<User className="h-4 w-4 mr-2" /> Tài khoản
								</DropdownMenuItem>
								<DropdownMenuItem onSelect={() => navigate("/cart")}>
									<ShoppingCart className="h-4 w-4 mr-2" /> Giỏ hàng
								</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem onSelect={onLogout} className="text-destructive">
									<LogOut className="h-4 w-4 mr-2" /> Đăng xuất
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					) : (
						<Button variant="ghost" size="sm" asChild>
							<Link to="/login">Đăng nhập</Link>
						</Button>
					)}
				</div>
			</div>
		</header>
	);
};
