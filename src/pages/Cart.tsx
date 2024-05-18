import { convertToCurrency } from '@utils/helpers/convertToCurrency';
import { Col, Image, Popconfirm, Row, Table, theme } from 'antd';
import Title from 'antd/es/typography/Title';
import React from 'react';

export const Cart: React.FC = () => {
    const {
        token: { colorBgContainer, borderRadiusLG }
    } = theme.useToken();

    const dataSource = [
        {
            key: '1',
            imageUrl:
                'https://salt.tikicdn.com/cache/750x750/ts/product/b4/f0/81/5d5e4a26cb029fdecd04e0c30cbef17a.jpg.webp',
            name: 'Quyết định triệu đô',
            price: 118000,
            quantity: 1,
            total: 118000.0
        },
        {
            key: '2',
            imageUrl:
                'https://salt.tikicdn.com/cache/750x750/ts/product/13/4f/08/cec6bf075eb1724d3b5da6e073c1079b.jpg.webp',
            name: 'Bạn đã nghĩ quá nhiều',
            price: 108000.0,
            quantity: 1,
            total: 108000.0
        }
    ];

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
            render: (_: any, record: any) =>
                dataSource.length >= 1 ? (
                    <Popconfirm title="Sure to delete?" onConfirm={() => {}}>
                        <a>Xóa</a>
                    </Popconfirm>
                ) : null
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
                        <div className="w-full bg-blue-500">D</div>
                    </Col>
                </Row>
            </div>
        </>
    );
};
