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
				{/*<Content style={{ padding: '0 48px' }}>*/}
				{/*    <Outlet />*/}
				{/*</Content>*/}
			</Layout>
		</>
	);
};
