import React from 'react';
import { EffectFade } from 'swiper';
import HeroSliderSevenSingle from '../../components/hero-slider/HeroSliderSevenSingle';
import Swiper, { SwiperSlide } from '../../components/swiper';
import heroSliderData from '../../data/hero-sliders/hero-slider-seven.json';

const params = {
    effect: 'fade',
    fadeEffect: {
        crossFade: true
    },
    modules: [EffectFade],
    loop: true,
    speed: 1000,
    navigation: true,
    autoHeight: false
};

const HeroSliderSeven = () => {
    return (
        <div className="slider-area res-mrg-md-mb">
            <div className="slider-active-3">
                {heroSliderData && (
                    // @ts-ignore
                    <Swiper options={params}>
                        {heroSliderData.map((single, key) => (
                            <SwiperSlide key={key}>
                                <HeroSliderSevenSingle data={single} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
            </div>
        </div>
    );
};

export default HeroSliderSeven;
