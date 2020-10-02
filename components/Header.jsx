import React from "react";
import "../styles/components/Header.css";
import '../styles/components/Author.css'
import {
  HomeOutlined,
  PlayCircleOutlined,
  SmileOutlined,
} from "@ant-design/icons";

import { Row, Col, Menu } from "antd";

const Header = () => (
  <div className="header">
    <Row type="flex" justify="center">
      <Col xs={24} sm={24} md={15} lg={12}>
        <span className="header-logo">Tytp</span>
        <span className="header-txt">在学习阶段，只做了一些微小的工作</span>
      </Col>
      <Col xs={0} sm={0} md={14} lg={6}>
        <Menu mode="horizontal">
          <Menu.Item key="home">
            <HomeOutlined />
            首页
          </Menu.Item>

          <Menu.Item key="video">
            <PlayCircleOutlined />
            视频
          </Menu.Item>

          <Menu.Item key="life">
            <SmileOutlined />
            生活
          </Menu.Item>
        </Menu>
      </Col>
    </Row>
  </div>
);

export default Header;
