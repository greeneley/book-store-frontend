import MinusOutlined from '@ant-design/icons/lib/icons/MinusOutlined';
import PlusOutlined from '@ant-design/icons/lib/icons/PlusOutlined';
import { convertToCurrency } from '@utils/helpers/convertToCurrency';
import { Image } from 'antd';
import Button from 'antd/es/button';
import Title from 'antd/es/typography/Title';
import React, { useEffect, useMemo, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { Book } from '../model';

export const BookDetail = () => {
    const result = useLoaderData() as Book;

    const [bookId, setBookId] = useState(undefined);
    const [name, setName] = useState(undefined);

    const [price, setPrice] = useState(undefined);

    const [description, setDescription] = useState(undefined);
    const [imageUrl, setImageUrl] = useState(undefined);
    const [favorite, setFavorite] = useState(undefined);
    const [authors, setAuthors] = useState(undefined);

    const originalPrice = useMemo(() => {
        return price * 1.3;
    }, [price]);

    useEffect(() => {
        if (result) {
            setBookId(result.book_id);
            setName(result.name);
            setPrice(result.price);
            setDescription(result.desc);
            setImageUrl(result.imageUrl);
            setFavorite(result.favorite);
            setAuthors(result.author);
        }
    }, [result]);

    const settings = {
        dots: true,
        dotsClass: 'slick-dots slick-thumb',
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        customPaging: function () {
            return (
                <a>
                    {/*<Image src={'public/asset/books/Midnight.svg'} rounded />*/}
                </a>
            );
        }
    };
    return (
        <>
            <div className="container text-center text-md-left py-3 grid grid-cols-3 gap-3">
                <div className="col-span-2 grid grid-cols-1 lg:grid-cols-3 bg-white p-8 rounded-2xl">
                    <div className="w-full">
                        <Image src={imageUrl} />
                    </div>
                    <div className="col-span-2">
                        <Title level={3} className="fw-bold text-xl ">
                            {name}
                        </Title>
                        <form>
                            <div className="text-md-center">
                                <span className="first_status mr-2">
                                    Tác giả:{' '}
                                    <span className="accent-blue-600">
                                        <a
                                            href="/collections/all?q=filter=(!(collectionid:product=0)&amp;&amp;(vendor:product contains Văn Lang))&amp;page=1&amp;view=grid"
                                            target="_blank"
                                            className="text-[#007bff]"
                                            title="Văn Lang"
                                        >
                                            {authors}
                                        </a>
                                    </span>
                                </span>
                                <span className="first_status product_sku">
                                    Mã sản phẩm:
                                    <span
                                        className="status_name product-sku text-[#007bff]"
                                        itemProp="sku"
                                    >
                                        8935074133045
                                    </span>
                                </span>
                            </div>
                            <div className="flex items-center flex-wrap px-0 gap-4">
                                <span className="special-price">
                                    <span className="text-xl text-red-500 font-bold">
                                        {convertToCurrency(price)}
                                    </span>
                                </span>
                                <span className="old-price">
                                    <del className="text-[#979797] ml-2 font-normal text-lg">
                                        {convertToCurrency(originalPrice)}
                                    </del>
                                </span>
                                <div className="rounded bg-red-500 text-white inline-flex justify-center items-center px-2 py-1 font-bold text-lg">
                                    -30%
                                </div>
                                <div className="text-sm w-auto">
                                    (Tiết kiệm:{' '}
                                    <span className="text-red-500">
                                        {convertToCurrency(
                                            originalPrice - price
                                        )}
                                    </span>
                                    )
                                </div>
                            </div>
                            <div className="grid grid-cols-2">
                                <label
                                    className="text-gray-500"
                                    style={{
                                        display: 'grid',
                                        alignItems: 'center',
                                        gridTemplateColumns: '80px 1fr',
                                        marginBottom: '20px'
                                    }}
                                >
                                    Số lượng:
                                </label>
                                <div className="flex h-9 mb-0 mt-0 items-center">
                                    <button
                                        className="p-1 h-8 w-8 flex items-center justify-center text-[#8c9196]"
                                        type="button"
                                        style={{
                                            border: '1px solid #ced4da',
                                            borderRadius: '4px 0 0 4px',
                                            borderRight: '0'
                                        }}
                                    >
                                        <MinusOutlined />
                                    </button>
                                    <input
                                        type="text"
                                        id="qtym"
                                        name="quantity"
                                        value="1"
                                        maxLength={10}
                                        className="text-center w-12 h-8"
                                        style={{
                                            borderTop: '1px solid #ced4da',
                                            borderBottom: '1px solid #ced4da',
                                            borderRadius: '0'
                                        }}
                                    />
                                    <button
                                        className="p-1 h-8 w-8 flex items-center justify-center text-[#8c9196]"
                                        type="button"
                                        style={{
                                            border: '1px solid #ced4da',
                                            borderRadius: '0 4px 4px 0',
                                            borderLeft: '0'
                                        }}
                                    >
                                        <PlusOutlined />
                                    </button>
                                </div>
                            </div>
                            <div className="flex flex-wrap mb-2 gap-3">
                                <Button
                                    type="primary"
                                    className="bg-[#0A57A2] text-white flex flex-col h-14 w-full items-center justify-center px-2 py-1 font-bold"
                                >
                                    <h5>MUA NGAY</h5>
                                    <span className="font-light text-sm">
                                        Giao hàng tận nơi, Freeship cho đơn hàng
                                        trên 299K
                                    </span>
                                </Button>
                                <Button className="text-[#0A57A2] flex flex-col h-14 w-full items-center justify-center px-2 py-1 font-bold">
                                    THÊM VÀO GIỎ HÀNG
                                </Button>
                            </div>
                            <p className="mb-0 text-center">
                                Gọi đặt mua{' '}
                                <a
                                    href="tel:07.07.26.18.25"
                                    className="font-bold text-[#007bff]"
                                >
                                    07.07.26.18.25
                                </a>{' '}
                                (7:30 - 17:00) T2 - T6, Sáng T7
                            </p>
                        </form>
                    </div>
                </div>
                <div className="bg-white h-fit p-8 rounded-2xl">
                    <div>
                        <ul className="border-0 p-3 m-0 text-sm flex flex-col">
                            <li className="flex items-start">
                                <div className="mr-2">
                                    <img
                                        className="img-fluid "
                                        width="24"
                                        height="24"
                                        src="//theme.hstatic.net/200000663439/1001056805/14/policy_product_image_1.png?v=4349"
                                        alt="FreeShip 35k cho đơn hàng trên 299k"
                                    />
                                </div>
                                <div className="media-body">
                                    FreeShip 35k cho đơn hàng trên 299k
                                </div>
                            </li>
                            <li className="flex items-start">
                                <div className="mr-2">
                                    <img
                                        className="img-fluid "
                                        width="24"
                                        height="24"
                                        src="//theme.hstatic.net/200000663439/1001056805/14/policy_product_image_3.png?v=4349"
                                        alt="Thanh toán online qua VNpay, MoMo,..."
                                    />
                                </div>
                                <div className="media-body">
                                    Thanh toán online qua VNpay, MoMo,...
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <section>
                <div className="container text-md-left py-3">
                    <div className="grid grid-cols-1 bg-white p-8 rounded-2xl">
                        <div id="content" className="content js-content">
                            {description}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
