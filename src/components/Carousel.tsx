import React, { FC } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import './Carousel.css'
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'
import { Product } from '.'

const Carousel: FC<{ data: any }> = ({ data }) => {
  const projects = [
    {
      id: 1,
      title: 'A business page',
      img:
        'https://www.seriouseats.com/thmb/lFQwEdCSP6Y-sVoGqQry-fd0iVw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/the-best-slow-cooked-italian-american-tomato-sauce-red-sauce-recipe-step-09-05ad7578f9d34a5092086ae959bea8a7.jpg',
    },
    {
      id: 2,
      title: 'A landing page',
      img:
        'https://www.seriouseats.com/thmb/lFQwEdCSP6Y-sVoGqQry-fd0iVw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/the-best-slow-cooked-italian-american-tomato-sauce-red-sauce-recipe-step-09-05ad7578f9d34a5092086ae959bea8a7.jpg',
    },
    {
      id: 3,
      title: 'Flower',
      img:
        'https://www.seriouseats.com/thmb/lFQwEdCSP6Y-sVoGqQry-fd0iVw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/the-best-slow-cooked-italian-american-tomato-sauce-red-sauce-recipe-step-09-05ad7578f9d34a5092086ae959bea8a7.jpg',
    },
    {
      id: 4,
      title: 'Earth',
      img:
        'https://www.seriouseats.com/thmb/lFQwEdCSP6Y-sVoGqQry-fd0iVw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/the-best-slow-cooked-italian-american-tomato-sauce-red-sauce-recipe-step-09-05ad7578f9d34a5092086ae959bea8a7.jpg',
    },
    {
      id: 5,
      title: 'Bus',
      img:
        'https://www.seriouseats.com/thmb/lFQwEdCSP6Y-sVoGqQry-fd0iVw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/the-best-slow-cooked-italian-american-tomato-sauce-red-sauce-recipe-step-09-05ad7578f9d34a5092086ae959bea8a7.jpg',
    },
    {
      id: 6,
      title: 'Cowboy',
      img:
        'https://www.seriouseats.com/thmb/lFQwEdCSP6Y-sVoGqQry-fd0iVw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/the-best-slow-cooked-italian-american-tomato-sauce-red-sauce-recipe-step-09-05ad7578f9d34a5092086ae959bea8a7.jpg',
    },
  ]
  return (
    <div>
      <Swiper
        className="swiper-container relative flex justify-center items-end"
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        pagination={{ el: '.swiper-pagination', clickable: true }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
          enabled: true,
        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
      >
        {data.map((item: any) => (
          <SwiperSlide key={item._id} className="swiper-item max-h[15rem]">
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
  )
}

export default Carousel
