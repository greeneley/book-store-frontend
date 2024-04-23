import React from 'react';
import { Button, Image } from 'react-bootstrap';
import { Cart2 } from 'react-bootstrap-icons';
import { getHashParamValueByKey } from '@utils/url-hash-params';
import { debounce } from '@utils/helpers/debounce';
import { convertToCurrency } from '@utils/helpers/convertToCurrency';

interface BookItemProps {
    url: string;
    title: string;
    desc: string;
    price: number;
}
export const BookItem: React.FC<BookItemProps> = ({
    url,
    title,
    desc,
    price
}) => {
    return (
        <div className="grid grid-cols-2 p-4 border-2 border-[#ebebf0] rounded-2xl mx-1">
            <div>
                <Image src={url} rounded />
            </div>
            <div className="flex flex-column">
                <div className="content justify-content-center mt-auto p-2">
                    <h3 className="text-base font-normal">{title}</h3>
                    <div className="price flex gap-3">
                        <p className="font-medium">
                            {convertToCurrency(price * 0.8)}
                        </p>
                        <p className="font-light text-decoration-line-through">
                            {convertToCurrency(price)}
                        </p>
                    </div>
                </div>
                <Button variant="primary" className="text-white w-fit mt-auto">
                    <div className="flex align-items-center gap-2">
                        <Cart2 />
                        Add to basket
                    </div>
                </Button>
            </div>
        </div>
    );
};
