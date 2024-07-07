// import PropTypes from 'prop-types';
// import React, { Fragment } from 'react';
// import { useSelector } from 'react-redux';
// import ProductGridSingleTwo from '../../components/product/ProductGridSingleTwo';
// import { getProducts } from '../../helpers/product';
//
// interface ProductGridTwoProps {
//     sliderClassName: string;
//     spaceBottomClass: string;
//     colorClass: string;
//     titlePriceClass: string;
//     category: string;
//     type: string;
//     limit: number;
// }
// const ProductGridTwo: React.FC<ProductGridTwoProps> = ({
//     spaceBottomClass,
//     colorClass,
//     titlePriceClass,
//     category,
//     type,
//     limit
// }) => {
//     const { products } = useSelector((state) => state.product);
//     const currency = useSelector((state) => state.currency);
//     const { cartItems } = useSelector((state) => state.cart);
//     const { wishlistItems } = useSelector((state) => state.wishlist);
//     const { compareItems } = useSelector((state) => state.compare);
//     const prods = getProducts(products, category, type, limit);
//
//     return (
//         <Fragment>
//             {prods?.map((product) => {
//                 return (
//                     <div
//                         className="col-xl-3 col-md-6 col-lg-4 col-sm-6"
//                         key={product.id}
//                     >
//                         <ProductGridSingleTwo
//                             spaceBottomClass={spaceBottomClass}
//                             colorClass={colorClass}
//                             product={product}
//                             currency={currency}
//                             cartItem={cartItems.find(
//                                 (cartItem) => cartItem.id === product.id
//                             )}
//                             wishlistItem={wishlistItems.find(
//                                 (wishlistItem) => wishlistItem.id === product.id
//                             )}
//                             compareItem={compareItems.find(
//                                 (compareItem) => compareItem.id === product.id
//                             )}
//                             titlePriceClass={titlePriceClass}
//                         />
//                     </div>
//                 );
//             })}
//         </Fragment>
//     );
// };
//
// ProductGridTwo.propTypes = {
//     sliderClassName: PropTypes.string,
//     spaceBottomClass: PropTypes.string,
//     colorClass: PropTypes.string,
//     titlePriceClass: PropTypes.string,
//     category: PropTypes.string,
//     type: PropTypes.string,
//     limit: PropTypes.number
// };
//
// export default ProductGridTwo;
