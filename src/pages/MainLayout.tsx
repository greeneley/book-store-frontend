import { Layout } from 'antd';
import 'rc-footer/assets/index.css';
import React from 'react';
import { Outlet } from 'react-router-dom';

const { Content } = Layout;

export interface MainLayoutProps {
    children?: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <>
            <Layout>
                <Content style={{ padding: '0 48px' }}>
                    <Outlet />
                </Content>
            </Layout>
        </>
    );
};
