import React from "react";

import "./hero.css";
import HeroHeader from "./HeroHeader.js";
import headerBg from "../../images/heroHeaderBg.png";

const Hero = () => {
  return (
    <>
      <HeroHeader backImage={headerBg} backColor="#faefe7" title="Portfolio" theme="orangeTheme" />
    </>
  );
};
export default Hero;
