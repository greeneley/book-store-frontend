import React from 'react';
import Dropdown from 'react-bootstrap/esm/Dropdown';
import { Button, Container, Image } from 'react-bootstrap';
import Carousel from 'react-multi-carousel';
import { Cart2 } from 'react-bootstrap-icons';
import { BookItem } from '@components/Book/BookItem';
import { LoremIpsum } from 'lorem-ipsum';

export const TopSeller: React.FC = () => {
    return (
        <Container className="my-10 bg-white p-8 rounded-2xl">
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
                <BookItem
                    url={'public/asset/books/Midnight.svg'}
                    price={18000}
                    title={'Forget a Mentor, Find...'}
                    desc={new LoremIpsum({
                        sentencesPerParagraph: {
                            max: 8,
                            min: 4
                        }
                    }).generateSentences(1)}
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
                    }).generateSentences(1)}
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
            </Carousel>
        </Container>
    );
};
