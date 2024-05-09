import { Header } from '@components/Header/HeaderComponent';
import { Layout, theme } from 'antd';
import Footer from 'rc-footer';
import 'rc-footer/assets/index.css';
import React from 'react';
import { Routes } from '../routes';

const { Content } = Layout;

export interface MainLayoutProps {
    children?: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    const {
        token: { colorBgContainer, borderRadiusLG }
    } = theme.useToken();

    return (
        <>
            <Layout>
                <Header />
                <Content style={{ padding: '0 48px' }}>
                    <Routes />
                    {/*<div*/}
                    {/*    style={{*/}
                    {/*        margin: '32px 0',*/}
                    {/*        background: colorBgContainer,*/}
                    {/*        minHeight: 750,*/}
                    {/*        padding: 24,*/}
                    {/*        borderRadius: borderRadiusLG*/}
                    {/*    }}*/}
                    {/*></div>*/}
                </Content>
                <Footer bottom="2024 Made with ❤️ by Dinh Thanh Hai" />
            </Layout>
        </>
    );
};
