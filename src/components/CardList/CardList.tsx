import React, { useState } from 'react';
import { Book } from '../../model';
import { Button, Col, Container, Image, Row } from 'react-bootstrap';
import { Cart2 } from 'react-bootstrap-icons';

export const CardList: React.FC = () => {
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

                <Row>
                    <Col span={8}>
                        <div className="d-flex justify-content-center">
                            <Image
                                src="public/asset/books/ForgetAndMentor.svg"
                                rounded
                            />
                        </div>
                        <div className="flex flex-column">
                            <div className="content justify-content-center mt-auto p-2">
                                <h3 className="text-base font-normal">
                                    Forget a Mentor, Find...
                                </h3>
                                <p className="text-sm font-light">
                                    In this powerful yet practical book,
                                    economist and...
                                </p>
                                <div className="price flex gap-3">
                                    <p className="font-medium">$ 29.99</p>
                                    <p className="font-light text-decoration-line-through">
                                        $ 32.99
                                    </p>
                                </div>
                            </div>
                            <Button
                                variant="primary"
                                className="text-white w-fit mt-auto ml-auto mr-auto"
                            >
                                <div className="flex align-items-center gap-2">
                                    <Cart2 />
                                    Add to basket
                                </div>
                            </Button>
                        </div>
                    </Col>
                    <Col span={8}>
                        <div className="d-flex justify-content-center">
                            <Image
                                src="public/asset/books/ForgetAndMentor.svg"
                                rounded
                            />
                        </div>
                        <div className="flex flex-column">
                            <div className="content justify-content-center mt-auto p-2">
                                <h3 className="text-base font-normal">
                                    Forget a Mentor, Find...
                                </h3>
                                <p className="text-sm font-light">
                                    In this powerful yet practical book,
                                    economist and...
                                </p>
                                <div className="price flex gap-3">
                                    <p className="font-medium">$ 29.99</p>
                                    <p className="font-light text-decoration-line-through">
                                        $ 32.99
                                    </p>
                                </div>
                            </div>
                            <Button
                                variant="primary"
                                className="text-white w-fit mt-auto ml-auto mr-auto"
                            >
                                <div className="flex align-items-center gap-2">
                                    <Cart2 />
                                    Add to basket
                                </div>
                            </Button>
                        </div>
                    </Col>
                    <Col span={8}>
                        <div className="d-flex justify-content-center">
                            <Image
                                src="public/asset/books/ForgetAndMentor.svg"
                                rounded
                            />
                        </div>
                        <div className="flex flex-column">
                            <div className="content justify-content-center mt-auto p-2">
                                <h3 className="text-base font-normal">
                                    Forget a Mentor, Find...
                                </h3>
                                <p className="text-sm font-light">
                                    In this powerful yet practical book,
                                    economist and...
                                </p>
                                <div className="price flex gap-3">
                                    <p className="font-medium">$ 29.99</p>
                                    <p className="font-light text-decoration-line-through">
                                        $ 32.99
                                    </p>
                                </div>
                            </div>
                            <Button
                                variant="primary"
                                className="text-white w-fit mt-auto ml-auto mr-auto"
                            >
                                <div className="flex align-items-center gap-2">
                                    <Cart2 />
                                    Add to basket
                                </div>
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
};
