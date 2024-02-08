import React from 'react';
import Dropdown from 'react-bootstrap/esm/Dropdown';
import { Button, Container, Image } from 'react-bootstrap';
import Carousel from 'react-multi-carousel';
import { Cart2 } from 'react-bootstrap-icons';

export const RecommendBooks: React.FC = () => {
    return (
        <Container className="my-10">
            <h3 className="font-light">Recommend for you</h3>
            <br />
            <Carousel
                additionalTransfrom={0}
                arrows
                autoPlay
                autoPlaySpeed={4000}
                centerMode={false}
                containerClass="container"
                dotListClass=""
                draggable
                focusOnSelect={false}
                infinite
                itemClass=""
                keyBoardControl
                minimumTouchDrag={80}
                pauseOnHover
                renderArrowsWhenDisabled={false}
                renderButtonGroupOutside={false}
                renderDotsOutside={false}
                responsive={{
                    desktop: {
                        breakpoint: {
                            max: 3000,
                            min: 1024
                        },
                        items: 3,
                        partialVisibilityGutter: 40
                    },
                    mobile: {
                        breakpoint: {
                            max: 464,
                            min: 0
                        },
                        items: 1,
                        partialVisibilityGutter: 30
                    },
                    tablet: {
                        breakpoint: {
                            max: 1024,
                            min: 464
                        },
                        items: 2,
                        partialVisibilityGutter: 30
                    }
                }}
                rewind={false}
                rewindWithAnimation={false}
                rtl={false}
                shouldResetAutoplay
                showDots={false}
                sliderClass=""
                slidesToSlide={1}
                swipeable
            >
                <div className="grid grid-cols-2 gap-0">
                    <div>
                        <Image
                            src="public/asset/books/PrideAndProtest.svg"
                            rounded
                        />
                    </div>
                    <div className="flex flex-column">
                        <div className="content justify-content-center mt-auto p-2">
                            <h3 className="text-base font-normal">
                                Pride and Protest
                            </h3>
                            <p className="text-sm font-light">
                                A woman goes head-to-head with the CEO of...
                            </p>
                            <div className="price flex gap-3">
                                <p className="font-medium">$ 15.50</p>
                                <p className="font-light text-decoration-line-through">
                                    $ 18.50
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
                                In this powerful yet practical book, economist
                                and...
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
                        <Image src="public/asset/books/Midnight.svg" rounded />
                    </div>
                    <div className="flex flex-column">
                        <div className="content justify-content-center mt-auto p-2">
                            <h3 className="text-base font-normal">
                                The Midnight Library
                            </h3>
                            <p className="text-sm font-light">
                                Between life and death there is a library...
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
            </Carousel>
        </Container>
    );
};
