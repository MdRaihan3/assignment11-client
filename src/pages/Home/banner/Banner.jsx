import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './swiperStyles.css';
import Lottie from 'lottie-react';
import Design from '../../../utility/lottie.json';
import { motion } from 'framer-motion';
const Banner = () => {
    const content = <>
        <div className='inline-block'>
            <div className=' w-16 h-16 md:mt-10'>
                <Lottie animationData={Design}></Lottie>
            </div>
            <h1 className=' py-4 text-3xl font-bold'>Welcome to RFood&Life</h1>
        </div>
        <p className=' text-xl'>RFood&Life is an online platform connecting organizations with surplus food to communities <br /> in need by moving donations of any type and size, large or small, bulk or <br /> retail, prepared or frozen!</p>
    </>
    return (
        <motion.div
        initial={{opacity:0}}
        animate={{opacity:1}}
        exit={{opacity:0}}
        transition={{duration:3}}
        >
            <Swiper
                spaceBetween={0}
                slidesPerView={1}
                effect={'fade'}
                navigation={true}
                pagination={{
                    clickable: true,
                }}
                modules={[EffectFade, Navigation, Pagination]}
                className="mySwiper">
                <SwiperSlide id='banner1' className=' text-white text-center'>
                    {content}
                </SwiperSlide>
                <SwiperSlide id='banner2' className=' text-white text-center'>
                    {content}
                </SwiperSlide>
                <SwiperSlide id='banner3' className=' text-white text-center'>
                    {content}
                </SwiperSlide>
            </Swiper>
        </motion.div>
    );
};

export default Banner;