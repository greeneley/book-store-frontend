import clsx from 'clsx';
import React from 'react';

interface SectionTitleThreeProps {
    positionClass?: string;
    spaceClass?: string;
    titleText?: string;
    colorClass?: any;
}
const SectionTitleThree: React.FC<SectionTitleThreeProps> = ({
    titleText,
    positionClass,
    spaceClass,
    colorClass
}) => {
    return (
        <div className={clsx('section-title-5', positionClass, spaceClass)}>
            <h2 className={clsx(colorClass)}>{titleText}</h2>
        </div>
    );
};

export default SectionTitleThree;
