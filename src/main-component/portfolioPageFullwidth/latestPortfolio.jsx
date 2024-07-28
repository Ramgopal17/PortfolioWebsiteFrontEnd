import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import globalenv from "../../api/globalenv";
import NoImge from "../../images/noImage.jpg";

function LatestPortfolio() {
  const [portfolios, setPortfolios] = useState([]);

  useEffect(() => {
    fetch(
      `${globalenv.api}/api/product-names?sort[0]=createdAt:desc&populate=*`
    )
      .then((response) => response.json())
      .then((data) => {
        setPortfolios(data.data);
      })
      .catch((error) => console.error(error));
  }, []);
  return (
    <>
      <style jsx="true">
        {`
          .portfolioCardWrapper {
            background-color: #1e2222;
            border-radius: 8px;
            border: 2px solid #3d3d3d;
            padding: 12px 5px;
          }
     .portfolioCardWrapper:hover{
      border: 2px solid #F47F20 !important;
     }
        `}
      </style>
      <div className="container">
        <div className=" recent-post-widget">
          <h3
            style={{ fontWeight: "400", color: "rgb(201, 201, 206)" }}
            className="mb-25"
          >
            Latest Portfolio
          </h3>
          <div className=" row">
            {portfolios.slice(0, 3).map((portfolio, i) => (
              <div key={i} className="mb-25 col-lg-4 col-md-6 linkHovering">
                <Link
                  to={`/portfolio-single-fullwidth/${portfolio?.attributes?.Slug}`}
                  onClick={() => window.scrollTo(0, 0)}
                >
                  <div className="portfolioCardWrapper">
                    <div className=" d-flex align-items-center">
                      <div
                        className="img-holder mr-10"
                        style={{ wordBreak: "break-word" }}
                      >
                        <img
                          src={`${globalenv.api}${portfolio?.attributes?.Image?.data[0]?.attributes?.url}`}
                          alt={portfolio?.attributes?.Title}
                          style={{ aspectRatio: "3/2", opacity: "1" }}
                          onError={(e) => {
                            e.target.src = `${NoImge}`;
                            e.target.classList.add("error-image");
                          }}
                          width={80}
                        />
                      </div>
                      <div className="details">
                        <p className="mb-0">
                          {
                            portfolio?.attributes?.Category?.data?.attributes
                              ?.Title
                          }
                        </p>
                        <h4 className="mb-0">
                          <span className="cutofftext">
                            {portfolio?.attributes?.Title?.trim()}
                          </span>
                        </h4>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default LatestPortfolio;
