import http from '../utils/http'
import apis from '../api/api'
/**
 *queryIndexColumns方法
 * */
export function queryIndexColumns() {
  return http.get(apis.queryIndexColumns)
}
/**
 *queryColumnChildMap方法
 * */
export function queryColumnChildMap(parmas, headers) {
  return http.post(apis.queryColumnChildMap, parmas, headers)
}