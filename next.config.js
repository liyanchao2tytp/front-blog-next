/*
 * @Author: lyc
 * @Date: 2020-10-09 08:57:28
 * @LastEditors: lyc
 * @LastEditTime: 2021-02-18 13:50:43
 * @Description: file content
 */
const withCss = require('@zeit/next-css')

if (typeof require !== 'undefined') {
    require.extensions['.css'] = file => { }
}
module.exports = {
    devIndicators: {
        autoPrerender: false,
    },
}

module.exports = withCss({})