/*
 * @Author: lyc
 * @Date: 2021-02-17 20:21:47
 * @LastEditors: lyc
 * @LastEditTime: 2021-02-17 21:10:50
 * @Description: file content
 */
export interface ArticleType  {
  id: number;
  title: string;
  is_top?: boolean;
  addTime: string;
  typeName: string;
  view_count: number;
  intro: string;
}