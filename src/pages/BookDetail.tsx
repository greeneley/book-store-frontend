import React from 'react';
import Slider from 'react-slick';
import MinusOutlined from '@ant-design/icons/lib/icons/MinusOutlined';
import PlusOutlined from '@ant-design/icons/lib/icons/PlusOutlined';
import Button from 'antd/es/button';

export const BookDetail = () => {
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
                    <div className="">
                        <Slider {...settings}>
                            {/*<div>*/}
                            {/*    <Image*/}
                            {/*        src={'public/asset/books/Midnight.svg'}*/}
                            {/*        rounded*/}
                            {/*    />*/}
                            {/*</div>*/}
                            {/*<div>*/}
                            {/*    <Image*/}
                            {/*        src={'public/asset/books/Midnight.svg'}*/}
                            {/*        rounded*/}
                            {/*    />*/}
                            {/*</div>*/}
                            {/*<div>*/}
                            {/*    <Image*/}
                            {/*        src={'public/asset/books/Midnight.svg'}*/}
                            {/*        rounded*/}
                            {/*    />*/}
                            {/*</div>*/}
                            {/*<div>*/}
                            {/*    <Image*/}
                            {/*        src={'public/asset/books/Midnight.svg'}*/}
                            {/*        rounded*/}
                            {/*    />*/}
                            {/*</div>*/}
                        </Slider>
                    </div>
                    <div className="col-span-2">
                        <h1 className="fw-bold text-xl ">
                            Câu Chuyện Kinh Thánh (Tái bản 2024) - Vanlangbooks
                        </h1>
                        <form>
                            <div className="text-md-center">
                                <span className="first_status mr-2">
                                    Thương hiệu:{' '}
                                    <span className="accent-blue-600">
                                        <a
                                            href="/collections/all?q=filter=(!(collectionid:product=0)&amp;&amp;(vendor:product contains Văn Lang))&amp;page=1&amp;view=grid"
                                            target="_blank"
                                            className="text-[#007bff]"
                                            title="Văn Lang"
                                        >
                                            Văn Lang
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
                                        118,300₫
                                    </span>
                                </span>
                                <span className="old-price">
                                    <del className="text-[#979797] ml-2 font-normal text-lg">
                                        169,000₫
                                    </del>
                                </span>
                                <div className="rounded bg-red-500 text-white inline-flex justify-center items-center px-2 py-1 font-bold text-lg">
                                    -30%
                                </div>
                                <div className="text-sm w-auto">
                                    (Tiết kiệm:{' '}
                                    <span className="text-red-500">
                                        50,700₫
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
                                    THÊM VÀO GIỎ
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
                            <p>I. GIỚI THIỆU SÁCH</p>
                            <p>
                                Khi Đức Jesus đến nhà Matthew và ngồi xuống dùng
                                bữa, thì rất nhiều người cũng đến ngồi ăn với
                                ngài và môn đệ của ngài. Phần lớn những người
                                này là quan thu thuế và kẻ xấu. Người Pharisees,
                                thấy vậy bèn hỏi các môn đệ của ngài, “ Tại sao
                                thầy các ngươi ngồi chung với những kẻ xấu xa
                                này?”. Đức Jesus nghe những lời này bèn nói,
                                “Đâu phải người khỏe mạnh cần thuốc, mà chỉ có
                                người bệnh thôi. Ta đến đây không phải cho người
                                công chính, mà là vì kẻ có tội, bởi họ mới cần
                                đến ta”.
                                <br />
                                Một công trình biên soạn dưới sự cố vấn của các
                                nhà nghiên cứu tôn giáo, các học giả và các tu
                                sĩ. Một món quà vô giá mà mọi gia đình Kitô hữu
                                đặc biệt dành tặng cho con em mình để sống và
                                trưởng thành theo gương Đức Jesus: tình yêu
                                thương bao la và đức hy sinh cao cả, từ đó sớm
                                nhận ra một chân lý mãi mãi trường tồn, đó là:
                                lòng nhân ái luôn chiến thắng sự hung dữ; cái
                                thiện luôn thắng cái ác...
                            </p>
                            <p>II. THÔNG TIN CHI TIẾT</p>
                            <p>Mã hàng: 8935074133045</p>
                            <p>Tác giả: Selina Hastings</p>
                            <p>Kích thước: 14,5x20,5</p>
                            <p>Số trang: 376</p>
                            <p>Trọng lượng (gr): 500</p>
                            <p>Hình thức: Bìa mềm</p>
                            <p>Năm xuất bản 2024</p>
                            <p>Nhà xuất bản Hồng Đức</p>
                            <p>Nhà phát hành Văn Lang</p>
                            <p>Ngôn ngữ: Tiếng Việt&nbsp;</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
