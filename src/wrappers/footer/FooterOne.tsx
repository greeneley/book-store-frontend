import clsx from 'clsx';

import PropTypes from 'prop-types';
import React from 'react';

import FooterCopyright from '@components/footer/FooterCopyright';
import FooterNewsletter from '@components/footer/FooterNewsletter';
import { Link } from 'react-router-dom';

interface FooterOneProps {
    backgroundColorClass: typeof PropTypes.string;
    containerClass: typeof PropTypes.string;
    extraFooterClass: typeof PropTypes.string;
    sideMenu: typeof PropTypes.bool;
    spaceBottomClass: typeof PropTypes.string;
    spaceTopClass: typeof PropTypes.string;
    spaceLeftClass: typeof PropTypes.string;
    spaceRightClass: typeof PropTypes.string;
}
const FooterOne: React.FC<FooterOneProps> = ({
    backgroundColorClass,
    spaceTopClass,
    spaceBottomClass,
    spaceLeftClass,
    spaceRightClass,
    containerClass,
    extraFooterClass,
    sideMenu
}) => {
    return (
        <footer
            className={clsx(
                'footer-area',
                backgroundColorClass,
                spaceTopClass,
                spaceBottomClass,
                extraFooterClass,
                spaceLeftClass,
                spaceRightClass
            )}
        >
            <div className={`${containerClass ? containerClass : 'container'}`}>
                <div className="row">
                    <div
                        className={`${
                            sideMenu ? 'col-xl-2 col-sm-4' : 'col-lg-2 col-sm-4'
                        }`}
                    >
                        {/* footer copyright */}
                        <FooterCopyright
                            footerLogo="/assets/img/logo/logo.png"
                            spaceBottomClass="mb-30"
                        />
                    </div>
                    <div
                        className={`${
                            sideMenu ? 'col-xl-2 col-sm-4' : 'col-lg-2 col-sm-4'
                        }`}
                    >
                        <div className="footer-widget mb-30 ml-30">
                            <div className="footer-title">
                                <h3>ABOUT US</h3>
                            </div>
                            <div className="footer-list">
                                <ul>
                                    <li>
                                        <Link
                                            to={
                                                process.env.PUBLIC_URL +
                                                '/about'
                                            }
                                        >
                                            About us
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to={process.env.PUBLIC_URL + '#/'}
                                        >
                                            Store location
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to={
                                                process.env.PUBLIC_URL +
                                                '/contact'
                                            }
                                        >
                                            Contact
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to={process.env.PUBLIC_URL + '#/'}
                                        >
                                            Orders tracking
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div
                        className={`${
                            sideMenu ? 'col-xl-2 col-sm-4' : 'col-lg-2 col-sm-4'
                        }`}
                    >
                        <div
                            className={`${
                                sideMenu
                                    ? 'footer-widget mb-30 ml-95'
                                    : 'footer-widget mb-30 ml-50'
                            }`}
                        >
                            <div className="footer-title">
                                <h3>USEFUL LINKS</h3>
                            </div>
                            <div className="footer-list">
                                <ul>
                                    <li>
                                        <Link
                                            to={process.env.PUBLIC_URL + '#/'}
                                        >
                                            Returns
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to={process.env.PUBLIC_URL + '#/'}
                                        >
                                            Support Policy
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to={process.env.PUBLIC_URL + '#/'}
                                        >
                                            Size guide
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to={process.env.PUBLIC_URL + '#/'}
                                        >
                                            FAQs
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div
                        className={`${
                            sideMenu ? 'col-xl-3 col-sm-4' : 'col-lg-2 col-sm-6'
                        }`}
                    >
                        <div
                            className={`${
                                sideMenu
                                    ? 'footer-widget mb-30 ml-145'
                                    : 'footer-widget mb-30 ml-75'
                            }`}
                        >
                            <div className="footer-title">
                                <h3>FOLLOW US</h3>
                            </div>
                            <div className="footer-list">
                                <ul>
                                    <li>
                                        <a
                                            href="//www.facebook.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Facebook
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="//www.twitter.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Twitter
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="//www.instagram.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Instagram
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="//www.youtube.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Youtube
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div
                        className={`${
                            sideMenu ? 'col-xl-3 col-sm-8' : 'col-lg-4 col-sm-6'
                        }`}
                    >
                        {/* footer newsletter */}
                        <FooterNewsletter
                            spaceBottomClass="mb-30"
                            spaceLeftClass="ml-70"
                            sideMenu={sideMenu}
                        />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default FooterOne;
