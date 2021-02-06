/*
 * @Author: lyc
 * @Date: 2020-10-25 21:46:18
 * @LastEditors: lyc
 * @LastEditTime: 2021-02-07 00:47:29
 * @Description: file content
 */
import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  Col,
  Row,
  List,
  BackTop,
  Carousel,
  ConfigProvider,
  Divider,
  Badge,
  Pagination,
  Affix,
} from "antd";
import {
  FireOutlined,
  CalendarOutlined,
  FolderOutlined,
  RocketOutlined,
} from "@ant-design/icons";
import zhCN from "antd/lib/locale/zh_CN";

import marked from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.css";
import LazyLoad from "react-lazyload";
import fetch from "node-fetch";
// import axios from "axios";

import servicePath from "../config/apiUrl";
import Header from "../components/Header";

import Author from "../components/Author";
import Advert from "../components/Advert";
import Footer from "../components/Footer";
import { inject, observer } from "mobx-react";
import "animate.css";
/**
 * @description: 根据store的状态动态导入样式
 */
// const showyCss = dynamic(() => {});

const Index = inject("store")(
  observer(({ props, store }) => {
    const [myList, setMylist] = useState(props.data.article);
    const renderer = new marked.Renderer();
    let total = props.data.num[0].total;
    if (store.is_concise) {
      console.log("------ 条件加载样式执行了 ------");
    }
    marked.setOptions({
      renderer: renderer,
      gfm: true,
      pedantic: false,
      sanitize: false,
      tables: true,
      breaks: false,
      smartLists: true,
      smartypants: false,
      highlight: function (code) {
        return hljs.highlightAuto(code).value;
      },
    });

    const contentStyle = {
      height: "300px",
      width: "100%",
      // color: "#fff",
      lineHeight: "300px",
      textAlign: "center",
      background: "#364d79",
    };
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
        <link rel="stylesheet" type="text/css" href={store.indexDynamicCss} />
        <Affix offsetTop={0}>
          <div>
            <Head>
              <title>lyc的个人博客</title>
              <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="animate__animated animate__bounceInDown">
              <Header></Header>
            </div>
          </div>
        </Affix>

        <Row className="comm-main" type="flex" justify="center">
          <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
            <Carousel autoplay>
              <div>
                <h3>
                  <img
                    style={contentStyle}
                    src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1603443491910&di=e4691e8550018d62f8fa544b08ef8636&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201702%2F03%2F20170203100831_ZnuRG.jpeg"
                    alt=""
                  />
                </h3>
              </div>
              <div>
                <h3>
                  <img
                    style={contentStyle}
                    src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1603443458590&di=00276f03c816a2efa1cdf70a876a3152&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201408%2F18%2F102924ksgdxyyacjdggygx.jpg"
                    alt=""
                  />
                </h3>
              </div>
              <div>
                <h3>
                  <img
                    style={contentStyle}
                    src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1603519904703&di=77b3b7c36c8c8712a6089dd283c80a14&imgtype=0&src=http%3A%2F%2Fbbsfiles.vivo.com.cn%2Fvivobbs%2Fattachment%2Fforum%2F201706%2F24%2F160153jcicq9jfcisld7v7.jpg"
                    alt=""
                  />
                </h3>
              </div>
              <div>
                <h3>
                  <img
                    style={contentStyle}
                    src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1603449576121&di=4c361ba3ea8e5c0d2dd37dec595724a9&imgtype=0&src=http%3A%2F%2Fartenvoyage.org%2FFCKEeditor%2Fattached%2Fimage%2F20160125%2F20160125130677037703.jpg"
                    alt=""
                  />
                </h3>
              </div>
            </Carousel>

            <List
              header={<Divider>最新日志</Divider>}
              itemLayout="vertical"
              dataSource={myList}
              renderItem={(item) => (
                <List.Item>
                  <LazyLoad height={200} offset={-200}>
                    {item.is_top ? (
                      <Badge.Ribbon text="置顶" color="red" />
                    ) : (
                      ""
                    )}
                    <div className="animate__animated animate__bounceInLeft animate__slow">
                      <div className="list-title">
                        <Link
                          href={{ pathname: "/detail", query: { id: item.id } }}
                          prefetch
                        >
                          <a>{item.title}</a>
                        </Link>
                      </div>
                      <div className="list-icon">
                        <span className="list-icon-top"></span>
                        <span className="span-calendar span">
                          <CalendarOutlined
                            style={{ color: "lightseagreen" }}
                          />
                          {item.addTime}
                        </span>
                        <span className=".span">
                          <FolderOutlined style={{ color: "sandybrown" }} />
                          {item.typeName}
                        </span>
                        <span className=".span">
                          <FireOutlined style={{ color: "red" }} />
                          {item.view_count}人
                        </span>
                      </div>
                      <div
                        className="list-context"
                        dangerouslySetInnerHTML={{ __html: marked(item.intro) }}
                      ></div>
                    </div>
                  </LazyLoad>
                </List.Item>
              )}
            />
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
              <Author />
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
