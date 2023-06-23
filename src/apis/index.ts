import type {
  ListResponse,
  UserItem,

} from '@/services/types'
import { alovaIns } from './request'

const getRequest = <T>(url: string, config?: any) => alovaIns.Get<T>(url, config)
const postRequest = <T>(url: string, params?: any) => alovaIns.Post<T, unknown>(url, params)
const putRequest = <T>(url: string, params?: any) => alovaIns.Put<T, unknown>(url, params)

export default {
  /** 获取群成员列表 */
  getGroupList: (params?: any) => getRequest<ListResponse<UserItem>>('', params),

}
