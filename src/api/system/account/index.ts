/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-07-20 10:17:38
 * @LastEditTime: 2021-08-11 14:37:36
 * @Description: Modify here please
 */

import { AddAccountForm, ChangeAdminStatusQuery, UploadApiResult } from './type';
import { UploadFileParams } from '/#/axios';
import { useGlobSetting } from '/@/hooks/setting';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  Admin = '/users',
  Change = '/users/changeStatus',
  Role = '/role/account',
  Upload = '/avatarUpload',
}

const { uploadUrl = '' } = useGlobSetting();

//  获取管理員列表
export function getAdminList(params: any) {
  return defHttp.get({ url: Api.Admin, params });
}

//  获取角色列表
export function getAccountRole(params?: any) {
  return defHttp.get({ url: Api.Role, params });
}

//  添加管理员
export function addAdmin(params: AddAccountForm) {
  return defHttp.post({ url: Api.Admin, params });
}

//  更新管理员
export function updateAdmin(id: string, params: AddAccountForm) {
  return defHttp.patch({ url: `/${Api.Admin}/${id}`, params });
}

//  删除管理员
export function delAdmin(id: string) {
  return defHttp.delete({ url: `/${Api.Admin}/${id}` });
}

// 改变管理员状态
export function changeAdminStatus(params: ChangeAdminStatusQuery) {
  return defHttp.put({
    url: Api.Change,
    params,
  });
}

// 上传头像
export function uploadAvatar(params: UploadFileParams) {
  return defHttp.uploadFile<UploadApiResult>(
    {
      url: `${uploadUrl}/avatarUpload`,
    },
    params
  );
}
