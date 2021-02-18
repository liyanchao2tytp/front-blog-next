/*
 * @Author: lyc
 * @Date: 2020-10-09 08:57:28
 * @LastEditors: lyc
 * @LastEditTime: 2020-11-17 12:19:02
 * @Description: file content
 */
const ipUrl = 'http://127.0.0.1:7001/'

const servicePath = {
  getArticleList: ipUrl + 'getlist',  // 首页接口
  getArticleById: ipUrl + 'getById',  // 详细页接口
  getTypeInfo: ipUrl + 'getType',     // 获取导航栏在数据库中的所有数据
  getList: ipUrl + 'getAlist'
}

export default servicePath