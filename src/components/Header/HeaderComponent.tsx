import React from 'react';

import {
    LogoutOutlined,
    SearchOutlined,
    ShoppingCartOutlined,
    UserOutlined
} from '@ant-design/icons';
import { useUserInfo } from '@hooks/internal/useUserInfo';
import { Avatar, Badge, Dropdown, Input, Layout } from 'antd';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
    name?: string;
    avatar?: string;
    userid?: string;
    email?: string;
}
export const Header: React.FC<HeaderProps> = (props) => {
    const { name } = props;
    const navigate = useNavigate();
    const user = useUserInfo();

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
                    onClick={() => navigate('/home')}
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
                                    <span onClick={() => navigate('/profile')}>
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
                        <Badge count={1}>
                            <Avatar
                                shape="circle"
                                icon={<ShoppingCartOutlined />}
                                onClick={() => navigate('/cart')}
                            />
                        </Badge>
                        <img
                            src={user?.avatar ?? ''}
                            className="user-avator w-8 h-8 ml-4"
                        />
                        <a>{user?.lastname ?? 'Đăng nhập'}</a>
                    </div>
                </Dropdown>
            </div>
        </Layout.Header>
    );
};
