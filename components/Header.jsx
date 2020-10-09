import React, { useEffect, useState } from "react";
import "../styles/components/Header.css";
import "../styles/components/Author.css";
import {
  HomeOutlined,
  PlayCircleOutlined,
  SmileOutlined,
  FileTextOutlined,
} from "@ant-design/icons";

import { Row, Col, Menu } from "antd";
import Axios from "axios";
import servicePath from "../config/apiUrl";
import Router from "next/router";
import Link from "next/link";
const Header = () => {
  const [navArray, setNavArray] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const results = await Axios(servicePath.getTypeInfo).then((res) => {
        return res.data.data;
      });
      setNavArray(results);
    };
    fetchData();
  }, []);

  const handleClick = (e) => {
    if (e.key == 0) {
      Router.push("/");
    } else {
      Router.push("/list?id=" + e.key);
    }
  };

  return (
    <div className="header">
      <Row type="flex" justify="center">
        <Col xs={24} sm={24} md={15} lg={14} push={2}>
          <span className="header-logo">
            <Link href="/">Tytp</Link>
          </span>
          <span className="header-txt">在学习阶段，只做了一些微小的工作</span>
        </Col>
        <Col xs={0} sm={0} md={9} lg={10}>
          <Menu mode="horizontal" onClick={handleClick}>
            <Menu.Item key="0">
              <HomeOutlined />
              首页
            </Menu.Item>

            {navArray.map((item) => {
              let target = "";
              switch (item.id) {
                case 1:
                  target = <SmileOutlined />;
                  break;
                case 2:
                  target = <FileTextOutlined />;
                  break;
                case 3:
                  target = <PlayCircleOutlined />;
              }
              return (
                <Menu.Item key={item.id}>
                  {/* 图标 */}
                  {target}
                  {/* 文字 */}
                  {item.typeName}
                </Menu.Item>
              );
            })}

          </Menu>
        </Col>
      </Row>
    </div>
  );
};

export default Header;
