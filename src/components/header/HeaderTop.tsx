import clsx from 'clsx';
import React from 'react';

interface HeaderTopProps {
    borderStyle: string;
}
const HeaderTop: React.FC<HeaderTopProps> = ({ borderStyle }) => {
    // TODO: currency
    // const currency = useSelector((state) => state.currency);

    return (
        <div
            className={clsx(
                'header-top-wap',
                borderStyle === 'fluid-border' && 'border-bottom'
            )}
        >
            {/*<LanguageCurrencyChanger currency={currency} />*/}
            <div className="header-offer">
                <p>
                    Free delivery on order over {/*<span>*/}
                    {/*    {currency.currencySymbol +*/}
                    {/*        (200 * currency.currencyRate).toFixed(2)}*/}
                    {/*</span>*/}
                </p>
            </div>
        </div>
    );
};

export default HeaderTop;
