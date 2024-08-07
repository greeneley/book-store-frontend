import clsx from 'clsx';
import React from 'react';
import { Link } from 'react-router-dom';

interface BannerEightSingleProps {
    data: any;
    spaceBottomClass: string;
}
const BannerEightSingle: React.FC<BannerEightSingleProps> = ({
    data,
    spaceBottomClass
}) => {
    return (
        <div className={clsx('single-banner', spaceBottomClass)}>
            <Link to={process.env.PUBLIC_URL + data.link}>
                <img src={process.env.PUBLIC_URL + data.image} alt="" />
            </Link>
            <div className="banner-content banner-pink">
                <h3>{data.title}</h3>
                <h4>
                    {data.subtitle} <span>{data.price}</span>
                </h4>
                <Link to={process.env.PUBLIC_URL + data.link}>
                    <i className="fa fa-long-arrow-right" />
                </Link>
            </div>
        </div>
    );
};

export default BannerEightSingle;
