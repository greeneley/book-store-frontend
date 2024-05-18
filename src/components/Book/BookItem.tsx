import { convertToCurrency } from '@utils/helpers/convertToCurrency';
import { Button, Image } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

interface BookItemProps {
    url: string;
    title: string;
    desc: string;
    price: number;
    bookId: number;
}
export const BookItem: React.FC<BookItemProps> = (props) => {
    const { url, title, desc, price, bookId } = props;
    console.log({ bookId });
    return (
        <>
            <div className="grid grid-cols-2 p-4 border-2 border-[#ebebf0] rounded-2xl mx-1 bg-white">
                <div>
                    <Image src={url} />
                </div>
                <div className="flex">
                    <div className="content justify-content-center p-2 flex flex-col">
                        <h3 className="text-base font-normal">{title}</h3>
                        <div className="price flex gap-3">
                            <p className="font-medium">
                                {convertToCurrency(price * 0.8)}
                            </p>
                            <p className="font-light text-decoration-line-through">
                                {convertToCurrency(price)}
                            </p>
                        </div>
                        <Button className="mt-auto">
                            <div className="flex align-items-center gap-2">
                                Thêm vào giỏ hàng
                            </div>
                        </Button>
                        <Link to={`/book/${bookId}`}>Xem chi tiết</Link>
                    </div>
                </div>
            </div>
        </>
    );
};
