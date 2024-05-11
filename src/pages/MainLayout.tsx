import { Header } from '@components/Header/HeaderComponent';
import { Layout } from 'antd';
import Footer from 'rc-footer';
import 'rc-footer/assets/index.css';
import React from 'react';
import { Routes } from '../routes';

const { Content } = Layout;

export interface MainLayoutProps {
    children?: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <>
            <Layout>
                <Header />
                <Content style={{ padding: '0 48px' }}>
                    <Routes />
                </Content>
                <Footer bottom="2024 Made with ❤️ by Dinh Thanh Hai" />
            </Layout>
        </>
    );
};
