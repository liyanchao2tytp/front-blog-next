import { useContext } from "react";
import { List, Divider, Badge } from "antd";
import { inject, observer } from "mobx-react";
import Link from "next/link";
import {
  FireOutlined,
  CalendarOutlined,
  FolderOutlined,
} from "@ant-design/icons";
import LazyLoad from "react-lazyload";
import hljs from "highlight.js";
import marked from "marked";

const ArticleList = inject("store")(
  observer(({ title, myList, store }) => {
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
        renderItem={(item) => (
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
  })
);
export default ArticleList;
