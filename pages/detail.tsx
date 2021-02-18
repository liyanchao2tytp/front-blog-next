/*
 * @Author: lyc
 * @Date: 2021-02-18 12:47:18
 * @LastEditors: lyc
 * @LastEditTime: 2021-02-19 01:05:59
 * @Description: file content
 */
import React from "react";
import Head from "next/head";
import Link from "next/link";
import Header from "../components/Header";
import "../styles/pages/detail.css";

import { Col, Row, Breadcrumb, Affix } from "antd";


import Author from "../components/Author";
import Advert from "../components/Advert";
import axios from "axios";

import marked from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.css";


import Tocify from "../components/tocify";
import servicePath from "../config/apiUrl";
import "../styles/pages/detail.css";
import TopBreadcrumb from "../components/TopBreadcrumb";
import MainArticle from "../components/article/MainArticle";

const Detail = (props) => {
  const tocify = new Tocify();
  const renderer = new marked.Renderer();

  renderer.heading = function (text, level, raw) {
    const anchor = tocify.add(text, level);
    return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
  };

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

  let html = marked(props.content);

  return (
    <>
      <Head>
        <title>{props.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header></Header>
      <Row className="comm-main" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          {/* 面包屑导航 */}
            <TopBreadcrumb typeId={props.typeId} >
              <Breadcrumb.Item>{props.title}</Breadcrumb.Item>
            </TopBreadcrumb>
          {/* 文章详细内容 */}
            <MainArticle result={props} html={html} />
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />
          <Affix offsetTop={5}>
            <div className="detailed-nav comm-box">
              <div className="nav-title">文章目录</div>

              <div className="toc-list">{tocify && tocify.render()}</div>
            </div>
          </Affix>
        </Col>
      </Row>
    </>
  );
};

Detail.getInitialProps = async (context) => {
  let id = context.query.id;

  const promise = new Promise((resolve) => {
    axios(`${servicePath.getArticleById}/${id}`).then((res) => {
      resolve(res.data.data[0]);
    });
  });
  return await promise;
};
export default Detail;
