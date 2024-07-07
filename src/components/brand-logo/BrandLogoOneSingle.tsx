import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';

interface BrandLogoOneSingleProps {
    data: any;
    spaceBottomClass: string;
}
const BrandLogoOneSingle: React.FC<BrandLogoOneSingleProps> = ({
    data,
    spaceBottomClass
}) => {
    return (
        <div className={clsx('single-brand-logo', spaceBottomClass)}>
            <img src={process.env.PUBLIC_URL + data.image} alt="" />
        </div>
    );
};

BrandLogoOneSingle.propTypes = {
    data: PropTypes.shape({}),
    spaceBottomClass: PropTypes.string
};

export default BrandLogoOneSingle;
