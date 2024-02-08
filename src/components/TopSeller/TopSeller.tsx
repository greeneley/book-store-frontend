import React from 'react';
import Dropdown from 'react-bootstrap/esm/Dropdown';
import { Button, Container, Image } from 'react-bootstrap';
import Carousel from 'react-multi-carousel';
import { Cart2 } from 'react-bootstrap-icons';

export const TopSeller: React.FC = () => {
    return (
        <Container className="my-10">
            <h3 className="font-light">Top Seller</h3>
            <Dropdown>
                <Dropdown.Toggle
                    id="dropdown-basic"
                    style={{ background: '#EAEAEA', borderColor: 'white' }}
                >
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
                additionalTransfrom={0}
                arrows
                autoPlay
                autoPlaySpeed={3000}
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
                                Lindbergh&apos;s Pharmacy is an Athens, Georgia,
                                institution...
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
                        <Image src="public/asset/books/book1.svg" rounded />
                    </div>
                    <div className="flex flex-column">
                        <div className="content justify-content-center mt-auto p-2">
                            <h3 className="text-base font-normal">
                                I Want a Better Catastrophe...
                            </h3>
                            <p className="text-sm font-light">
                                With global warming projected to rocket past
                                the...
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
                                In the city, Trey meets up with a cast of
                                characters....
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
