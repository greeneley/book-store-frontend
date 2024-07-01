import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

interface FooterCopyrightProps {
    footerLogo: string;
    spaceBottomClass?: string;
    colorClass?: typeof PropTypes.string;
}

const FooterCopyright: React.FC<FooterCopyrightProps> = ({
    footerLogo,
    spaceBottomClass,
    colorClass
}) => {
    return (
        <div className={clsx('copyright', spaceBottomClass, colorClass)}>
            <div className="footer-logo">
                <Link to={process.env.PUBLIC_URL + '/'}>
                    <img alt="" src={process.env.PUBLIC_URL + footerLogo} />
                </Link>
            </div>
            <p>
                &copy; {new Date().getFullYear()}{' '}
                <a
                    href="https://hasthemes.com"
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    Flone
                </a>
                .<br /> All Rights Reserved
            </p>
        </div>
    );
};

export default FooterCopyright;
