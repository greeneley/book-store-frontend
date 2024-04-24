import React from 'react';
import Slider from 'react-slick';

function NextArrow(props: any): JSX.Element {
    return (
        <div
            className="slick-arrow slick-next bg-blue-500"
            style={{ color: '#000' }}
            onClick={props.onClick}
        />
    );
}

function PrevArrow(props: any): JSX.Element {
    return (
        <div
            className="slick-arrow stick-next bg-blue-500"
            onClick={props.onClick}
        />
    );
}
export const BookDetail = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextArrow />
        // prevArrow: <PrevArrow />
    };
    return (
        <>
            <div className="container text-center text-md-left py-3">
                <div className="grid grid-cols-1 lg:grid-cols-3 bg-white p-8 rounded-2xl">
                    <div className="">
                        <Slider {...settings}>
                            <div>
                                <h3>1</h3>
                            </div>
                            <div>
                                <h3>2</h3>
                            </div>
                            <div>
                                <h3>3</h3>
                            </div>
                            <div>
                                <h3>4</h3>
                            </div>
                            <div>
                                <h3>5</h3>
                            </div>
                            <div>
                                <h3>6</h3>
                            </div>
                        </Slider>
                    </div>
                    <div className="col-span-2">02</div>
                </div>
            </div>
        </>
    );
};
