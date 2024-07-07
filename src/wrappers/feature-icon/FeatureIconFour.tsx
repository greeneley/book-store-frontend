import clsx from 'clsx';
import React from 'react';
import FeatureIconFourSingle from '../../components/feature-icon/FeatureIconFourSingle';
import featureIconData from '../../data/feature-icons/feature-icon-four.json';

interface FeatureIconFourProps {
    bgImg?: string;
    containerClass?: string;
    gutterClass?: string;
    responsiveClass?: string;
    spaceBottomClass?: string;
    spaceTopClass?: string;
}

const FeatureIconFour: React.FC<FeatureIconFourProps> = ({
    spaceTopClass,
    spaceBottomClass,
    containerClass,
    gutterClass,
    responsiveClass,
    bgImg
}) => {
    return (
        <div
            className={clsx(
                'support-area hm9-section-padding',
                spaceTopClass,
                spaceBottomClass,
                responsiveClass
            )}
            style={
                bgImg
                    ? {
                          backgroundImage: `url(${
                              process.env.PUBLIC_URL + bgImg
                          })`
                      }
                    : {}
            }
        >
            <div className={clsx(containerClass, gutterClass)}>
                <div className="row">
                    {featureIconData?.map((single, key) => (
                        <div className="col-lg-4 col-md-6 col-sm-6" key={key}>
                            <FeatureIconFourSingle
                                data={single}
                                spaceBottomClass="mb-10"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FeatureIconFour;
