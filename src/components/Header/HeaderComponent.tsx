import React from 'react';

import { Dropdown, Input, Layout } from 'antd';
import {
    LogoutOutlined,
    SearchOutlined,
    UserOutlined
} from '@ant-design/icons';

export const Header = () => {
    return (
        <Layout.Header
            style={{
                display: 'flex',
                alignItems: 'center',
                background: '#fff',
                gap: '10px'
            }}
        >
            <div>
                <img
                    src="/public/asset/logo.svg"
                    width="30"
                    height="30"
                    alt="TH Book Store logo"
                />
            </div>
            <Input
                placeholder="Bạn cần tìm gì..."
                prefix={<SearchOutlined />}
            />
            <Dropdown
                menu={{
                    items: [
                        {
                            key: '1',
                            icon: <UserOutlined />,
                            label: (
                                <span onClick={() => {}}>
                                    <p>Account</p>
                                </span>
                            )
                        },
                        {
                            key: '2',
                            icon: <LogoutOutlined />,
                            label: (
                                <span onClick={() => {}}>
                                    <p>Đăng xuất</p>
                                </span>
                            )
                        }
                    ]
                }}
            >
                <span className="user-action">
                    <img
                        src={
                            'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'
                        }
                        className="user-avator"
                        alt="avator"
                        width="30"
                        height="30"
                    />
                </span>
            </Dropdown>
        </Layout.Header>
    );
};
