import React from 'react';
import list from "./dataList";
import Accordian from './Accordian';

const FAQ = () => {
    const displayData = list.map((faqData, index) => <Accordian title={faqData.question} key={index}>
    {faqData.answer}
</Accordian>)

  return (
    <>
    <div className="container my-3 py-4">
        {displayData}
    </div>
</>
  )
}
export default FAQ
