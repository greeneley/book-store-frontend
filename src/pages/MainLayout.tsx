import React from 'react';
import { Layout, theme } from 'antd';
import { Header } from '@components/Header/HeaderComponent';

const { Content, Footer } = Layout;

export const MainLayout: React.FC = () => {
    const {
        token: { colorBgContainer, borderRadiusLG }
    } = theme.useToken();

    console.log(colorBgContainer);
    return (
        <>
            <Layout>
                <Header />
                <Content style={{ padding: '0 48px' }}>
                    <div
                        style={{
                            margin: '32px 0',
                            background: colorBgContainer,
                            minHeight: 280,
                            padding: 24,
                            borderRadius: borderRadiusLG
                        }}
                    >
                        Content
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Ant Design ©{new Date().getFullYear()} Created by Ant UED
                </Footer>
            </Layout>
        </>
    );
};
