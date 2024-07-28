import React from "react";

import { Col } from "react-bootstrap";

const PortfolioSidebar = (props) => {
  return (
    <Col lg={4} xs={12} className={`col col-lg-4 col-12 ${props.blLeft}`}>
      <div className="blog-sidebar">
        <div className="widget category-widget">
          <h3>Post Categories</h3>
          <ul></ul>
        </div>
        <div className="widget recent-post-widget">
          <h3>Latest Posts</h3>
        </div>
        <div className="widget tag-widget">
          <h3>Tags</h3>
        </div>
      </div>
    </Col>
  );
};

export default PortfolioSidebar;
