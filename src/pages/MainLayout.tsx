import React from 'react';
import { Layout, theme } from 'antd';

const { Header, Content, Footer } = Layout;

const items = new Array(15).fill(null).map((_, index) => ({
    key: index + 1,
    label: `nav ${index + 1}`
}));

export const MainLayout: React.FC = () => {
    const {
        token: { colorBgContainer, borderRadiusLG }
    } = theme.useToken();

    console.log(colorBgContainer);
    return (
        <>
            <Layout>
                <Header
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        background: '#fff'
                    }}
                >
                    <div className="demo-logo" />
                </Header>
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
