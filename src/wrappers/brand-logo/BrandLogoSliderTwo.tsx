import React from 'react';
import BrandLogoOneSingle from '../../components/brand-logo/BrandLogoOneSingle';
import Swiper, { SwiperSlide } from '../../components/swiper';
import brandLogoData from '../../data/brand-logos/brand-logo-one.json';

const settings = {
    loop: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false
    },
    grabCursor: true,
    breakpoints: {
        320: {
            slidesPerView: 2
        },
        640: {
            slidesPerView: 3
        },
        768: {
            slidesPerView: 4
        },
        1024: {
            slidesPerView: 4
        }
    }
};

interface BrandLogoSliderTwoProps {
    spaceBottomClass?: string;
    spaceTopClass?: string;
}
const BrandLogoSliderTwo: React.FC<BrandLogoSliderTwoProps> = () => {
    return (
        <div className={`brand-logo-area`}>
            <div className="container">
                <div className="bg-gray-6 brand-logo-wrap">
                    <div className="brand-logo-active-2">
                        {brandLogoData && (
                            // @ts-ignore
                            <Swiper options={settings}>
                                {brandLogoData.map((single, key) => {
                                    return (
                                        <SwiperSlide key={key}>
                                            <BrandLogoOneSingle
                                                data={single}
                                                spaceBottomClass="mb-30"
                                            />
                                        </SwiperSlide>
                                    );
                                })}
                            </Swiper>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BrandLogoSliderTwo;
