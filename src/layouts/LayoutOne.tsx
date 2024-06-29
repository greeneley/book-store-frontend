import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import ScrollToTop from '../components/scroll-to-top';
import FooterOne from '../wrappers/footer/FooterOne';
import HeaderOne from '../wrappers/header/HeaderOne';

const LayoutOne: React.FC<LayoutOneProps> = ({
    children,
    headerContainerClass,
    headerTop,
    headerPaddingClass,
    headerPositionClass
}) => {
    return (
        <Fragment>
            <HeaderOne
                layout={headerContainerClass}
                top={headerTop}
                headerPaddingClass={headerPaddingClass}
                headerPositionClass={headerPositionClass}
            />
            {children}
            <FooterOne
                backgroundColorClass="bg-gray"
                spaceTopClass="pt-100"
                spaceBottomClass="pb-70"
            />
            <ScrollToTop />
        </Fragment>
    );
};

interface LayoutOneProps {
    children: React.ReactNode;
    headerContainerClass: typeof PropTypes.string;
    headerPaddingClass: typeof PropTypes.string;
    headerPositionClass: typeof PropTypes.string;
    headerTop: typeof PropTypes.string;
}

export default LayoutOne;
