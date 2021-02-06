/*
 * @Author: lyc
 * @Date: 2020-11-21 17:25:52
 * @LastEditors: lyc
 * @LastEditTime: 2021-02-02 16:59:10
 * @Description: 使用动态路由 替换带参的url (?iuuid=xxx)
 */
import React from "react";
import Head from "next/head";
import Header from "../../components/Header";
import "../../styles/pages/detail.css"

import { Col, Row, Breadcrumb, Affix } from "antd";
import {
  CalendarOutlined,
  FolderOutlined,
  FireOutlined,
} from "@ant-design/icons";
import Author from "../../components/Author";
import Advert from "../../components/Advert";
import fetch from 'node-fetch'
import marked from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.css";

import Tocify from '../../components/tocify.tsx'

import servicePath from '../../config/apiUrl'

const Article = ({ result }) => {
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

  // console.log(result.data[0].content);

  let html = marked(result.content)

  return (
    <>
      <Head>
        <title>{result.title}</title>
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
                <a href={`/list/${result.typeId}`}>文章列表</a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>{result.title}</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className="detailed-title-bar">
            <div className="detailed-title">{result.title}</div>
            <div className="list-icon center">
              <span>
                <CalendarOutlined />
                {result.addTime}
              </span>
              <span>
                <FolderOutlined />
                {result.typeName}
              </span>
              <span>
                <FireOutlined />
                {result.view_count}人
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

// Detail.getInitialProps = async (context) => {

//   let id = context.query.id;

//   const promise = new Promise((resolve) => {
//     axios(`${servicePath.getArticleById}/${id}`).then((res) => {
//       resolve(res.data.data[0]);
//     });
//   });
//   return await promise;
// };

export async function getStaticPaths() {
  const res = await fetch(`${servicePath.getArticleById}`)
  const posts = await res.json()
  const paths = posts.data.map((post) => `/article/${post.id}`)
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const res = await fetch(`${servicePath.getArticleById}/${params.uuid}`)
  const temp = await res.json()
  const result = temp.data[0]
  return {
    props: {
      result
    }
  }
}

// export const getServerSideProps = async (context) => {
//   const res = await fetch(`${servicePath.getArticleById}/${context.params.id}`)
//   const temp = await res.json()
//   const result = temp.data[0]
//   return {
//     props: {
//       result
//     }
//   }
// }
export default Article;