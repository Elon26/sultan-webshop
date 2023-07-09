import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import "../../styles/mainSlider.scss";
import Slide from "./slide";
import Arrows from "./arrows";

const MainSlider = (): React.ReactElement => {
    const imgs = [
        "https://firebasestorage.googleapis.com/v0/b/sultan-68796.appspot.com/o/mainSlider%2F6.jpg?alt=media&token=3d7f72c7-348b-4f00-aecf-117707d81113",
        "https://firebasestorage.googleapis.com/v0/b/sultan-68796.appspot.com/o/mainSlider%2F2.jpg?alt=media&token=4a6a21d9-ecc9-40a5-9a27-67acc7ba92be",
        "https://firebasestorage.googleapis.com/v0/b/sultan-68796.appspot.com/o/mainSlider%2F3.jpg?alt=media&token=09769fbb-9a4d-49a3-b093-9a5f8da9479b",
        "https://firebasestorage.googleapis.com/v0/b/sultan-68796.appspot.com/o/mainSlider%2F4.jpg?alt=media&token=0dcb6add-f3c2-41d1-b00d-2f3de16b70bf",
        "https://firebasestorage.googleapis.com/v0/b/sultan-68796.appspot.com/o/mainSlider%2F5.jpg?alt=media&token=b2bf7070-eacf-49f4-b472-66780016a795"
    ];

    return (
        <div className="mainSlider">
            <Swiper
                modules={[Navigation, Autoplay, Pagination]}
                spaceBetween={0}
                slidesPerView={1}
                centeredSlides={true}
                loop={true}
                navigation={false}
                pagination={{ clickable: true }}
                autoplay={{
                    delay: 7000,
                    disableOnInteraction: false
                }}
            >
                {imgs.map(img => (
                    <SwiperSlide key={img + Date.now().toString()}>
                        <Slide img={img} />
                    </SwiperSlide>
                ))}
                <Arrows />
            </Swiper>
        </div >
    );
};

export default MainSlider;
