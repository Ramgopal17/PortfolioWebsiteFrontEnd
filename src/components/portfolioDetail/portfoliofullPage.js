import React, { useEffect } from "react";
import PortfolioSidebar from "../portfolioSidebar/portfolioSidebar.js";
import { ShimmerThumbnail } from "react-shimmer-effects";
import globalEnv from "../../api/globalenv.js";
import showdown from "showdown";
import { Link, useNavigate } from "react-router-dom";
import mainSiteUrl from "../../api/mainSiteUrl.js";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./portfoliofullPage.css";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import NoImge from "../../images/noImage.jpg";
const PortfolioFullPage = (props) => {
  const CustomPrevArrow = ({ onClick }) => (
    <button className="custom-arrow custom-prev-arrow" onClick={onClick}>
      <FaAngleLeft size={48} />
    </button>
  );

  const CustomNextArrow = ({ onClick }) => (
    <button className="custom-arrow custom-next-arrow" onClick={onClick}>
      <FaAngleRight size={48} />
    </button>
  );
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { project } = props;

  const nav = useNavigate();
  const settings = {
    dots: true,
    arrows: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  return (
    <section className="wpo-blog-pg-section pt-25 pb-25">
      <div className="container">
        <div className="row">
          <div className={`col col-lg-8 col-12 ${props.blRight}`}>
            <button
              className="back-btn"
              onClick={() => nav(-1)}
              style={{ display: "flex", gap: "5px" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-arrow-left"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
                />
              </svg>{" "}
              <div>Back</div>
            </button>
            <div className="wpo-blog-content">
              {project.length ? (
                project.map((item) => (
                  <div className="post" key={item.id}>
                    <div style={{ borderRadius: "30px", fontSize: "24px" }}>
                      <div className="title-and-category-title">
                        <span className="title-on-detail-page">
                          {item.attributes.Title}
                        </span>
                        <span
                          className={`${
                            item?.attributes?.Category?.data?.attributes?.Title
                              ? "category-title-on-detail-page"
                              : ""
                          }`}
                        >
                          {item?.attributes?.Category?.data?.attributes?.Title}
                        </span>
                   
                      </div>

                      <div className="detail-image">
                        <Slider {...settings}>
                          {item?.attributes?.Image?.data.map((image, index) => (
                            <div
                              key={index}
                              style={{
                                width: "100%",
                                maxWidth: "100%",
                                height: "auto",

                                overflow: "hidden",
                                borderRadius: "10px",
                              }}
                            >
                              <img
                                src={`${globalEnv.api}${image?.attributes?.url}`}
                                alt={
                                  item?.attributes?.Image.data[0].attributes.name
                                    .replace(/\.[^.]+$/, "")
                                    .slice(0, 30) + "..."
                                }
                                key={index}
                                style={{
                                  width: "100%",

                                  objectFit: "cover",
                                  borderRadius: "10px",
                                }}
                                onError={(e) => {
                                  e.target.src = `${NoImge}`;
                                  e.target.classList.add("error-image");
                                }}
                              />
                            </div>
                          ))}
                        </Slider>
                      </div>
                    </div>
                    <div className="entry-meta"></div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <h1 style={{ fontSize: "24px", color: "#c9c9ce" }}>
                        Overview
                      </h1>
                    </div>

                    <div className="entry-details">
                      <div className="star-pattern">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: new showdown.Converter({
                              extensions: [
                                {
                                  type: "lang",
                                  filter: (t) =>
                                    t.replace(
                                      /!\[([^\]]+)]\(([^)]+)\)/g,
                                      (m, a, s) =>
                                        s.startsWith("http")
                                          ? m
                                          : `![${a}](${globalEnv.api}${s})`
                                    ),
                                },
                              ],
                            }).makeHtml(item?.attributes?.Description || ""),
                          }}
                        ></div>
                      </div>
                    </div>

                    <div className="pt-istop-btn-wrapper text-center mt-30 ">
                      <Link to={`${mainSiteUrl.url}/contact`} target="_blank">
                        <button className="tp-common-btn text-center ">
                          <span className="text-center button-space">
                            <span>Contact Us</span>
                          </span>
                        </button>
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className={`col col-lg-8 col-12 ${props.blRight}`}>
                  <div className="wpo-blog-content">
                    {project.length ? (
                      project.map((item) => (
                        <div className="post" key={item.id}>
                          <div
                            style={{ borderRadius: "30px", fontSize: "24px" }}
                          >
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              <h3>
                                {
                                  item?.attributes?.Category?.data?.attributes
                                    ?.Title
                                }
                              </h3>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              <h1
                                className="manageHeading"
                                style={{ fontWeight: "400" }}
                              >
                                {item.attributes.Title}
                              </h1>
                            </div>
                            <Slider {...settings}>
                              {item?.attributes?.Image?.data.map(
                                (image, index) => (
                                  <div
                                    key={index}
                                    style={{
                                      width: "100%",
                                      maxWidth: "100%",
                                      height: "auto",
                                      maxHeight: "50vh",
                                      overflow: "hidden",
                                      borderRadius: "10px",
                                    }}
                                  >
                                    <img
                                      src={`${globalEnv.api}${image?.attributes?.url}`}
                                      alt=""
                                      key={index}
                                      style={{
                                        width: "100%",
                                        height: "50vh",
                                        objectFit: "cover",
                                        borderRadius: "10px",
                                      }}
                                    />
                                  </div>
                                )
                              )}
                            </Slider>
                          </div>
                          <div className="entry-meta"></div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <h1 className="manageHeading">Overview</h1>
                          </div>
                          <div className="entry-details">
                            <div className="star-pattern">
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: (
                                    item?.attributes?.Description || ""
                                  ).replace(/src="(\/[^"]+)"/g, (match, src) =>
                                    src.startsWith("http")
                                      ? match
                                      : `src="${globalEnv.api}${src}"`
                                  ),
                                }}
                              ></div>
                            </div>
                          </div>
                          <div className="pt-istop-btn-wrapper text-center mt-30">
                            <Link
                              to={`${mainSiteUrl.url}/contact`}
                              target="_blank"
                            >
                              <button className="tp-common-btn text-center">
                                <span className="text-center button-space">
                                  <span>Contact Us</span>
                                </span>
                              </button>
                            </Link>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div>
                      <ShimmerThumbnail
                      height={350}
                      rounded
                      className={"coloring"}
                    />
                      <p>
                      <span id="descOnDetailPage">
                        {[...Array(30)].map((item, index) => (
                          <span key={index} className="line shimmer"></span>
                        ))}
                      </span>
                    </p>
                    </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          <PortfolioSidebar blLeft={props.blLeft} />
        </div>
      </div>
    </section>
  );
};

export default PortfolioFullPage;
