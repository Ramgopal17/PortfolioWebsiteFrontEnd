import React from "react";
import NewHeader from "../header/NewHeader"

export default function Navbar(props) {
  const [scroll, setScroll] = React.useState(0);

  const handleScroll = () => setScroll(document.documentElement.scrollTop);

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const className = scroll > 80 ? "fixed-navbar active" : "fixed-navbar";

  return (
    <div className={className}>
        <NewHeader
        hclass={props.hclass}
        Logo={props.Logo}
        topbarNone={props.topbarNone}
      />
    </div>
  ); 
}