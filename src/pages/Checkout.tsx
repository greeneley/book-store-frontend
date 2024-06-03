import { convertToCurrency } from '@utils/helpers/convertToCurrency';
import {
    Button,
    Col,
    Form,
    Image,
    Radio,
    RadioChangeEvent,
    Row,
    Select,
    Space,
    Table,
    TableColumnsType
} from 'antd';
import Input from 'antd/es/input/Input';
import Title from 'antd/es/typography/Title';
import React, { useMemo, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { CartInfo } from '../model/internal/cart-info';
import { CartItem } from '../model/internal/cart-item';

interface DataType {
    key: React.Key;
    imageUrl: string;
    book_id: number;
    name: string;
    quantity: number;
    total: number;
}

export const Checkout: React.FC = (props) => {
    const [paymentMethod, setPaymentMethod] = useState(1);

    const cartInfo = useLoaderData() as CartInfo;

    const dataSource = useMemo(() => {
        return cartInfo.cart_items.map((cartItem: CartItem) => {
            return {
                key: cartItem.cart_item_id,
                imageUrl: cartItem.book.imageUrl,
                book_id: cartItem.book.book_id,
                name: cartItem.book.name,
                quantity: cartItem.quantity,
                total: cartItem.subTotal
            };
        });
    }, [cartInfo.cart_items]);

    const columns: TableColumnsType<DataType> = [
        {
            title: '',
            dataIndex: 'imageUrl',
            key: 'imageUrl',
            width: 150,
            render: (url: string) => {
                return <Image src={url} width={100} />;
            }
        },
        {
            title: 'Tên Sản phẩm',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity'
        },
        {
            title: 'Thành tiền',
            dataIndex: 'total',
            key: 'total',
            render: (price: number) => {
                return convertToCurrency(price);
            }
        }
    ];

    const onChangePaymentMethod = (e: RadioChangeEvent) => {
        setPaymentMethod(e.target.value);
    };

    // useEffect(() => {
    //     axios.get('https://esgoo.net/api-tinhthanh/1/0.htm').then((res) => {
    //         console.log(res.data);
    //     });
    // }, []);
    return (
        <>
            <div className="my-10 p-8">
                <Title level={3} className="font-light">
                    Thông tin giao hàng
                </Title>
                <br />

                <Row gutter={15}>
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
                        <Title level={5} className="font-light">
                            Tổng cộng: {convertToCurrency(cartInfo.total)}
                        </Title>
                        <div className="w-full">
                            <Table
                                dataSource={dataSource}
                                columns={columns}
                                pagination={{ defaultPageSize: 5 }}
                            />
                            ;
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    );
};
