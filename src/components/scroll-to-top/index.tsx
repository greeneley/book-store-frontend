import useScrollTop from '@hooks/internal/useScrollTop';
import React from 'react';

const ScrollToTop: React.FC = () => {
    const { stick, onClickHandler } = useScrollTop();

    if (stick) {
        return (
            <button
                aria-label="Scroll to top"
                type="button"
                className="scroll-top"
                onClick={onClickHandler}
            >
                <i className="fa fa-angle-double-up"></i>
            </button>
        );
    }
    return null;
};

export default ScrollToTop;
