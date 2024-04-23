import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { ImageSlider } from '@components/ImageSlider/ImageSlider';
import axios from 'axios';
import { Book } from '../../model';

export const MainContent: React.FC = () => {
    const [urls, setUrls] = useState<Array<string>>([]);

    useEffect(() => {
        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: process.env.REACT_APP_SERVER_URL + '/book/favorite',
            headers: {}
        };
        axios
            .request(config)
            .then((response) => {
                setUrls(response.data.map((data: Book) => data.imageUrl));
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <Container className="bg-white p-8 rounded-2xl">
            <Row className="p-8">
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
                    <ImageSlider urls={urls} />
                </Col>
            </Row>
        </Container>
    );
};
