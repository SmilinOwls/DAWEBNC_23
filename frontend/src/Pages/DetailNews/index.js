import React, { useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link, useHistory } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import "./style.css";
import { quoteNewsData } from "../../utils/fakeData";
import { getDetailBlog } from "../../Actions/BlogsAction";

const DetailNews = () => {
  const { detailBlog, isLoading } = useSelector((state) => state.detailBlogs);
  const { blogs } = useSelector((state) => state.blogs);
  const { newId } = useParams();
  console.log(detailBlog);

  const history = useHistory();
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    dispatch(getDetailBlog(newId));
  }, [newId]);

  const handleClick = (item) => {
    history.push(`/new/${item._id}`);
  };

  return (
    <>
      {isLoading && <div>Loading ...</div>}
      <section>
        <section className="common_detailnews">
          <Container>
            <Row>
              <Col lg="12">
                <h2>Lastest News</h2>
              </Col>
            </Row>
          </Container>
        </section>
        <Container>
          <Row>
            <Col lg={8} md={6} sm={12}>
              <div className="mx-4">
                <p className="text-[16px] text-gray-500 font-normal leading-3">
                  Published: {detailBlog && detailBlog.createdAt?.substr(0, 10)}
                </p>
                <h2 className="text-display-lg-semi-bold mt-3 text-center">
                  {detailBlog.title}
                </h2>
                <div className="mt-4 flex flex-col items-center justify-center">
                  <img
                    src={detailBlog.image}
                    alt="news"
                    width="100%"
                    className="h-[350px] mb-4"
                  />

                  {detailBlog.detailPhotos &&
                    detailBlog.detailPhotos?.length !== 0 && (
                      <img
                        src={detailBlog.detailPhotos[0]}
                        alt="news"
                        width="100%"
                        className="h-[350px] mb-4"
                      />
                    )}
                  <p>
                    <div
                      dangerouslySetInnerHTML={{ __html: detailBlog.fullText }}
                    ></div>
                  </p>
                </div>
                <div className="mt-4">
                  <Row>
                    <Col lg="12">
                      <div className="section__quote">
                        {quoteNewsData[Math.floor(Math.random() * 20)]}
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
            <Col lg={4} md={6} sm={12}>
              <p className="text-[25px] font-medium leading-3">Popular Blogs</p>
              {blogs.slice(0, 7).map((item, index) => (
                <div>
                  <a
                    onClick={() => handleClick(item)}
                    key={item._id}
                    className="mt-3 no-underline cursor-pointer"
                  >
                    {index + 1}. {item.title}
                  </a>
                </div>
              ))}
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default DetailNews;
