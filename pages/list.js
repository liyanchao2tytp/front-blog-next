import React, { useEffect, useState } from "react";
import Head from "next/head";
import Header from "../components/Header";
import Author from "../components/Author";
import Advert from "../components/Advert";
import Footer from "../components/Footer";
import { Col, Row, List, Breadcrumb,Tag } from "antd";
import {
  FireOutlined,
  CalendarOutlined,
  FolderOutlined,
} from "@ant-design/icons";
import Link from 'next/link'
import Axios from "axios";
import servicePath from "../config/apiUrl";

import marked from "marked";
import hljs from "highlight";
import "highlight.js/styles/monokai-sublime.css";
import "../styles/pages/comp.css"
const myList = (props) => {
  const [myList, setMylist] = useState(props.data);
  const renderer = new marked.Renderer();
  useEffect(() => {
    setMylist(props.data)
  })

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

  return (
    <>
      <Head>
        <title>lyc的个人博客</title>
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
              <Breadcrumb.Item>技术文档</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <List
            header={<div>最新日志</div>}
            itemLayout="vertical"
            dataSource={myList}
            renderItem={(item) => (
              <List.Item>
                <div className="list-title">
                  <Link href={{ pathname: "/detail", query: { id: item.id } }}>
                    <a>{item.title}</a>
                  </Link>
                </div>
                <div className="list-icon">
                <span>{item.is_top ? <Tag color="red">置顶</Tag> : ""}</span>

                  <span>
                    <CalendarOutlined />
                    {item.addTime}
                  </span>
                  <span>
                    <FolderOutlined />
                    {item.typeName}
                  </span>
                  <span>
                    <FireOutlined />
                    {item.view_count}人
                  </span>
                </div>
                <div className="list-context"
                  dangerouslySetInnerHTML={{ __html: marked(item.intro) }}
                >
                </div>
              </List.Item>
            )}
          />
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />
        </Col>
      </Row>
      <Footer />
    </>
  );
};

myList.getInitialProps = async (context) => {
  let id = context.query.id;
  const promise = new Promise((resolve) => {
    Axios(servicePath.getList + id).then((res) => {
      resolve(res.data)
    });
  });
  return await promise;
};

export default myList;
