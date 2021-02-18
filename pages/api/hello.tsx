/*
 * @Author: lyc
 * @Date: 2021-02-18 12:46:53
 * @LastEditors: lyc
 * @LastEditTime: 2021-02-18 12:59:34
 * @Description: file content
 */
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
type Data = {
  name: string
}
export default (req:NextApiRequest, res:NextApiResponse<Data>) => {
  // res.statusCode = 200
  // res.json({ name: 'John Doe' })
  res.status(200).json({name:'John Doe'})
}
