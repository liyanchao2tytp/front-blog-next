/*
 * @Author: lyc
 * @Date: 2020-10-25 21:46:18
 * @LastEditors: lyc
 * @LastEditTime: 2021-02-16 16:49:52
 * @Description: file content
 */
import React, { useState } from "react";
import { Col, Row, BackTop, ConfigProvider, Pagination, Affix } from "antd";
import { RocketOutlined } from "@ant-design/icons";
import zhCN from "antd/lib/locale/zh_CN";

import LazyLoad from "react-lazyload";
import fetch from "node-fetch";
import axios from "axios";
import { inject, observer } from "mobx-react";

import servicePath from "../config/apiUrl";
import Header from "../components/Header";

import Author from "../components/Author";
import Advert from "../components/Advert";
import Footer from "../components/Footer";
import IndexCarousel from "../components/index/IndexCarousel";
import "highlight.js/styles/monokai-sublime.css";
import "animate.css";
import ArticleList from "../components/index/ArticleList";

/**
 * @description: 根据store的状态动态导入样式
 */
// const showyCss = dynamic(() => {});

const Index = inject("store")(
  observer(({ props, store }) => {
    const [myList, setMylist] = useState(props.data.article);
    let total = props.data.num[0].total;

    /**
     * @description: 分页 跳转 获取数据
     * @param {page}
     * @param {pageSize}
     * @return {*}
     */
    const gotoPage = (page, pageSize) => {
      axios(`${servicePath.getArticleList}/${page}/${pageSize}`).then((res) => {
        setMylist(res.data.data.article);
      });
    };

    return (
      <div>
        <Affix offsetTop={0}>
          <div>
            <div className="animate__animated animate__bounceInDown">
              <Header store={store}></Header>
            </div>
          </div>
        </Affix>

        <Row className="comm-main" type="flex" justify="center">
          <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
            {/* 首页轮播图 */}
            <IndexCarousel />
            {/* 首页文章列表 */}
            <ArticleList title={"最新日志"} myList={myList} />
            <LazyLoad>
              <ConfigProvider locale={zhCN}>
                <div className="animate__animated animate__rubberBand animate__slow">
                  <Pagination
                    total={total}
                    showSizeChanger
                    showQuickJumper
                    showTotal={(total) => `共 ${total} 条`}
                    onChange={(page, pageSize) => gotoPage(page, pageSize)}
                    style={{
                      textAlign: "center",
                      paddingTop: "20px",
                      paddingBottom: "20px",
                    }}
                  />
                </div>
              </ConfigProvider>
            </LazyLoad>
          </Col>
          <Col className="comm-right" xs={0} sm={0} md={6} lg={5} xl={4}>
            <div className="animate__animated animate__fadeInRightBig">
              {/* 个人信息 */}
              <Author />
              {/* 广告信息 */}
              <Advert />
            </div>
          </Col>
        </Row>

        <Footer />
        <BackTop>
          <RocketOutlined />
        </BackTop>
      </div>
    );
  })
);
// Home.getInitialProps = async () => {
//   const promise = new Promise((resolve) => {
//     axios(`${servicePath.getArticleList}/1/10`).then((res) => {
//       resolve(res.data);
//     });
//   });
//   return await promise;
// };

export async function getStaticProps() {
  const res = await fetch(`${servicePath.getArticleList}/1/10`);
  const props = await res.json();

  return {
    props: {
      props,
    },
  };
}
export default Index;
