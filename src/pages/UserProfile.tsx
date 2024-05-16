import { useUserInfo } from '@hooks/internal/useUserInfo';
import { Avatar, Button, Col, Form, Input, Row, theme } from 'antd';
import Title from 'antd/es/typography/Title';
import React, { useEffect } from 'react';

export const UserProfile: React.FC = () => {
    const user = useUserInfo();

    const [form] = Form.useForm();

    const {
        token: { colorBgContainer, borderRadiusLG }
    } = theme.useToken();

    useEffect(() => {
        if (user) {
            form.setFieldsValue({
                username: user.username,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email
            });
        }
    }, [form, user]);

    return (
        <div
            style={{
                margin: '32px 0',
                background: colorBgContainer,
                minHeight: 750,
                padding: 52,
                borderRadius: borderRadiusLG,
                marginLeft: 'auto',
                marginRight: 'auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                flexDirection: 'column'
            }}
        >
            <Title>Thông tin tài khoản</Title>
            <Row gutter={100}>
                <Col span={14}>
                    <Form form={form}>
                        <Form.Item
                            name="username"
                            label="Tên đăng nhập"
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item name="firstname" label="Họ">
                            <Input />
                        </Form.Item>
                        <Form.Item name="lastname" label="Tên">
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[{ type: 'email' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item>
                            <Button style={{ minWidth: '150px' }}>
                                Cập nhật thông tin
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
                <Col span={10}>
                    <Avatar size={100} src={user?.avatar} />
                </Col>
            </Row>
        </div>
    );
};
