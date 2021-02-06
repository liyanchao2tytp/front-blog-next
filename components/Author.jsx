import { Tooltip, Avatar, Divider } from "antd";
import { GithubOutlined, QqOutlined, WechatOutlined } from "@ant-design/icons/";
import "../styles/components/Author.css";
import { inject, observer } from "mobx-react";
import store from "../store";
const Author = inject("store")(
  observer((props) => {
    return (
      <div className="author-div comm-box">
        <div>
          <Avatar
            size={100}
            className="mylight"
            src="https://s1.ax1x.com/2020/10/02/0lmPiR.png"
          />
        </div>

        <div className="author-intro">
          学习next和egg时候做的一个小博客，后期可能会修改一些样式和技术栈之类的，
          希望有一天自己技术也可以慢慢变的好起来
        </div>
        <Divider>社交账号</Divider>

        <Tooltip title="Github" placement="bottom">
          <Avatar
            size={28}
            icon={<GithubOutlined />}
            className="github-icon"
            onClick={() => store.AlterConcise()}
          ></Avatar>
        </Tooltip>

        <Tooltip title="QQ" placement="bottom">
          <Avatar size={28} icon={<QqOutlined />} className="qq-icon"></Avatar>
        </Tooltip>

        <Tooltip title="Wechat" color="green" placement="bottom">
          <Avatar
            size={28}
            icon={<WechatOutlined />}
            className="wechat-icon"
          ></Avatar>
        </Tooltip>
      </div>
    );
  })
);

export default Author;
