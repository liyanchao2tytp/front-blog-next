import React from "react";
import Head from "next/head";
import Header from "../components/Header";
import "../styles/pages/detail.css";

import { Col, Row, Breadcrumb, Affix } from "antd";
import {
  CalendarOutlined,
  FolderOutlined,
  FireOutlined,
} from "@ant-design/icons";
// import ReactMarkdown from "react-markdown";

// import "markdown-navbar/dist/navbar.css";

// import MarkNav from "markdown-navbar";

import Author from "../components/Author";
import Advert from "../components/Advert";
import axios from "axios";

import marked from "marked";
import hljs from "highlight";
import "highlight.js/styles/monokai-sublime.css";

import Tocify from '../components/tocify.tsx'

import servicePath from '../config/apiUrl'
const Detail = (props) => {
  const tocify = new Tocify()
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
    }
  });



  let html = marked(props.content)

  return (
    <>
      <Head>
        <title>{props.title}</title>
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
                <a href={`/list?id=${props.typeId}`}>文章列表</a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>{props.title}</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div>
            <div className="detailed-title">{props.title}</div>
            <div className="list-icon center">
              <span>
                <CalendarOutlined />
                {props.addTime}
              </span>
              <span>
                <FolderOutlined />
                视频教程
              </span>
              <span>
                <FireOutlined />
                {props.view_count}人
              </span>
            </div>
          </div>

          <div className="detailed-content"
            dangerouslySetInnerHTML={{ __html: html }}
          >
            {/* <ReactMarkdown source={props.intro} escapeHtml={true} /> */}
          </div>
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />
          <Affix offsetTop={5}>
            <div className="detailed-nav comm-box">
              <div className="nav-title">文章目录</div>

              <div className="toc-list">
                {tocify && tocify.render()}
              </div>

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
