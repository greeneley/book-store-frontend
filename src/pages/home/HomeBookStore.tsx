import React from 'react';
import LayoutTwo from '../../layouts/LayoutTwo';
import BlogFeatured from '../../wrappers/blog-featured/BlogFeatured';
import BrandLogoSliderTwo from '../../wrappers/brand-logo/BrandLogoSliderTwo';
import CtaOne from '../../wrappers/cta/CtaOne';
import FeatureIconFour from '../../wrappers/feature-icon/FeatureIconFour';
import TabProductFour from '../../wrappers/product/TabProductFour';
import SliderBanner from '../../wrappers/slider-banner/SliderBanner';

const HomeBookStore = () => {
    return (
        <>
            <LayoutTwo>
                {/* slider banner */}
                <SliderBanner />
                {/* feature icon */}
                <FeatureIconFour
                    spaceBottomClass="pb-70"
                    containerClass="container"
                    responsiveClass="res-mrg-md-mt"
                />
                {/* tab product */}
                <TabProductFour
                    category="book"
                    productTabClass="product-tab-pink2"
                />
                {/* call to action */}
                <CtaOne
                    spaceTopClass="pt-100"
                    backgroundImage="/assets/img/bg/bg-5.jpg"
                />
                {/* new product slider */}
                {/*<NewProductSlider*/}
                {/*    spaceTopClass="pt-100"*/}
                {/*    spaceBottomClass="pb-95"*/}
                {/*    category="book"*/}
                {/*    limit={6}*/}
                {/*/>*/}
                {/* brand logo slider */}
                <BrandLogoSliderTwo />
                {/* blog featured */}
                <BlogFeatured spaceTopClass="pt-95" spaceBottomClass="pb-55" />
            </LayoutTwo>
        </>
    );
};

export default HomeBookStore;
