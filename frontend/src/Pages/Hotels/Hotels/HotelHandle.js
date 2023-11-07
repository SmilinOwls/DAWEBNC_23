import React, { useEffect, useState, useRef, useContext } from "react";
import "./HotelHandle.css";
import { useHistory, Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { MdOutlineExpandMore } from "react-icons/md";
import { PrevFilterContext } from "../../../context/PrevFilterContext";
import { useDispatch, useSelector } from "react-redux";
import { filterHotelBySort, searchHotel } from "../../../Actions/HotelsAction";
const dataFake = [
  {
    value: "Rate: Low to High",
    sort: "rate_lth",
  },
  {
    value: "Rate: High to Low",
    sort: "rate_htl",
  },
];
const HotelHandle = () => {
  const [isDrop, setIsDrop] = useState(false);
  const [keyword, setKeyWord] = useState("");
  const [show, setShow] = useState(false);
  const { handlePrevious } = useContext(PrevFilterContext);
  const { searchHotels } = useSelector((state) => state.hotels);
  const ref = useRef();

  const navigate = useHistory();
  const { selectedDrop, setSelectedDrop } = handlePrevious();
  const dispatch = useDispatch();

  const handleClickDrop = (e) => {
    const el = ref.current;

    if (el && el.contains(e.target)) {
      setIsDrop(!isDrop);
    } else {
      setIsDrop(false);
    }
  };

  const onFilterBySort = (sort, value) => {
    handlePrevious("sort");
    const action = filterHotelBySort(sort);
    dispatch(action);
    setSelectedDrop(value);
  };

  const handleKeyWord = (key) => {
    setKeyWord(key);
    setShow(true);
  };

  useEffect(() => {
    dispatch(searchHotel(keyword));
  }, [searchHotel, keyword]);

  const handleSearch = () => {
    console.log(searchHotels);
    navigate.push({ pathname: `/search?name=${keyword}` });
  };

  return (
    <>
    <div className="shop-handle">
      <form className="shop-handle__search">
        <input
          placeholder="Search your products"
          type="text"
          name="keyword"
          onChange={(e) => handleKeyWord(e.target.value)}
        />
        <button
          className="shop-handle__search-btn"
        >
          <AiOutlineSearch />
        </button>
      </form>
      <div className="shop-hanlde__drop">
        <div ref={ref} className="shop-handle__drop-current">
          <span>{selectedDrop}</span>
          <MdOutlineExpandMore onClick={handleClickDrop} />
        </div>
        <ul
          className={
            isDrop ? "shop-handle__drop-list drop" : "shop-handle__drop-list"
          }
          style={{ listStyleType: "none" }}
        >
          {dataFake.map((item, index) => (
            <li
              key={index}
              className="shop-handle__drop-item"
              onClick={() => onFilterBySort(item.sort, item.value)}
            >
              {item.value}
            </li>
          ))}
        </ul>
      </div>
      {show && keyword && searchHotels && searchHotels.length > 0 ? (
        <div className='shop-handle__searchResult bg-white'>
          {searchHotels.map((hotel) => (
            <Link
              key={hotel._id}
              to={`/hotel/${hotel._id}`}
              className="shop-handle__searchLink"
              onClick={() => setShow(false)}
            >
              <div className="flex">
                <div>
                  <img src={hotel.placePic} alt={hotel.name} width={50} height={50} style={{borderRadius: "50%"}}/>
                </div>
                <p className="ml-2">{hotel.name}</p>
              </div>
              <hr />
            </Link>
          ))}
        </div>
      ) : null}
    </div>
    
    </>
   
  );
};

export default HotelHandle;
