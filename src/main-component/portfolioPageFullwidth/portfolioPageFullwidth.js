import React, { Fragment, useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import PortfolioFullPage from "../../components/portfolioDetail/portfoliofullPage.js";
import Scrollbar from "../../components/scrollbar/scrollbar";
import Footer from "../../components/footer/footer-12";
import { useParams } from "react-router-dom";
import globalEnv from "../../api/globalenv.js";
import LatestPortfolio from "./latestPortfolio.jsx";
const PortfolioPageFullwidth = () => {
  const [project, setProject] = useState([]);
  const { slug } = useParams();

  useEffect(() => {
   
    fetch(
      `${globalEnv.api}/api/product-names?publicationState=preview&filters[Slug][$eq]=${slug}&populate=*`
    )
      .then((response) => response.json())
      .then((data) => {
        setProject(data.data);
      })
      .catch((error) => console.error(error));
  }, [slug]);

  return (
    <Fragment>
      <div style={{ backgroundColor: "#1e2222" }}>
        <Navbar />
      </div>
      <div className="theme-bg-black">
        <PortfolioFullPage
          blLeft={"d-none"}
          blRight={"col-lg-10 "}
          project={project}
        />
        <LatestPortfolio />
      </div>
      <Footer />
      <Scrollbar />
    </Fragment>
  );
};
export default PortfolioPageFullwidth;
