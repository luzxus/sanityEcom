import React, { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./Carousel.css";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { Product } from ".";

const Carousel: FC<{ data: any }> = ({ data }) => {
  return (
    <div>
      <Swiper
        className="swiper-container relative flex justify-center items-end"
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        pagination={{ el: ".swiper-pagination", clickable: true }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
          enabled: true,
        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
      >
        {data.map((item: any) => (
          <SwiperSlide key={item._id} className="swiper-slide max-h[15rem]">
            <Product product={item} />
          </SwiperSlide>
        ))}
        <div className="slider-controller absolute bottom-[10rem] flex justify-between w-full">
          <div className="swiper-button-prev slider-arrow">
            <AiOutlineArrowLeft />
          </div>
          <div className="swiper-button-next slider-arrow">
            <AiOutlineArrowRight />
          </div>
          <div className="swiper-pagination"></div>
        </div>
      </Swiper>
    </div>
  );
};

export default Carousel;
