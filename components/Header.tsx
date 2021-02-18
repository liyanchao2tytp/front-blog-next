import React, { FC, useContext, useEffect, useState } from "react";
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
import { cssStore } from "../store";
import { observer } from "mobx-react";
const Header :FC= () => {
  const [navArray, setNavArray] = useState([]);
  const store = useContext(cssStore);
  useEffect(() => {
    const fetchData = async () => {
      const results = await Axios(servicePath.getTypeInfo).then((res) => {
        return res.data.data;
      });
      setNavArray(results);
    };
    fetchData();
  }, []);
  /**
   * @description: 网页失去焦点时，切换网页title
   */
  useEffect(() => {
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") {
        document.title = `• .•̀ 回来看看嘛~`;
      } else {
        document.title = "lyc的个人博客";
      }
    });
  });

  const handleClick = (e) => {
    if (e.key == 0) {
      // 去首页
      Router.push("/");
    } else if (store.is_static_page) {
      // 动态参数 跳转 /[uuid]
      Router.push(
        {
          pathname: "/list",
          query: { id: e.key },
        },
        `blog/${e.key}`
      );
    } else {
      Router.push("/list?id=" + e.key); // 带参跳转 ?id=uuid
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
        <Row justify="center">
          <Col xs={24} sm={24} md={15} lg={14} push={2}>
            <span className="header-logo">
              <div>
                {/* 根据mobx中is_staic_page和is_concise的状态决定哪种模式 */}
                {store.is_static_page ? (
                  <Link href="/">
                    <a onClick={() => store.AlterIsStaticPage()}>Static</a>
                  </Link>
                ) : (
                  <a
                    onClick={(e) => {
                      store.AlterConcise();
                      e.preventDefault();
                    }}
                  >
                    {store.is_concise ? "Simple" : "Complexity"}
                  </a>
                )}
              </div>
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
                let target ;
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
};

export default observer(Header);
