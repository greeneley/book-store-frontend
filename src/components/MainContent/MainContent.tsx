import React from 'react';
import { Button, Carousel, Col, Container, Image, Row } from 'react-bootstrap';
import { ImageSlider } from '@components/ImageSlider/ImageSlider';

export const MainContent: React.FC = () => {
    const imageSliders = [
        'public/asset/books/book1.svg',
        'public/asset/books/book2.svg',
        'public/asset/books/book3.svg'
    ];
    return (
        <Container>
            <Row>
                <Col>
                    <h2 className="mb-4">New Releases This Week</h2>
                    <p>
                        It&apos;s time to update your reading list with some of
                        the latest and greatest releases in the literary world.
                        From heart-pumping thrillers to captivating memoirs,
                        this week&apos;s new releases offer something for
                        everyone
                    </p>
                    <div className="d-grid col-4">
                        <Button variant="primary" className="text-muted">
                            Subscribe
                        </Button>
                    </div>
                </Col>
                <Col>
                    <ImageSlider sources={imageSliders} />
                </Col>
            </Row>
        </Container>
    );
};
