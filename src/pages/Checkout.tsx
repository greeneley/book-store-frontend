import {
    Button,
    Col,
    Form,
    Radio,
    RadioChangeEvent,
    Row,
    Select,
    Space
} from 'antd';
import Input from 'antd/es/input/Input';
import Title from 'antd/es/typography/Title';
import React, { useState } from 'react';

export const Checkout: React.FC = (props) => {
    const [paymentMethod, setPaymentMethod] = useState(1);

    const onChangePaymentMethod = (e: RadioChangeEvent) => {
        setPaymentMethod(e.target.value);
    };

    return (
        <>
            <div className="my-10 p-8">
                <Title level={3} className="font-light">
                    Thông tin giao hàng
                </Title>
                <br />

                <Row>
                    <Col span={12}>
                        <div className="w-full">
                            <Title level={4} className="font-light">
                                Địa chỉ giao hàng
                            </Title>
                            <Form>
                                <Form.Item>
                                    <Input placeholder="Họ và tên" />
                                </Form.Item>
                                <Row gutter={15}>
                                    <Col span={16}>
                                        <Form.Item>
                                            <Input placeholder="Email" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item>
                                            <Input placeholder="Số điện thoại" />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Form.Item>
                                    <Input placeholder="Địa chỉ" />
                                </Form.Item>
                                <Row gutter={10}>
                                    <Col span={8}>
                                        <Form.Item>
                                            <Select placeholder="Tỉnh/thành">
                                                <Select.Option value="demo">
                                                    Demo
                                                </Select.Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item>
                                            <Select placeholder="Quận/huyện">
                                                <Select.Option value="demo">
                                                    Demo
                                                </Select.Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item>
                                            <Select placeholder="Phường/xã">
                                                <Select.Option value="demo">
                                                    Demo
                                                </Select.Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Form>
                            <Title level={4} className="font-light">
                                Phương thức thanh toán
                            </Title>
                            <Radio.Group
                                onChange={onChangePaymentMethod}
                                value={paymentMethod}
                            >
                                <Space direction="vertical">
                                    <Radio value={1}>
                                        Thanh toán khi giao hàng (COD)
                                    </Radio>
                                    <Radio value={2}>
                                        Chuyển khoản qua ngân hàng
                                    </Radio>
                                </Space>
                            </Radio.Group>
                            {paymentMethod === 2 && (
                                <div>
                                    <p>Dinh Thanh Hai</p>
                                    <p>Số tài khoản: 999999999999</p>
                                    <p>Ngân hàng: Vietcombank</p>
                                </div>
                            )}
                        </div>
                        <br />
                        <Button block>Hoàn tất đơn hàng</Button>
                    </Col>
                    <Col span={12}>
                        <Title level={4} className="font-light">
                            Danh sách sản phẩm
                        </Title>
                    </Col>
                </Row>
            </div>
        </>
    );
};
