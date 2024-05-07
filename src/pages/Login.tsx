import { Button, ConfigProvider, Form, FormProps, Input } from 'antd';
import React from 'react';

type FieldType = {
    email?: string;
    password?: string;
    remember?: string;
};
export const Login: React.FC = () => {
    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (
        errorInfo
    ) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="half">
            <div className="contents">
                <div className="container">
                    <div className="row align-items-center justify-content-center">
                        <div className="col-md-12">
                            <div className="form-block mx-auto">
                                <div className="text-center mb-5">
                                    <h3>Đăng nhập</h3>
                                </div>
                                <form
                                    method="post"
                                    onSubmit={(e) => {
                                        console.log(e);
                                    }}
                                >
                                    <input
                                        type="submit"
                                        value="Log In"
                                        className="btn btn-block btn-primary w-100"
                                    />
                                </form>

                                <div className="text-sm text-center mt-[1.6rem]">
                                    Chưa có tài khoản?{' '}
                                    <a
                                        className="text-sm text-[#7747ff]"
                                        href="#"
                                    >
                                        Đăng ký miễn phí!
                                    </a>
                                </div>
                                <Form
                                    name="basic"
                                    layout="vertical"
                                    labelCol={{ span: 4 }}
                                    wrapperCol={{ span: 50 }}
                                    style={{ maxWidth: 600 }}
                                    initialValues={{ remember: true }}
                                    onFinish={onFinish}
                                    onFinishFailed={onFinishFailed}
                                    autoComplete="off"
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
                                                message:
                                                    'Please input your password!'
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

                                    <ConfigProvider
                                        theme={{
                                            components: {
                                                Button: {
                                                    colorPrimary: '#FFCE1A'
                                                }
                                            }
                                        }}
                                    >
                                        <Form.Item>
                                            <Button
                                                type="primary"
                                                htmlType="submit"
                                                block
                                            >
                                                Đăng nhập
                                            </Button>
                                        </Form.Item>
                                    </ConfigProvider>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
