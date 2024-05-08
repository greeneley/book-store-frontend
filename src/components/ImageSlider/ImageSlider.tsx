// import React from 'react';
//
// export interface ImageSliderProps extends CarouselProps {
//     urls: Array<string>;
// }
//
// export const ImageSlider: React.FC<ImageSliderProps> = (props) => {
//     const { urls } = props;
//
//     return (
//         <Carousel data-bs-theme="dark" indicators={false}>
//             {urls.map((url: string, index) => {
//                 return (
//                     <Carousel.Item key={index}>
//                         <Image
//                             src={url}
//                             style={{
//                                 marginLeft: 'auto',
//                                 marginRight: 'auto',
//                                 display: 'flex'
//                             }}
//                         />
//                     </Carousel.Item>
//                 );
//             })}
//         </Carousel>
//     );
// };
