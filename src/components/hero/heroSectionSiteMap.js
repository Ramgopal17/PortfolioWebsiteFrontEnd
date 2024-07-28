import React from "react";

import "./hero.css";
import HeroHeader from "./HeroHeader.js";
import headerBg from "../../images/heroHeaderBg.png";

const heroSectionSiteMap = () => {
  return (
    <>
      <HeroHeader backImage={headerBg} backColor="#faefe7" title="Site Map" theme="orangeTheme" />
    </>
  );
};
export default heroSectionSiteMap;
