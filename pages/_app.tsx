/*
 * @Author: lyc
 * @Date: 2020-10-09 08:57:28
 * @LastEditors: lyc
 * @LastEditTime: 2021-02-17 19:25:30
 * @Description: file content
 */
// import '../styles/globals.css'
import App, { AppProps} from 'next/app'
import React,{ReactElement} from 'react'
import { Provider } from 'mobx-react'
import 'antd/dist/antd.css'
import '../styles/pages/comp.css'

const MyMobxApp = ({ Component, pageProps }:AppProps) :ReactElement=> {
  return (
      <Component {...pageProps} />
  )
}
export default MyMobxApp
