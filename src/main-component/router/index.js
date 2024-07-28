

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Homepage from "../homePage/homePage";

import PortfolioPageFullwidth from "../portfolioPageFullwidth/portfolioPageFullwidth";
import ErrorPage from "../errorPage/errorPage";


const ScrollRestorationComponent = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/:slug" element={<Homepage/>} />
          <Route path="/home/:slug" element={<Homepage />} />


          <Route path="/home" element={<Homepage />} />
          <Route
            path="portfolio-single-fullwidth/:slug"
            element={<PortfolioPageFullwidth />}
          />
            

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default ScrollRestorationComponent;
