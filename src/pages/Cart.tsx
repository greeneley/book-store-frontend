import { convertToCurrency } from '@utils/helpers/convertToCurrency';
import { Col, Image, Popconfirm, Row, Table } from 'antd';
import Title from 'antd/es/typography/Title';
import axios from 'axios';
import React, { useMemo } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContextProvider';
import { CartInfo } from '../model/internal/cart-info';
import { CartItem } from '../model/internal/cart-item';

export const Cart: React.FC = () => {
    const { token } = useAuth();
    const navigate = useNavigate();

    const cartInfo = useLoaderData() as CartInfo;

    const dataSource = useMemo(() => {
        return cartInfo.cart_items.map((cartItem: CartItem) => {
            return {
                key: cartItem.cart_item_id,
                imageUrl: cartItem.book.imageUrl,
                name: cartItem.book.name,
                price: cartItem.book.price,
                quantity: cartItem.quantity,
                total: cartItem.subTotal
            };
        });
    }, [cartInfo.cart_items]);

    const columns = [
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
            title: 'Đơn giá',
            dataIndex: 'price',
            key: 'price',
            render: (price: number) => {
                return convertToCurrency(price);
            }
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
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            render: (_: any, record: any) => {
                return dataSource.length >= 1 ? (
                    <Popconfirm
                        title="Sure to delete?"
                        onConfirm={async () => {
                            const response = await axios.get(
                                `http://localhost:8081/api/v1/cart-item/delete/${record.key}`,
                                {
                                    headers: {
                                        Authorization: 'Bearer ' + token
                                    }
                                }
                            );
                            navigate('.');
                        }}
                    >
                        <a>Xóa</a>
                    </Popconfirm>
                ) : null;
            }
        }
    ];

    return (
        <>
            <div className="my-10 p-8">
                <Title level={3} className="font-light">
                    Giỏ hàng
                </Title>
                <br />

                <Row>
                    <Col span={16}>
                        <div className="w-full">
                            <Table dataSource={dataSource} columns={columns} />;
                        </div>
                    </Col>
                    <Col span={8}>
                        <Title level={3}>
                            Tổng số sản phẩm: {cartInfo.cart_items.length}
                        </Title>
                        <Title level={4}>
                            Tổng giá trị đơn hàng:{' '}
                            {convertToCurrency(cartInfo.total)}
                        </Title>
                    </Col>
                </Row>
            </div>
        </>
    );
};
