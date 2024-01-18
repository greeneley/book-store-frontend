import React from 'react';
import { Carousel, Image } from 'react-bootstrap';
import { CarouselProps } from 'react-bootstrap/Carousel';

export interface ImageSliderProps extends CarouselProps {
    sources: Array<string>;
}
export const ImageSlider: React.FC<ImageSliderProps> = (props) => {
    const { sources } = props;
    return (
        <Carousel data-bs-theme="dark" indicators={false}>
            {sources.map((source: string, index) => {
                return (
                    <Carousel.Item key={index}>
                        <Image
                            src={source}
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
