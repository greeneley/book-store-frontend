import clsx from 'clsx';
import React from 'react';

interface FeatureIconFourSingleProps {
    data: any;
    spaceBottomClass: string;
}

const FeatureIconFourSingle: React.FC<FeatureIconFourSingleProps> = ({
    data,
    spaceBottomClass
}) => {
    return (
        <div
            className={clsx('support-wrap-3 text-center', spaceBottomClass)}
            style={{ backgroundColor: `${data.backgroundColor}` }}
        >
            <div className="support-icon-2">
                <img
                    className="animated"
                    src={process.env.PUBLIC_URL + data.iconImage}
                    alt=""
                />
            </div>
            <div className="support-content-3">
                <img src={process.env.PUBLIC_URL + data.titleImage} alt="" />
                <p>{data.title}</p>
            </div>
        </div>
    );
};

export default FeatureIconFourSingle;
