/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-08-12 11:03:27
 * @LastEditTime: 2021-08-12 11:56:39
 * @Description: Modify here please
 */
import { defHttp } from '/@/utils/http/axios';

enum Api {
  Member = '/members',
}

//  获取会员列表
export function getMemberList(params: any) {
  return defHttp.get({ url: Api.Member, params });
}
