import { Autoplay, Navigation, Pagination, A11y } from "swiper";
import { SwiperProps, Swiper, SwiperSlide } from "swiper/react";
import React, {
  HTMLAttributes,
  HtmlHTMLAttributes,
  PropsWithChildren,
} from "react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Props {
  settings: SwiperProps;
  className: string;
}

export default function Slider({
  settings,
  children,
  className,
}: PropsWithChildren<Props>) {
  return (
    <Swiper
      className={className}
      modules={[Autoplay, Navigation, Pagination, A11y]}
      {...settings}
    >
      {children}
    </Swiper>
  );
}
