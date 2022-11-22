import React, { HTMLAttributes } from "react";
import { SwiperProps, SwiperSlide } from "swiper/react";
import Slider from "./Slider";

export default function Carousel({
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  const settings: SwiperProps = {
    slidesPerView: 1,
    autoplay: {
      delay: 5000, // 5 seconds
      disableOnInteraction: false,
    },
    loop: true,
    navigation: true,
    pagination: {
      clickable: true,
    },
  };

  return (
    <Slider {...props} settings={settings}>
      {children}
    </Slider>
  );
}
