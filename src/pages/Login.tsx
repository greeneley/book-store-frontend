import { Button, Form, FormProps, Input, theme, Typography } from 'antd';
import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContextProvider';
import { User } from '../model/internal/user';

const { Title } = Typography;

type FieldType = {
    email?: string;
    password?: string;
    remember?: string;
};
export const Login: React.FC = () => {
    const navigate = useNavigate();
    const { setToken, setUser } = useAuth();

    const {
        token: { colorBgContainer, borderRadiusLG }
    } = theme.useToken();

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        const response = await axios.post(
            'http://localhost:8081/api/v1/auth/login',
            {
                email: values.email,
                password: values.password
            }
        );

        if (response) {
            setToken(response.data.accessToken);
            const userInfo = await axios.post(
                'http://localhost:8081/api/v1/user',
                {
                    id: response.data.user_id
                },
                {
                    headers: {
                        Authorization: 'Bearer ' + response.data.accessToken
                    }
                }
            );

            setUser(userInfo.data as User);
            navigate('/home');
        }
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (
        errorInfo
    ) => {
        console.log('Failed:', errorInfo);
    };

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
                justifyContent: 'center',
                flexDirection: 'column'
            }}
        >
            <Title>Đăng nhập</Title>
            <Form
                name="basic"
                layout="vertical"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 50 }}
                style={{ width: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                size="middle"
            >
                <Form.Item<FieldType>
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập email!'
                        }
                    ]}
                >
                    <Input size={'large'} />
                </Form.Item>
                <Form.Item<FieldType>
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập mật khẩu!'
                        }
                    ]}
                >
                    <Input.Password size={'large'} />
                </Form.Item>

                <Form.Item<FieldType>
                    name="remember"
                    wrapperCol={{ span: 16 }}
                    className="mb-2"
                >
                    <a href="#" className="forgot-pass">
                        Quên mật khẩu
                    </a>
                </Form.Item>

                <Button htmlType="submit" block>
                    Đăng nhập
                </Button>
            </Form>
        </div>
    );
};
