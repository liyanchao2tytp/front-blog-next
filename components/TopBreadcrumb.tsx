/*
 * @Author: lyc
 * @Date: 2021-02-18 13:23:20
 * @LastEditors: lyc
 * @LastEditTime: 2021-02-19 01:18:19
 * @Description: file content
 */
import React,{FC, useContext} from 'react'
import Link from 'next/link'
import {
  Breadcrumb,
} from "antd";
import { cssStore } from '../store';

interface Props{
  children?: React.ReactElement,
  typeId?: number,
  articleType?: string
}
const TopBreadcrumb :FC<Props>= ({children,typeId,articleType}) => {
  const store = useContext(cssStore)
  return (
    <div className="bread-div">
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link href="/">
            <a>首页</a>
          </Link>
        </Breadcrumb.Item>
        {children ?
          (
            <Breadcrumb.Item>
              {
                store.is_static_page ?
                  <Link href={`/list/[id]`} as={`/list/${typeId}`}>
                    <a>文章列表</a>
                  </Link> :
                  <Link href={`list?id=${typeId}`}><a>文章列表</a></Link>
              }
                
            </Breadcrumb.Item>
          ) :
          (<Breadcrumb.Item>{articleType}</Breadcrumb.Item>)}
        {children}
      </Breadcrumb>
    </div>
  );
}
export default TopBreadcrumb;