/*
 * @Author: lyc
 * @Date: 2020-10-09 08:57:28
 * @LastEditors: lyc
 * @LastEditTime: 2021-02-18 13:17:24
 * @Description: file content
 */
// import '../styles/globals.css'
import  { AppProps} from 'next/app'
import React,{ReactElement} from 'react'
import 'antd/dist/antd.css'
import '../styles/pages/comp.css'

const MyMobxApp = ({ Component, pageProps }:AppProps) :ReactElement=> {
  return (
      <Component {...pageProps} />
  )
}
export default MyMobxApp
