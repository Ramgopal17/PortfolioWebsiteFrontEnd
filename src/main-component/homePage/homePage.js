import React, { Fragment } from "react";
import { Container } from "react-bootstrap";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/footer-12";
import Hero from "../../components/hero/hero";
import "./homePage.css";

import Scrollbar from "../../components/scrollbar/scrollbar";

import PortfolioItemsArea from "../../components/portfolio/portfolio-items-area";
const HomePage = () => {
  return (
    <Fragment>
      <div className="theme-bg-black">
        <Navbar hclass={"wpo-header-style-1"} topbarNone={"topbar-none"} />
      </div>
      <Hero />
      <div className="theme-bg-black">
        <Container>
          <PortfolioItemsArea />
          <div className="custom-spacing"></div>
        </Container>
      </div>
      <Footer />

      <Scrollbar />
    </Fragment>
  );
};

export default HomePage;
