/*
 * @Author: lyc
 * @Date: 2021-02-15 23:42:57
 * @LastEditors: lyc
 * @LastEditTime: 2021-02-17 19:25:20
 * @Description: file content
 */
import {createContext} from 'react'
import CssStore, { ICssStore } from './CssStore'

// const StoreContext = createContext({
//    cssStore: new CssStore()
// })
// export default StoreContext;

export const cssStore = createContext(new CssStore());