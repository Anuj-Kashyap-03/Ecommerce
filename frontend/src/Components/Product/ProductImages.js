import React, {  useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import 'swiper/swiper.min.css'; // core Swiper
import 'swiper/swiper-bundle.css';
import "./ProductImages.scss"

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper";

export default function ProductImages({ images }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        spaceBetween={10}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Thumbs]}
        className="mySwiper2"
      >
        {images.map((ele, ind) => (
          <SwiperSlide key={`${ind}+"jkj`} >
            <img src={`${ele.url}`} alt={`${ind}`} />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {images.map((ele, ind) => (
          <SwiperSlide key={`${ind}+"jj`}>
            <img src={`${ele.url}`} alt={`${ind}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
