let ipUrl = 'http://127.0.0.1:7001/'

let servicePath = {
  getArticleList: ipUrl + 'getlist',  // 首页接口
  getArticleById: ipUrl + 'getById',  // 详细页接口
  getTypeInfo: ipUrl + 'getType',     // 获取导航栏在数据库中的所有数据
  getList: ipUrl + 'getAlist/'
}

export default servicePath