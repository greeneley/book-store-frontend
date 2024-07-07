import clsx from 'clsx';
import React from 'react';

interface LogoProps {
    imageUrl?: string;
    logoClass?: string;
}
const Logo: React.FC<LogoProps> = ({ imageUrl, logoClass }) => {
    return (
        <div className={clsx(logoClass)}>
            <img src={process.env.PUBLIC_URL + imageUrl} alt="" />
        </div>
    );
};

export default Logo;
