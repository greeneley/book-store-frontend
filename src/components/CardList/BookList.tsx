import React, { useState } from 'react';
import { Book } from '../../model';
import { Button, Col, Container, Image, Row } from 'react-bootstrap';
import { Cart2 } from 'react-bootstrap-icons';
import { BookItem } from '@components/Book/BookItem';
import { LoremIpsum } from 'lorem-ipsum';

export const BookList: React.FC = () => {
    const [books, setBooks] = useState<Array<Book>>();

    // useEffect(() => {
    //     const config = {
    //         method: 'get',
    //         maxBodyLength: Infinity,
    //         url: process.env.REACT_APP_SERVER_URL + '/book/favorite',
    //         headers: {}
    //     };
    //     axios
    //         .request(config)
    //         .then((response) => {
    //             setBooks(response.data);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // }, []);

    return (
        <>
            <Container className="mt-20">
                <h3 className="font-light">Browser Books</h3>
                <br />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <BookItem
                        url={'public/asset/books/Midnight.svg'}
                        price={18000}
                        title={'Forget a Mentor, Find...'}
                        desc={new LoremIpsum({
                            sentencesPerParagraph: {
                                max: 8,
                                min: 4
                            }
                        }).generateSentences(2)}
                    />
                    <BookItem
                        url={'public/asset/books/Midnight.svg'}
                        price={18000}
                        title={'Forget a Mentor, Find...'}
                        desc={new LoremIpsum({
                            sentencesPerParagraph: {
                                max: 8,
                                min: 4
                            }
                        }).generateSentences(2)}
                    />
                    <BookItem
                        url={'public/asset/books/Midnight.svg'}
                        price={18000}
                        title={'Forget a Mentor, Find...'}
                        desc={new LoremIpsum({
                            sentencesPerParagraph: {
                                max: 8,
                                min: 4
                            }
                        }).generateSentences(2)}
                    />
                    <BookItem
                        url={'public/asset/books/Midnight.svg'}
                        price={18000}
                        title={'Forget a Mentor, Find...'}
                        desc={new LoremIpsum({
                            sentencesPerParagraph: {
                                max: 8,
                                min: 4
                            }
                        }).generateSentences(2)}
                    />
                    <BookItem
                        url={'public/asset/books/Midnight.svg'}
                        price={18000}
                        title={'Forget a Mentor, Find...'}
                        desc={new LoremIpsum({
                            sentencesPerParagraph: {
                                max: 8,
                                min: 4
                            }
                        }).generateSentences(2)}
                    />
                    <BookItem
                        url={'public/asset/books/Midnight.svg'}
                        price={18000}
                        title={'Forget a Mentor, Find...'}
                        desc={new LoremIpsum({
                            sentencesPerParagraph: {
                                max: 8,
                                min: 4
                            }
                        }).generateSentences(2)}
                    />
                    <BookItem
                        url={'public/asset/books/Midnight.svg'}
                        price={18000}
                        title={'Forget a Mentor, Find...'}
                        desc={new LoremIpsum({
                            sentencesPerParagraph: {
                                max: 8,
                                min: 4
                            }
                        }).generateSentences(2)}
                    />
                    <BookItem
                        url={'public/asset/books/Midnight.svg'}
                        price={18000}
                        title={'Forget a Mentor, Find...'}
                        desc={new LoremIpsum({
                            sentencesPerParagraph: {
                                max: 8,
                                min: 4
                            }
                        }).generateSentences(2)}
                    />
                </div>
            </Container>
        </>
    );
};
