/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-08-12 11:03:27
 * @LastEditTime: 2021-09-02 11:26:35
 * @Description: Modify here please
 */
import { AddBanner } from '../banner/type';
import { GetMembers, UpdateMember } from './type.';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  Member = '/members',
}

//  获取会员列表
export function getMembers(params: GetMembers) {
  return defHttp.get({ url: Api.Member, params });
}

// 添加会员
export function addMember(params: AddBanner) {
  return defHttp.post({
    url: Api.Member,
    params,
  });
}

// 编辑会员
export function updateMember(id: string, params: UpdateMember) {
  return defHttp.patch({
    url: `${Api}/${id}`,
    params,
  });
}

// 删除会员
export function delMember(id: string) {
  return defHttp.delete({
    url: `${Api}/${id}`,
  });
}
