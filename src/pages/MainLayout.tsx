import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Layout } from "antd";
import "rc-footer/assets/index.css";
import React from "react";

const { Content } = Layout;

export interface MainLayoutProps {
	children?: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
	return (
		<>
			<Layout className="flex flex-col min-h-screen">
				<Header />
				<main className="flex-grow">
					<p>DINH</p>
				</main>
				<Footer />
			</Layout>
		</>
	);
};
