'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this
    ctx.body = 'this is sucess'
  }

  async getAriticleList() {
    const { app, ctx } = this
    let sql = `  SELECT article.id as id , 
                        article.title as title ,  
                        article.intro as intro , 
                        article.addTime as addTime ,  
                        article.view_count as view_count ,  
                        type.typeName as typeName  
                        From article LEFT JOIN type ON article.type_id = type.id  `

    const results = await app.mysql.query(sql)
    ctx.body = { data: results }

  }

}

module.exports = HomeController;
