/*
 * @Author: lyc
 * @Date: 2021-02-15 23:42:57
 * @LastEditors: lyc
 * @LastEditTime: 2021-02-17 21:10:36
 * @Description: file content
 */

import { List, Divider, Badge } from "antd";
import { observer } from "mobx-react";
import Link from "next/link";
import {
  FireOutlined,
  CalendarOutlined,
  FolderOutlined,
} from "@ant-design/icons";
import LazyLoad from "react-lazyload";
import hljs from "highlight.js";
import marked from "marked";
import { NextPage } from 'next';
import { useContext } from "react";
import {cssStore} from '../store'
import {ArticleType} from '../models/article'
interface ArListProps {
  title: string;
  myList: ArticleType[];
}
const ArticleList:NextPage<ArListProps> = ({ title, myList }) => {
    const store = useContext(cssStore)
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

    return (
      <List
        header={<Divider>{title}</Divider>}
        itemLayout="vertical"
        dataSource={myList}
        renderItem={(item:ArticleType) => (
          <List.Item>
            <LazyLoad height={200} offset={-200}>
              {item.is_top ? <Badge.Ribbon text="置顶" color="red" /> : ""}
              <div className="animate__animated animate__bounceInLeft animate__slow">
                <div className="list-title">
                  {store.is_static_page ? (
                    <Link href={"/article/[uuid]"} as={"/article/" + item.id}>
                      <a>{item.title}</a>
                    </Link>
                  ) : (
                    <Link
                      href={{
                        pathname: "/detail",
                        query: { id: item.id },
                      }}
                      prefetch
                    >
                      <a>{item.title}</a>
                    </Link>
                  )}
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
    );
  }

export default ArticleList;
