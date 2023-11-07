import React from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
const Paginate = ({
  postsPerPage,
  currentPage,
  totalHotels,
  handlePaginate,
  handleNextPage,
  handlePreviousPage,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalHotels / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="mt-4">
      <ul className="flex flex-wrap items-center justify-center">
        <li
          onClick={handlePreviousPage}
          className="ml-3 rounded-sm border border-[#FFE569] bg-white text-[#FFE569] hover:bg-[#FFE569] hover:text-white cursor-pointer text-center font-semibold px-2 py-1 w-[40px]"
        >
          <GrFormPrevious size={20} />
        </li>
        {pageNumbers.map((item) => (
          <li
            key={item}
            onClick={() => handlePaginate(item)}
            className={` ${
              currentPage === item
                ? "bg-[#FFE569] text-white"
                : "bg-white text-[#FFE569] hover:bg-red-400"
            } rounded-sm ml-3 border border-[#FFE569]  hover:text-red-300 text-xl cursor-pointer text-center font-semibold px-3 w-[40px]`}
          >
            {item}
          </li>
        ))}
        <li
          onClick={handleNextPage}
          className="rounded-sm ml-3 border border-[#FFE569] bg-white text-[#FFE569] hover:bg-[#FFE569] hover:text-white cursor-pointer text-center font-semibold px-2 py-1 w-[40px] transition-all"
        >
          <GrFormNext size={20} />
        </li>
      </ul>
    </div>
  );
};

export default Paginate;
