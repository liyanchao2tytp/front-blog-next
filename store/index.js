/*
 * @Author: lyc
 * @Date: 2021-02-04 18:07:24
 * @LastEditors: lyc
 * @LastEditTime: 2021-02-07 00:47:20
 * @Description: file content
 */

import { makeAutoObservable } from "mobx"

const INDEX_CSS_FILES = [
  'css/pages/index.css',
  'css/pages/indexSimple.css'
]

class CssStore {
  is_concise = false
  indexDynamicCss = INDEX_CSS_FILES[0]

  constructor() {
    makeAutoObservable(this)
  }

  AlterConcise() {
    this.is_concise = !this.is_concise
  }
  ChangeDynamicCss() {
    switch (this.indexDynamicCss) {
      case INDEX_CSS_FILES[0]:
        this.indexDynamicCss = INDEX_CSS_FILES[1]
        break;
      case INDEX_CSS_FILES[1]:
        this.indexDynamicCss = INDEX_CSS_FILES[0]
        break;
    }
  }

}
const store = new CssStore();
export default store