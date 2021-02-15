/*
 * @Author: lyc
 * @Date: 2021-02-04 21:21:04
 * @LastEditors: lyc
 * @LastEditTime: 2021-02-04 21:26:54
 * @Description: file content
 */

export default function Error({ statusCode }) {
  return (
    <p>{
      statusCode ?
        `An error ${statusCode} occurred on server` :
        `An error ${statusCode} occurred on client`
    }
    </p>
  )
}
Error.getInital