import { Loading } from "@/components/Loading";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { useCart } from "@/hooks";
import { useCategory } from "@/hooks/useCategory";
import { Layout } from "antd";
import "rc-footer/assets/index.css";
import React from "react";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

export interface MainLayoutProps {
	children?: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = () => {
	useCart();
	useCategory();

	return (
		<>
			<Layout className="flex flex-col min-h-screen">
				<Header />
				<main className="flex-grow flex justify-center">
					<Outlet />
				</main>
				<Toaster position="top-right" reverseOrder={true} />
				<Loading />
				<Footer />
			</Layout>
		</>
	);
};
