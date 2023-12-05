import React, {useEffect} from 'react'
import "./FeatureSite.css";
import Slider from 'react-slick';
import {useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {getSites} from '../../../../Actions/SitesAction'

const FeatureSites = () => {
    const {sites, isLoading} = useSelector((state) => state.sites);
    const dispatch = useDispatch();
    const history = useHistory()
    const handleToDetail = (id) => {
      history.push(`/site/${id}`);
    };

    useEffect(() => {
        dispatch(getSites())
    }, [])
    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        speed: 1000,
        swipeToSlide: true,
        autoplaySpeed: 2000,
        slidesToShow: 4,

        responsive : [
            {
                breakpoint: 992,
                settings : {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    dots: true,
                    //infinite: true,
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
    <div className='sitesContainer'>
        <Slider {...settings}>
        {sites.map((item) => (
              <div className="featuredItem" onClick={() => handleToDetail(item._id)} key={item._id}>
              <img
                src={item.photo}
                width={400}
                height={109}
                alt="site-logo"
                className="featuredImg"
                style={{cursor: "pointer", borderRadius: "50%", width: "200px", height: "200px"}}
              />
              <div className="featuredTitles" style={{marginTop: "10px"}}>
                <h3 style={{paddingLeft: "30px", fontSize: "22px"}}>{item.name}</h3>
              </div>
            </div>
        ))}
        </Slider>
    </div>
    
  )
}

export default FeatureSites