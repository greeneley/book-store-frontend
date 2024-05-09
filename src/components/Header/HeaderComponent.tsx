import React from 'react';

import {
    LogoutOutlined,
    SearchOutlined,
    UserOutlined
} from '@ant-design/icons';
import { Dropdown, Input, Layout } from 'antd';

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
            <div className="w-1/2">
                <Input
                    placeholder="Bạn cần tìm gì..."
                    prefix={<SearchOutlined />}
                />
            </div>
            <div className="ml-auto">
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
                    <div className="user-action flex items-center gap-2">
                        <img
                            src={
                                'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'
                            }
                            className="user-avator w-8 h-8"
                        />
                        <a>Đăng nhập</a>
                    </div>
                </Dropdown>
            </div>
        </Layout.Header>
    );
};
