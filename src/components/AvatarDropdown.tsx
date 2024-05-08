import HeaderDropdown from './HeaderDropdown';
import React from 'react';
import { LogoutOutlined } from '@ant-design/icons';

export type GlobalHeaderRightProps = {
    menu?: boolean;
    children?: React.ReactNode;
};

export const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({
    children
}) => {
    const menuItems = [
        {
            key: 'logout',
            icon: <LogoutOutlined />,
            label: 'Đăng xuất'
        }
    ];

    return (
        <HeaderDropdown
            menu={{
                selectedKeys: [],
                onClick: () => {},
                items: menuItems
            }}
        >
            {children}
        </HeaderDropdown>
    );
};
