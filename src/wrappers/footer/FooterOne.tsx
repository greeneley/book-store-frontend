import clsx from 'clsx';

import React from 'react';

import FooterCopyright from '@components/footer/FooterCopyright';
import FooterNewsletter from '@components/footer/FooterNewsletter';
import { Link } from 'react-router-dom';

interface FooterOneProps {
    backgroundColorClass: string;
    containerClass?: string;
    extraFooterClass?: string;
    sideMenu?: boolean;
    spaceBottomClass?: string;
    spaceTopClass?: string;
    spaceLeftClass?: string;
    spaceRightClass?: string;
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
                                <h3>HỖ TRỢ</h3>
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
                                            Hướng dẫn đặt hàng
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to={process.env.PUBLIC_URL + '#/'}
                                        >
                                            Câu hỏi thường gặp
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to={
                                                process.env.PUBLIC_URL +
                                                '/contact'
                                            }
                                        >
                                            Chính sách bảo mật
                                        </Link>
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
