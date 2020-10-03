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
import ReactMarkdown from "react-markdown";

import "markdown-navbar/dist/navbar.css";

import MarkNav from "markdown-navbar";

import Author from "../components/Author";
import Advert from "../components/Advert";

const Detail = () => {
  let md =
    "# P01:课程介绍和环境搭建\n" +
    "[ **M** ] arkdown + E [ **ditor** ] = **Mditor**  \n" +
    "> Mditor 是一个简洁、易于集成、方便扩展、期望舒服的编写 markdown 的编辑器，仅此而已... \n\n" +
    "**这是加粗的文字**\n\n" +
    "*这是倾斜的文字*`\n\n" +
    "***这是斜体加粗的文字***\n\n" +
    "~~这是加删除线的文字~~ \n\n" +
    "`console.log(111)` \n\n" +
    "# p02:来个Hello World 初始Vue3.0\n" +
    "> aaaaaaaaa\n" +
    ">> bbbbbbbbb\n" +
    ">>> cccccccccc\n" +
    "***\n\n\n" +
    "# p03:Vue3.0基础知识讲解\n" +
    "> aaaaaaaaa\n" +
    ">> bbbbbbbbb\n" +
    ">>> cccccccccc\n\n" +
    "# p04:Vue3.0基础知识讲解\n" +
    "> aaaaaaaaa\n" +
    ">> bbbbbbbbb\n" +
    ">>> cccccccccc\n\n" +
    "#5 p05:Vue3.0基础知识讲解\n" +
    "> aaaaaaaaa\n" +
    ">> bbbbbbbbb\n" +
    ">>> cccccccccc\n\n" +
    "# p06:Vue3.0基础知识讲解\n" +
    "> aaaaaaaaa\n" +
    ">> bbbbbbbbb\n" +
    ">>> cccccccccc\n\n" +
    "# p07:Vue3.0基础知识讲解\n" +
    "> aaaaaaaaa\n" +
    ">> bbbbbbbbb\n" +
    ">>> cccccccccc\n\n" +
    "``` var a=11; ```";

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

          <div className="detailed-content">
            <ReactMarkdown source={md} escapeHtml={true} />
          </div>
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />
          <Affix>
            <div className="detailed-nav comm-box">
              <div className="nav-title">文章目录</div>
              <MarkNav
                className="article-menu"
                source={md}
                // 锚点距离顶部的位置
                headingTopOffset={0}
                // 是否有排序序号 自动生成
                ordered={false}
              />
            </div>
          </Affix>
        </Col>
      </Row>
    </>
  );
};
export default Detail;
