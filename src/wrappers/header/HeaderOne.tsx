import Logo from '@components/header/Logo';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';

import HeaderTop from '@components/header/HeaderTop';
import IconGroup from '@components/header/IconGroup';
import MobileMenu from '@components/header/MobileMenu';
import NavMenu from '@components/header/NavMenu';

interface HeaderOneProps {
    borderStyle: string;
    headerPaddingClass: string;
    headerPositionClass: string;
    layout: string;
    top: string;
    headerBgClass: string;
}
const HeaderOne: React.FC<HeaderOneProps> = ({
    layout,
    top,
    borderStyle,
    headerPaddingClass,
    headerPositionClass,
    headerBgClass
}) => {
    const [scroll, setScroll] = useState(0);
    const [headerTop, setHeaderTop] = useState(0);

    useEffect(() => {
        const header = document.querySelector('.sticky-bar');

        setHeaderTop(header.offsetTop);
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleScroll = () => {
        setScroll(window.scrollY);
    };

    return (
        <header
            className={clsx(
                'header-area clearfix',
                headerBgClass,
                headerPositionClass
            )}
        >
            <div
                className={clsx(
                    'header-top-area',
                    headerPaddingClass,
                    top === 'visible' ? 'd-none d-lg-block' : 'd-none',
                    borderStyle === 'fluid-border' && 'border-none'
                )}
            >
                <div
                    className={
                        layout === 'container-fluid' ? layout : 'container'
                    }
                >
                    {/* header top */}
                    <HeaderTop borderStyle={borderStyle} />
                </div>
            </div>

            <div
                className={clsx(
                    headerPaddingClass,
                    'sticky-bar header-res-padding clearfix',
                    scroll > headerTop && 'stick'
                )}
            >
                <div
                    className={
                        layout === 'container-fluid' ? layout : 'container'
                    }
                >
                    <div className="row">
                        <div className="col-xl-2 col-lg-2 col-md-6 col-4">
                            {/* header logo */}
                            <Logo
                                imageUrl="/assets/img/logo/logo.png"
                                logoClass="logo"
                            />
                        </div>
                        <div className="col-xl-8 col-lg-8 d-none d-lg-block">
                            {/* Nav menu */}
                            <NavMenu />
                        </div>
                        <div className="col-xl-2 col-lg-2 col-md-6 col-8">
                            {/* Icon group */}
                            <IconGroup />
                        </div>
                    </div>
                </div>
                {/* mobile menu */}
                <MobileMenu />
            </div>
        </header>
    );
};

export default HeaderOne;
