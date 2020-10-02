import React from "react";
import Head from "next/head";
import Header from "../components/Header";
import "../styles/pages/detail.css";

import { Col, Row, Breadcrumb } from "antd";
import {
  CalendarOutlined,
  FolderOutlined,
  FireOutlined,
} from '@ant-design/icons'
const Detail = () => {
  return (
    <>
      <Head>
        <title>Detail</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header></Header>
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <div className="bread-div">
            <Breadcrumb>
              <Breadcrumb.Item>
                <a href="/">首页</a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <a href="/list">文章列表</a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>xxxx</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div>
            <div className="detailed-title">React学习教程</div>
            <div className="list-icon center">
              <span>
                <CalendarOutlined />
                2020-10-1
              </span>
              <span>
                <FolderOutlined />
                视频教程
              </span>
              <span>
                <FireOutlined />
                2333人
              </span>
            </div>
          </div>

          <div className='detailed-content'>
            文章内容
          </div>
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          右侧
        </Col>
      </Row>
    </>
  );
};
export default Detail;
