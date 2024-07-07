import clsx from 'clsx';
import React from 'react';
import { Link } from 'react-router-dom';

interface CtaOneProps {
    backgroundImage?: string;
    spaceTopClass?: string;
}

const CtaOne: React.FC<CtaOneProps> = ({ spaceTopClass, backgroundImage }) => {
    return (
        <div className={clsx('save-money-area', spaceTopClass)}>
            <div className="container">
                <div
                    className="bg-img pt-100 pb-100"
                    style={{
                        backgroundImage: `url(${
                            process.env.PUBLIC_URL + backgroundImage
                        })`
                    }}
                >
                    <div className="save-money-content">
                        <h2>Shop and save money</h2>
                        <div className="save-money-btn">
                            <Link
                                to={
                                    process.env.PUBLIC_URL +
                                    '/shop-grid-standard'
                                }
                            >
                                Buy $97.09
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CtaOne;
