import request from '@/utils/api.request'

/* 示例 */
export function test(data) {
  return request({
    url: '/api/test/test',
    method: 'get',
    data
  })
}
