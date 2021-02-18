/*
 * @Author: lyc
 * @Date: 2021-02-19 00:49:22
 * @LastEditors: lyc
 * @LastEditTime: 2021-02-19 01:08:12
 * @Description: file content
 */
import { FC } from 'react';
import {
  CalendarOutlined,
  FolderOutlined,
  FireOutlined,
} from "@ant-design/icons";

type ResultType = {
  title: string;
  addTime: string;
  typeName: string;
  view_count: number;
}
interface Props{
  result: ResultType;
  html: string;
}
const MainArticle :FC<Props>=({ result, html })=> {
  return (
    <>
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
      />
    </>
  );
}
export default MainArticle;