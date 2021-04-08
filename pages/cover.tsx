/*
 * @Author: lyc
 * @Date: 2021-02-15 23:42:57
 * @LastEditors: lyc
 * @LastEditTime: 2021-03-08 11:22:12
 * @Description: file content
 */
import React from "react";
import { Row, Col } from "antd";
import "../styles/pages/cover.css";
import { NextPage } from "next";
const Cover :NextPage = () => {
  return (
    <>
      <Row justify="center">
        <Col pull={5}>
          <div className="animate__animated animate__bounceInLeft">
            <span>李燕超的个人博客</span>
          </div>
        </Col>
        <Col>
          <div>right</div>
        </Col>
      </Row>
    </>
  );
};

export default Cover;
