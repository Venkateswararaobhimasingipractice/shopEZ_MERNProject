import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

function HomeCarousel() {
    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "10%",
        slidesToShow: 1,
        dots: true,
        autoplay: true,
        speed: 500,
        autoplaySpeed: 2000,
        cssEase: "linear",
        arrows: false
    };
    return (
        <div className="slider-container" >
            <Slider {...settings}>
                <div className='p-5' >
                    <img className=' lg:h-[350px] md:h-[350px] h-[150px] lg:w-[97%] md:w-[97%] w-full' src="https://marketplace.canva.com/EAFED0hv9G0/1/0/1600w/canva-blue-pink-modern-special-offer-sale-banner-J5VkNReQ8WA.jpg" alt="" />
                </div>
                <div className='p-5' >
                    <img className=' lg:h-[350px] md:h-[350px] h-[150px] lg:w-[97%] md:w-[97%] w-full' src="https://images.template.net/108414/fashion-sale-banner-template-85svg.jpg" alt="" />
                </div>
                <div className='p-5' >
                    <img className=' lg:h-[350px] md:h-[350px] h-[150px] lg:w-[97%] md:w-[97%] w-full' src="https://t4.ftcdn.net/jpg/03/92/21/09/360_F_392210928_JgmPZsGuKSye5FqOoCyjSGRTF7fJIgOS.jpg" alt="" />
                </div>
                <div className='p-5' >
                    <img className=' lg:h-[350px] md:h-[350px] h-[150px] lg:w-[97%] md:w-[97%] w-full' src="https://img.freepik.com/premium-vector/big-summer-sale-banner-template-product-podium-with-summer-elements_560226-857.jpg" alt="" />
                </div>
                <div className='p-5' >
                    <img className=' lg:h-[350px] md:h-[350px] h-[150px] lg:w-[97%] md:w-[97%] w-full' src="https://static.vecteezy.com/system/resources/previews/002/294/833/non_2x/e-commerce-promotion-web-banner-design-free-vector.jpg" alt="" />
                </div>
                <div className=' p-5' >
                    <img className='lg:h-[350px] md:h-[350px] h-[150px]  lg:w-[97%] md:w-[97%] w-full'  src="https://mindstacktechnologies.com/wordpress/wp-content/uploads/2018/01/ecommerce-banner.jpg" alt="" />
                </div>

            </Slider>
        </div>
    );
}

export default HomeCarousel;

