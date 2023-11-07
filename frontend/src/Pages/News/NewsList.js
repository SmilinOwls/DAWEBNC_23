import React, { useEffect, useState } from "react";
import "./NewsList.css";
import {Row, Col } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { getBlogs } from "../../Actions/BlogsAction";
import NewsCard from "./NewsCard";

const NewsList = () => {
  const [noOfEle, setNoOfEle] = useState(8);
  const { blogs, isLoading } = useSelector((state) => state.blogs);
  const dispatch = useDispatch();
  const dataSlice = blogs.slice(0, noOfEle);

  const handleLoadMore = () => {
    setNoOfEle(noOfEle + noOfEle);
  };

  useEffect(() => {
    dispatch(getBlogs());
  }, []);
  return (
    <>
      {isLoading && (
        <div style={{ fontSize: "25px", color: "red", fontWeight: 700 }}>
          Loading...
        </div>
      )}
      <div className="newsList">
        <Row>
          {dataSlice.map((item) => (
            <Col key={item._id} lg="6" md="12" sm="12" className="mb-4">
              <NewsCard news={item} />
            </Col>
          ))}
        </Row>
        <button
          className="btn btn-primary d-block w-100"
          onClick={() => handleLoadMore()}
        >
          View more
        </button>
      </div>
    </>
  );
};

export default NewsList;
