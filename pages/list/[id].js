/*
 * @Author: lyc
 * @Date: 2020-11-21 15:30:42
 * @LastEditors: lyc
 * @LastEditTime: 2020-11-22 16:52:02
 * @Description: file content
 */
import React, { useEffect, useState } from "react";
import Head from "next/head";
import Header from "../../components/Header";
import Author from "../../components/Author";
import Advert from "../../components/Advert";
import Footer from "../../components/Footer";
import {
  Col, Row, List, Breadcrumb, BackTop,
  ConfigProvider,
  Divider,
  Badge,
  Pagination,
} from "antd";
import zhCN from 'antd/lib/locale/zh_CN';

import {
  FireOutlined,
  CalendarOutlined,
  FolderOutlined,
  RocketOutlined
} from "@ant-design/icons";
import Link from 'next/link'
import axios from "axios";
import servicePath from "../../config/apiUrl";

import marked from "marked";
import hljs from "highlight";
import "highlight.js/styles/monokai-sublime.css";
import "../../styles/pages/comp.css"
import "animate.css";
import LazyLoad, { lazyload } from "react-lazyload";
import { useRouter } from 'next/router'
import { ARTICLE_TYPE } from '../../config/articleType.js'
import fetch from 'node-fetch'

const ArticleList = ({ atlist }) => {
  const [myList, setMylist] = useState(atlist.data.article);
  const [articleType, setType] = useState('')
  const renderer = new marked.Renderer();
  const router = useRouter();

  let total = atlist.data.num[0].total
  /**
    * @description: 每次进入不同的列表页的时候
    *               更改mylist的值 让页面动态刷新
    */
  useEffect(() => {
    setMylist(atlist.data.article)
    checkArticleType()

  }, [router])

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
  const checkArticleType = () => {
    switch (router.query.id) {
      case '1':
        setType(ARTICLE_TYPE.ONE)
        break;
      case '2':
        setType(ARTICLE_TYPE.TWO)
        break;
      case '3':
        setType(ARTICLE_TYPE.THREE)
        break;
    }
  }
  const gotoPage = (page, pageSize) => {
    axios(`${servicePath.getList}/${router.query.id}/${page}/${pageSize}`).then(
      (res) => {
        setMylist(res.data.data.article)
      });
  }
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
              <Breadcrumb.Item>{articleType}</Breadcrumb.Item>
            </Breadcrumb>
          </div>

          <List
            header={
              <Divider>{articleType}</Divider>
            }

            itemLayout="vertical"
            dataSource={myList}
            renderItem={(item) => (
              <List.Item>
                <LazyLoad height={200} offset={-200}>

                  {item.is_top ? <Badge.Ribbon text="置顶" color="red" /> : ""}
                  <div className="animate__animated animate__bounceInLeft animate__slow">
                    <div className="list-title">
                      <Link
                        href={'/article/[uuid]'} as={'/article/' + item.id}
                      >
                        <a>{item.title}</a>
                      </Link>
                    </div>
                    <div className="list-icon">
                      <span className="list-icon-top"></span>
                      <span className="span-calendar span">
                        <CalendarOutlined style={{ color: "lightseagreen" }} />
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

          <ConfigProvider locale={zhCN}>
            <LazyLoad>
              <div className='animate__animated animate__rubberBand animate__slow'>
                <Pagination
                  total={total}
                  showSizeChanger
                  showQuickJumper
                  showTotal={(total) => `共 ${total} 条`}
                  onChange={(page, pageSize) => gotoPage(page, pageSize)}
                  className='animate__animated animate__bounceInUp'
                  style={{ "textAlign": "center", "paddingTop": "20px", "paddingBottom": "20px" }}
                />
              </div>
            </LazyLoad>
          </ConfigProvider>
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
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

    </>
  );
};

// myList.getInitialProps = async (context) => {
//   let id = context.query.id;
//   const promise = new Promise((resolve) => {
//     axios(`${servicePath.getList}/${id}/1/10`).then((res) => {
//       resolve(res.data)
//     });
//   });
//   return await promise;
// };

// export const getStaticPaths = async () => {
//   return {
//     paths: [
//       { params: { id: '1' } },
//       { params: { id: '2' } },
//       { params: { id: '3' } }
//     ],
//     fallback: false
//   }
// }

export async function getServerSideProps({ params }) {
  let id = params.id
  let res = await fetch(`${servicePath.getList}/${id}/1/10`)
  let atlist = await res.json()
  return {
    props: { atlist }
  }
}

export default ArticleList;