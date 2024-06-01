import { MinusCircleOutlined, PlusCircleFilled } from '@ant-design/icons';
import { CartItemService } from '@services/CartItemService';
import { convertToCurrency } from '@utils/helpers/convertToCurrency';
import { Col, Image, Popconfirm, Row, Table } from 'antd';
import Title from 'antd/es/typography/Title';
import React, { useCallback, useContext, useEffect, useMemo } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { AppContext } from '../contexts/AppContextProvider';
import { CartInfo } from '../model/internal/cart-info';
import { CartItem } from '../model/internal/cart-item';

export const Cart: React.FC = () => {
    const navigate = useNavigate();

    const { setCountBadge } = useContext(AppContext);

    const cartInfo = useLoaderData() as CartInfo;

    useEffect(() => {
        setCountBadge(cartInfo.cart_items.length);
    }, [cartInfo.cart_items, cartInfo.cart_items.length, setCountBadge]);

    const dataSource = useMemo(() => {
        return cartInfo.cart_items.map((cartItem: CartItem) => {
            return {
                key: cartItem.cart_item_id,
                imageUrl: cartItem.book.imageUrl,
                book_id: cartItem.book.book_id,
                name: cartItem.book.name,
                price: cartItem.book.price,
                quantity: cartItem.quantity,
                total: cartItem.subTotal
            };
        });
    }, [cartInfo.cart_items]);

    const increaseItem = useCallback(
        (item: any) => {
            CartItemService.updateQuantityItem(
                item.quantity + 1,
                item.book_id
            ).then(() => navigate('.'));
        },
        [navigate]
    );

    const decreaseItem = useCallback(
        (item: any) => {
            if (item.quantity > 1) {
                CartItemService.updateQuantityItem(
                    item.quantity - 1,
                    item.book_id
                ).then(() => navigate('.'));
            }
        },
        [navigate]
    );

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
            key: 'quantity',
            render: (quantity: number, item: CartInfo) => {
                return (
                    <span>
                        <MinusCircleOutlined
                            className="mr-8"
                            onClick={() => decreaseItem(item)}
                        />
                        {quantity}
                        <PlusCircleFilled
                            className="ml-8"
                            onClick={() => increaseItem(item)}
                        />
                    </span>
                );
            }
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
                            CartItemService.removeCartItem(record.key).then(
                                () => navigate('.')
                            );
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
