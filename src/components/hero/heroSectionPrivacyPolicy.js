import React from "react";

import "./hero.css";
import HeroHeader from "./HeroHeader.js";
import headerBg from "../../images/heroHeaderBg.png";

const HeroSectionPrivacyPolicy = () => {
  return (
    <>
      <HeroHeader backImage={headerBg} backColor="#faefe7" title="Privacy Policy" theme="orangeTheme" />
    </>
  );
};
export default HeroSectionPrivacyPolicy;
