'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  APIPATH: '"https://vue-course-api.hexschool.io"',
  CUSTOMPATH: '"ckben"',
  YOUTUBEAPIPATH: '"https://www.googleapis.com/youtube/v3/videos"',
  YOUTUBEKEY: '"AIzaSyBmIbFi_iSZycpz1XRYIfLezwU9hd8quF4"',
})
