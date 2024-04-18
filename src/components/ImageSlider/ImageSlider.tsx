import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Carousel, Image } from 'react-bootstrap';
import { CarouselProps } from 'react-bootstrap/Carousel';

export interface ImageSliderProps extends CarouselProps {
    sources: Array<string>;
}

interface IBook {
    bookId: number;
    name: string;
    price: number;
    author: string;
    publisher: string;
    publishedOn: string;
    desc: string;
    imageUrl: string;
    favorite: string;
}

export const ImageSlider: React.FC<ImageSliderProps> = (props) => {
    const { sources } = props;
    const [books, setBooks] = useState<Array<IBook>>(null);
    useEffect(() => {
        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:8081/book/favorite',
            headers: {}
        };
        axios
            .request(config)
            .then((response) => {
                // setBook(response.data);
                setBooks(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    return (
        <Carousel data-bs-theme="dark" indicators={false}>
            {books &&
                books.map((book: IBook, index) => {
                    return (
                        <Carousel.Item key={index}>
                            <Image
                                src={book.imageUrl}
                                style={{
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                    display: 'flex'
                                }}
                            />
                        </Carousel.Item>
                    );
                })}
        </Carousel>
    );
};
