/*
 * @Author: lyc
 * @Date: 2020-10-09 08:57:28
 * @LastEditors: lyc
 * @LastEditTime: 2021-02-06 04:06:50
 * @Description: file content
 */
// import '../styles/globals.css'
import App, { Container } from 'next/app'
import React from 'react'
import { Provider } from 'mobx-react'
import 'antd/dist/antd.css'
import '../styles/pages/comp.css'
import store from '../store'

const MyMobxApp = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}
export default MyMobxApp
