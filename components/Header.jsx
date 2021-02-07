import React, { useEffect, useState } from "react";
import Head from "next/head";

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
import { inject, observer } from "mobx-react";
const Header = inject("store")(
  observer(({ store }) => {
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
        Router.push(
          {
            pathname: "/list",
            query: { id: e.key },
          },
          `blog/${e.key}`
        );
      }
    };

    return (
      <>
        <Head>
          <title>lyc的个人博客</title>
          <link rel="icon" href="/favicon.ico" />
          <link rel="stylesheet" type="text/css" href={store.indexDynamicCss} />
        </Head>
        <div className="header">
          <Row type="flex" justify="center">
            <Col xs={24} sm={24} md={15} lg={14} push={2}>
              <span className="header-logo">
                <Link href="/">
                  <a onClick={() => store.AlterConcise()}>
                    {store.is_concise ? "Simple" : "Complexity"}
                  </a>
                </Link>
              </span>
              <span className="header-txt">
                在学习阶段，只做了一些微小的工作
              </span>
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
      </>
    );
  })
);

export default Header;
