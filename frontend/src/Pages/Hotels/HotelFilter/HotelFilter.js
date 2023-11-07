import React, {useContext} from 'react';
import "./HotelFilter.css"
import {useDispatch} from 'react-redux';
import {PrevFilterContext} from '../../../context/PrevFilterContext';
import {getHotelsFilter} from '../../../Actions/HotelsAction'
import Checkbox from '../../../Components/Checkbox/Checkbox'
const ratingOptions = [
    { content: 'Under 5', rate: 5, option: "lt" },
    { content: 'Above 4', rate: 4, option: "gte" },
    { content: 'Under 3', rate: 3, option: "lt"},
    { content: 'Above 3', rate: 2.9, option: "gte"},
];
const HotelFilter = () => {
    const {handlePrevious} = useContext(PrevFilterContext);
    const {selectedRadio} = handlePrevious();
    const dispatch = useDispatch();

    const handleOptionChange = (e) =>{
        const {setSelectedRadio} = handlePrevious();
        setSelectedRadio(e.target.value);
      };
      const onFilterByRate = (params, option) => {
        const {prevRate, setPrevRate} = handlePrevious('rate', params);
        if(prevRate !== params){
            dispatch(getHotelsFilter(params, option));
        }
        setPrevRate(params)
    }
  return (
    <div className='shop-filters'>
         <h2 className='shop-filters__title'>Rate</h2>
   <form className='shop-filters__form'>
    {ratingOptions.map(({ content, rate, option }) => (
      <Checkbox
        key={content}
        handleOptionClick={() => onFilterByRate(rate, option)}
        checked={selectedRadio === content}
        handleOptionChange={handleOptionChange}
        value={content}
        content={content}
      />
    ))}
  </form>
    </div>
  )
}

export default HotelFilter