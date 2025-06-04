import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, Autoplay } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const images = [
  "https://assets-in.bmscdn.com/iedb/movies/images/mobile/listing/xxlarge/sikandar-et00394804-1742968262.jpg",
  "https://assets-in.bmscdn.com/iedb/movies/images/mobile/listing/xxlarge/l2-empuraan-et00305698-1742987562.jpg",
  "https://assets-in.bmscdn.com/iedb/movies/images/mobile/listing/xxlarge/chhaava-et00408691-1737623374.jpg",
  "https://assets-in.bmscdn.com/iedb/movies/images/mobile/listing/xxlarge/sikandar-et00394804-1742968262.jpg",
];

function CorouselList() {
  return (
    <div className="sm:w-[90%] max-w-[1305px] h-[500px] mx-auto overflow-hidden flex items-center justify-center">
      <Swiper
        navigation={true}
        pagination={{ clickable: true }}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        modules={[Navigation, Pagination, Scrollbar, Autoplay]}
        loop={true}
        className="w-full h-full"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index} className="flex justify-center items-center">
            <img
              src={src}
              alt={`Slide ${index}`}
              className="w-full h-full object-cover rounded-lg"
            />
          </SwiperSlide>
        ))}
      </Swiper>


    </div>
  );
}

export default CorouselList;
