import React from "react";
import { useEffect } from "react";
import { Row, Col } from "antd";
import "../styles/pages/cover.css";
const Cover = () => {
  useEffect(() => {
    document.body.style.backgroundImage =
      "url('https://s1.ax1x.com/2020/10/28/B33D4H.jpg')";
  }, []);
  return (
    <>
      <Row type="flex" justify="center">
        <Col pull={5}>
          <div className="animate__animated animate__bounceInLeft">
            <span>
              李燕超的个人博客
            </span>
            
          </div>
        </Col>
        <Col>
            <div>
              right
            </div>
        </Col>
      </Row>
    </>
  );
};

export default Cover;
