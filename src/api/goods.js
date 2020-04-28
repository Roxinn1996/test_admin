import { request } from '@/utils/network'
import qs from 'qs'  //引入qs,格式化data

export function goodsList(query){
  return request({
    url:'/api/jifen/jifen_goods_list',
    method: 'get',
    params:query
  })
}

export function api_goods_type(){
  return request({
    url:'/api/jifen/goods_type_demo',
    method: 'get',
    params:{'group_id':4}

  })
}

export function api_post_add_goods(query){
  return request({
    headers:{'Content-Type':'application/x-www-form-urlencoded'},  //请求头 post提交数据编码方式
    url:'/api/jifen/jifen_goods_edit',
    method: 'post',
    data:qs.stringify(query)
  })
}