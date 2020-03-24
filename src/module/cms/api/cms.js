import http from './../../../base/api/public'
import querystring from 'querystring'
import id from "element-ui/src/locale/lang/id";

let sysConfig = require('@/../config/sysConfig')
let apiUrl = sysConfig.xcApiUrlPre;

//请求后端服务
export const page_list = (page, size, params) => {
  //将json对象转为key/value
  let query = querystring.stringify(params);
  return http.requestQuickGet(apiUrl + '/cms/page/list/' + page + '/' + size + "?" + query);
};

export const page_add = params => {
  return http.requestPost(apiUrl + '/cms/page/add/', params);
};

export const page_get = id => {
  return http.requestQuickGet(apiUrl + '/cms/page/get/' + id);
};

//修改页面提交
export const page_edit = (id,params) =>{
  return http.requestPut(apiUrl+'/cms/page/edit/'+id,params)
};

//删除页面
export const page_del = (id) => {
  return http.requestDelete(apiUrl + '/cms/page/del/'+id)
};

//发布页面
export const page_postPage = (id) => {
  return http.requestPost(apiUrl + '/cms/page/postPage/' + id);
};

