import React from 'react';
import Dropdown from 'react-bootstrap/esm/Dropdown';
import { Button, Carousel, Container, Image } from 'react-bootstrap';
import { ArrowLeft, ArrowRight, Cart2 } from 'react-bootstrap-icons';

export const TopSeller: React.FC = () => {
    return (
        <Container>
            <h3>Top Seller</h3>
            <Dropdown>
                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                    Choose a genre
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">
                        Another action
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-3">
                        Something else
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <br />
            <Carousel
                data-bs-theme="dark"
                indicators={false}
                prevIcon={
                    <ArrowLeft
                        size="36"
                        style={{
                            padding: '10px',
                            border: '1px solid #e2e2e2',
                            borderRadius: '50%',
                            background: 'white',
                            color: 'black'
                        }}
                    />
                }
                nextIcon={
                    <ArrowRight
                        size="36"
                        style={{
                            padding: '10px',
                            border: '1px solid #e2e2e2',
                            borderRadius: '50%',
                            background: 'white',
                            color: 'black'
                        }}
                    />
                }
            >
                <Carousel.Item>
                    <div className="flex px-3">
                        <div className="grid grid-cols-2 gap-0">
                            <div>
                                <Image
                                    src="public/asset/books/TheTimeHasCome.svg"
                                    rounded
                                />
                            </div>
                            <div className="flex flex-column">
                                <div className="content justify-content-center mt-auto p-2">
                                    <h3 className="text-base font-normal">
                                        The Time Has Come
                                    </h3>
                                    <p className="text-sm font-light">
                                        Lindbergh&apos;s Pharmacy is an Athens,
                                        Georgia, institution...
                                    </p>
                                    <div className="price flex gap-3">
                                        <p className="font-medium">$ 27.89</p>
                                        <p className="font-light text-decoration-line-through">
                                            $ 30.99
                                        </p>
                                    </div>
                                </div>
                                <Button
                                    variant="primary"
                                    className="text-white w-fit mt-auto"
                                >
                                    <div className="flex align-items-center gap-2">
                                        <Cart2 />
                                        Add to basket
                                    </div>
                                </Button>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-0">
                            <div>
                                <Image
                                    src="public/asset/books/book1.svg"
                                    rounded
                                />
                            </div>
                            <div className="flex flex-column">
                                <div className="content justify-content-center mt-auto p-2">
                                    <h3 className="text-base font-normal">
                                        I Want a Better Catastrophe...
                                    </h3>
                                    <p className="text-sm font-light">
                                        With global warming projected to rocket
                                        past the...
                                    </p>
                                    <div className="price flex gap-3">
                                        <p className="font-medium">$ 26.99</p>
                                        <p className="font-light text-decoration-line-through">
                                            $ 29.99
                                        </p>
                                    </div>
                                </div>
                                <Button
                                    variant="primary"
                                    className="text-white w-fit mt-auto"
                                >
                                    <div className="flex align-items-center gap-2">
                                        <Cart2 />
                                        Add to basket
                                    </div>
                                </Button>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-0">
                            <div>
                                <Image
                                    src="public/asset/books/MyGovernment.svg"
                                    rounded
                                />
                            </div>
                            <div className="flex flex-column">
                                <div className="content justify-content-center mt-auto p-2">
                                    <h3 className="text-base font-normal">
                                        My Government....
                                    </h3>
                                    <p className="text-sm font-light">
                                        In the city, Trey meets up with a cast
                                        of characters....
                                    </p>
                                    <div className="price flex gap-3">
                                        <p className="font-medium">$ 25.89</p>
                                        <p className="font-light text-decoration-line-through">
                                            $ 27.99
                                        </p>
                                    </div>
                                </div>
                                <Button
                                    variant="primary"
                                    className="text-white w-fit mt-auto"
                                >
                                    <div className="flex align-items-center gap-2">
                                        <Cart2 />
                                        Add to basket
                                    </div>
                                </Button>
                            </div>
                        </div>
                    </div>
                </Carousel.Item>
            </Carousel>
        </Container>
    );
};
