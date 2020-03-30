import { request } from '@/utils/network'

export function goodsList(query){
  return request({
    url:'/api/jifen/jifen_goods_list',
    method: 'get',
    params:query
  })
}