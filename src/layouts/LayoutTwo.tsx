import React, { Fragment } from 'react';
import ScrollToTop from '../components/scroll-to-top';
import FooterOne from '../wrappers/footer/FooterOne';
import HeaderTwo from '../wrappers/header/HeaderTwo';

interface LayoutTwoProps {
    children?: React.ReactNode;
    footerBgClass?: string;
}
const LayoutTwo: React.FC<LayoutTwoProps> = ({ children, footerBgClass }) => {
    return (
        <Fragment>
            <HeaderTwo />
            {children}
            <FooterOne
                backgroundColorClass={footerBgClass ? footerBgClass : 'bg-gray'}
                spaceTopClass="pt-100"
                spaceBottomClass="pb-70"
            />
            <ScrollToTop />
        </Fragment>
    );
};

export default LayoutTwo;
