import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./portfolio.css";
import { Link, useParams } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import globalenv from "../../api/globalenv";
import NoImge from "../../images/noImage.jpg";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import logo2 from "../../images/Metapercept_footer_logo2-black.svg";
import NoData from "../../images/no-data.png";
const PortfolioItemsArea = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [project, setProject] = useState([]);
  const [visibleItems, setVisibleItems] = useState(9);
  const [loadMoreVisible, setLoadMoreVisible] = useState(true);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `${globalenv.api}/api/product-names?sort[0]=createdAt:desc&populate=*`
    )
      .then((response) => response.json())
      .then((data) => {
        setProject(data.data);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    fetch(`${globalenv.api}/api/categories?populate=*`)
      .then((response) => response.json())
      .then((data) => {
        setCategory(data.data);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);
  let params = useParams();

  const categories = [
    "All",
    ...new Set(category.map((item) => item?.attributes?.Title)),
  ];

  const filterItems = (cateItem) => {
    setActiveCategory(cateItem);
    setVisibleItems(9);
  };
  useEffect(() => {
    const totalItems =
      activeCategory === "All" || undefined
        ? project.length
        : project.filter(
            (item) =>
              item?.attributes?.Category?.data?.attributes?.Title ===
              activeCategory
          ).length;

    if (totalItems <= 9) {
      setLoadMoreVisible(false);
    } else {
      setLoadMoreVisible(true);
    }
  }, [activeCategory, project]);

  const loadMoreItems = () => {
    const totalItems =
      activeCategory === "All"
        ? project.length
        : project.filter(
            (item) =>
              item?.attributes?.Category?.data?.attributes?.Title ===
              activeCategory
          ).length;

    if (visibleItems + 9 >= totalItems) {
      setVisibleItems(totalItems);
      setLoadMoreVisible(false);
    } else {
      setVisibleItems(visibleItems + 9);
      setLoadMoreVisible(true);
    }
  };

  useEffect(() => {
    if (params.slug === undefined) {
      setActiveCategory("All");
    } else {
      setActiveCategory(params.slug);
    }
  }, [params.slug]);

  const filteredItems =
    activeCategory === "All" || activeCategory === undefined
      ? project.slice(0, visibleItems)
      : project
          .filter(
            (item) =>
              item?.attributes?.Category?.data?.attributes?.Title ===
              activeCategory
          )
          .slice(0, visibleItems);

  return (
    <>
      <style>{`
        .it-blog-wrapper .ca-service__item-title a {
          overflow: hidden;
          display: -webkit-box !important;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
      `}</style>

      <div className="tp-portfolio-page-area pt-25 pb-25 theme-bg-black">
        <div className="container">
          <div className="tp-portfolio-header mb-30">
            <div className="row d-flex justify-content-center">
              <div className="col-12">
                <div className="tp-pf-btn-group text-center">
                  {categories.map((cate, i) => (
                    <Link
                      to={cate === "All" ? "/" : `/${encodeURIComponent(cate)}`}
                      key={i}
                    >
                      <button
                        onClick={() => filterItems(cate)}
                        className={
                          (cate === "All" && params.slug === undefined) ||
                          (params.slug !== undefined && cate === params.slug)
                            ? "active"
                            : ""
                        }
                      >
                        {cate}
                      </button>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <AnimatePresence>
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="row tp-portfolio-isotop-active justify-content-center"
            >
              {loading ? (
                [...Array(9)].map((_, index) => (
                  <div
                    className={`col-12 col-md-6 col-xl-4 pt-0 pl-3 pr-3 pb-0 `}
                    key={index}
                  >
                    <SkeletonTheme baseColor="#202020" highlightColor="#444">
                      <p>
                        <Skeleton height={"35vh"} />
                      </p>
                    </SkeletonTheme>
                  </div>
                ))
              ) : filteredItems.length !== 0 ? (
                filteredItems.map((item, i) => (
                  <div
                    key={i}
                    className={`col-12 col-md-6 col-xl-4 tp-portfolio-item mb-15 w-img ${item.cls}`}
                  >
                    <Link
                      className="highlight"
                      to={`/portfolio-single-fullwidth/${item?.attributes?.Slug}`}
                      onClick={() =>
                        setActiveCategory(
                          item?.attributes?.Category?.data?.attributes?.Title
                        )
                      }
                    >
                      <div className="pf-item-wrapper p-relative">
                        <div className="pf-single-item ">
                          <div className="layout">
                            <div className="title-logo">
                              {/* <div
                                className={`${
                                  item?.attributes?.Category?.data?.attributes
                                    ?.Title
                                    ? "category-title"
                                    : ""
                                }`}
                              >
                                {
                                  item?.attributes?.Category?.data?.attributes
                                    ?.Title
                                }
                              </div> */}

                              <div className="image-logo">
                                <img
                                  src={logo2}
                                  alt=""
                                  style={{
                                    width: "80px",
                                    height: "24px",
                                    borderRadius: "0px",
                                  }}
                                />
                              </div>
                            </div>

                            <div
                              className="div-image1"
                              style={{ position: "relative" }}
                            >
                              <img
                                src={`${globalenv.api}${item?.attributes?.Image?.data[0]?.attributes?.url}`}
                                alt={item?.attributes?.Title}
                                style={{ aspectRatio: "3/2", opacity: "1" }}
                                onError={(e) => {
                                  e.target.src = `${NoImge}`;
                                  e.target.classList.add("error-image");
                                }}
                              />
                            </div>
                            <div className="heading-center">
                              <h3
                                id="cutoffText"
                                style={{
                                  zIndex: "99",
                                }}
                                className="titleWidth"
                              >
                                {item?.attributes?.Title?.trim()}
                              </h3>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                
                  </div>
                ))
              ) : (
                <div className="text-center no-data-message">
                  <img
                    src={NoData}
                    className="no-data-icon"
                    style={{
                      width: "40vh",
                      height: "40vh",
                      margin: "0 auto",
                    }}
                    alt="nodata"
                  />

                  <center
                    className="no-data-text"
                    style={{ color: "white", fontSize: "24px" }}
                  >
                    Oops! No Projects in this Category .
                  </center>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
          {loadMoreVisible && (
            <div className="loadMoreDiv pt-istop-btn-wrapper text-center mt-30 ">
              <button
                className="tp-common-btn text-center "
                onClick={loadMoreItems}
              >
                <span className="text-center button-space">
                  <span>Load More</span>
                  <span>
                    <AiOutlinePlus />
                  </span>
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PortfolioItemsArea;
