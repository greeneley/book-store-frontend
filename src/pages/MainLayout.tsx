import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Toaster } from "@/components/ui/toaster";
import { Layout } from "antd";
import "rc-footer/assets/index.css";
import React from "react";
import { Outlet } from "react-router-dom";

const { Content } = Layout;

export interface MainLayoutProps {
	children?: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = () => {
	return (
		<>
			<Layout className="flex flex-col min-h-screen">
				<Header />
				<main className="flex-grow flex justify-center">
					<Outlet />
				</main>
				<Toaster />
				<Footer />
			</Layout>
		</>
	);
};
