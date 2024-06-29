import { useEffect, useState } from 'react';

const useScrollTop = () => {
    const [stick, setStick] = useState(false);
    const onClickHandler = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        const scrollHandler = () => {
            const scrollPos = window.scrollY;
            setStick(scrollPos > 300);
        };

        window.addEventListener('scroll', scrollHandler);

        return () => {
            window.removeEventListener('scroll', scrollHandler);
        };
    }, [stick]);

    return { stick, onClickHandler };
};

export default useScrollTop;
