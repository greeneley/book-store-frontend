import { Breadcrumb } from "@/components/Breadcrumb";
import { useAuth } from "@/contexts/AuthContextProvider";
import { cn } from "@/lib/utils";
import { CreditCard, Heart, MapPin, Package, RefreshCcw, User, XCircle } from "lucide-react";
import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const sections = [
	{
		title: "Manage My Account",
		items: [
			{ title: "My Profile", href: "/account/profile", icon: <User className="w-4 h-4" /> },
			{ title: "Address Book", href: "/account/address", icon: <MapPin className="w-4 h-4" /> },
			{ title: "Payment Options", href: "/account/payment", icon: <CreditCard className="w-4 h-4" /> }
		]
	},
	{
		title: "My Orders",
		items: [
			{ title: "Order History", href: "/account/orders", icon: <Package className="w-4 h-4" /> },
			{ title: "My Returns", href: "/account/returns", icon: <RefreshCcw className="w-4 h-4" /> },
			{ title: "My Cancellations", href: "/account/cancellations", icon: <XCircle className="w-4 h-4" /> }
		]
	},
	{
		title: "My Lists",
		items: [{ title: "My Wishlist", href: "/account/wishlist", icon: <Heart className="w-4 h-4" /> }]
	}
];

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
	items: {
		href: string;
		title: string;
		icon: React.ReactNode;
	}[];
}
function SidebarNav({ className, items, ...props }: SidebarNavProps) {
	const { pathname } = useLocation();

	return (
		<nav className={cn("flex flex-col space-y-1", className)} {...props}>
			{items.map((item) => (
				<Link
					key={item.href}
					to={item.href}
					className={cn(
						"flex items-center rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
						pathname === item.href ? "bg-accent text-accent-foreground" : "transparent"
					)}>
					{item.icon}
					<span className="ml-3">{item.title}</span>
				</Link>
			))}
		</nav>
	);
}

interface UserProfileLayoutProps {}
export const UserProfileLayout: React.FC<UserProfileLayoutProps> = () => {
	const { user } = useAuth();

	// If no user, redirect or show error
	if (!user) {
		return <div>Please log in to access your profile.</div>;
	}

	return (
		<div className="container mx-auto py-10">
			<Breadcrumb />
			<div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
				<aside className="lg:w-1/5">
					<div className="space-y-6">
						{sections.map((section, i) => (
							<div key={i} className="space-y-2">
								<h3 className="text-lg font-semibold tracking-tight">{section.title}</h3>
								<SidebarNav items={section.items} />
							</div>
						))}
					</div>
				</aside>
				<div className="flex-1">
					<div className="flex items-center justify-between mb-4">
						<h2 className="text-3xl font-bold tracking-tight">My Account</h2>
						<p className="text-muted-foreground">
							Welcome! <span className="text-primary font-medium">{user.firstName}</span>
						</p>
					</div>
					<div className="space-y-6">
						<Outlet />
					</div>
				</div>
			</div>
		</div>
	);
};
