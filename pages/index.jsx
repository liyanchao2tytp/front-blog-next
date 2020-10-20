import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Header from "../components/Header";
import "../styles/pages/index.css";
import Author from "../components/Author";
import Advert from "../components/Advert";
import Footer from "../components/Footer";
import { Col, Row, List, BackTop, Carousel, Tag } from "antd";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";

// install Swiper components
import {
  FireOutlined,
  CalendarOutlined,
  FolderOutlined,
} from "@ant-design/icons";
import servicePath from "../config/apiUrl";

import marked from "marked";
import hljs from "highlight";
import "highlight.js/styles/monokai-sublime.css";
const Home = (props) => {
  const [myList, setMylist] = useState(props.data);
  const renderer = new marked.Renderer();
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
    color: "#fff",
    lineHeight: "300px",
    textAlign: "center",
    background: "#364d79",
  };

  return (
    <>
      <Head>
        <title>lyc的个人博客</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header></Header>

      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <Swiper
            spaceBetween={50}
            slidesPerView={3}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
          >
            <SwiperSlide>
              <div className={contentStyle}>dsf</div>
            </SwiperSlide>
            <SwiperSlide>Slide 2</SwiperSlide>
            <SwiperSlide>Slide 3</SwiperSlide>
            <SwiperSlide>Slide 4</SwiperSlide>
            ...
          </Swiper>
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
                  <span className='span-calendar'>
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
                <div
                  className="list-context"
                  dangerouslySetInnerHTML={{ __html: marked(item.intro) }}
                ></div>
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
      <BackTop />
    </>
  );
};

Home.getInitialProps = async () => {
  const promise = new Promise((resolve) => {
    axios(servicePath.getArticleList).then((res) => {
      resolve(res.data);
    });
  });
  return await promise;
};

export default Home;
