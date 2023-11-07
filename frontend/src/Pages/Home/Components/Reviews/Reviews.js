import React from 'react';
import Slider from 'react-slick'
import ava01 from '../../../../Assets/images/pic-1.png'
import ava02 from '../../../../Assets/images/pic-2.png'
import ava03 from '../../../../Assets/images/pic-3.png';
import ava04 from '../../../../Assets/images/ava-2.jpg'
import ava05 from '../../../../Assets/images/ava-1.jpg'
const Reviews = () => {
    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        speed: 1000,
        swipeToSlide: true,
        autoplaySpeed: 2000,
        slidesToShow: 3,

        responsive : [
            {
                breakpoint: 992,
                settings : {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    dots: true,
                    infinite: true,
                },
            },
            {
                breakpoint: 576,
                settings : {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            }
        ]
    }
  return (
    <Slider {...settings}>
    <div className='testimonial py-4 px-3'>
        <p>
        Very caring, helpful-room very clean-breakfast wonderful, thankyou 
        </p>

        <div className='d-flex align-items-center gap-4 mt-3'>
            <img src={ava01} className='w-25 h-25 rounded-2' alt="" />
            <div>
                <h6 className='mb-0 mt-3'>John Doe</h6>
                <p>Customer</p>
            </div>
        </div>

    </div>

    <div className='testimonial py-4 px-3'>
        <p>
          Great stay. Wonderful room, super beakfast, warm & inviting hosts. We'll definitely be back! Thanks
        </p>

        <div className='d-flex align-items-center gap-4 mt-3'>
            <img src={ava02} className='w-25 h-25 rounded-2' alt="" />
            <div>
                <h6 className='mb-0 mt-3'>Leah Franklin</h6>
                <p>Customer</p>
            </div>
        </div>

    </div>

    <div className='testimonial py-4 px-3'>
        <p>
        Thank you for this warm welcome. The rooms are incredibly comfortable and the breakfasts are a delight. Thank you to the owners for taking care of us
        </p>

        <div className='d-flex align-items-center gap-4 mt-3'>
            <img src={ava03} className='w-25 h-25 rounded-2' alt="" />
            <div>
                <h6 className='mb-0 mt-3'>Joseph Black</h6>
                <p>Customer</p>
            </div>
        </div>

    </div>

    <div className='testimonial py-4 px-3'>
        <p>
        A great place to stay, exceptionl service, views & location to downtown Queenstown. isha & Shashank were both wonderful & so helpful, highly recommended
        </p>

        <div className='d-flex align-items-center gap-4 mt-3'>
            <img src={ava05} className='w-25 h-25 rounded-2' alt="" />
            <div>
                <h6 className='mb-0 mt-3'>John Doe</h6>
                <p>Customer</p>
            </div>
        </div>

    </div>

    <div className='testimonial py-4 px-3'>
        <p>
        Very clean rooms, very good shower & bathroom. Very comfortable beds, very nice owners. Decoration of rooms & breakfast room nice. We would stay here again.
        </p>

        <div className='d-flex align-items-center gap-4 mt-3'>
            <img src={ava04} className='w-25 h-25 rounded-2' alt="" />
            <div>
                <h6 className='mb-0 mt-3'>Leah Franklin</h6>
                <p>Customer</p>
            </div>
        </div>

    </div>

</Slider>
  )
}

export default Reviews