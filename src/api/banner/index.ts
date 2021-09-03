/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-08-31 10:15:28
 * @LastEditTime: 2021-09-02 11:18:03
 * @Description: Modify here please
 */
import { AddBanner, GetBanners, UpdateBanner } from './type';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  Banner = '/banner',
}

// 获取banner列表
export function getBanners(params: GetBanners) {
  return defHttp.get({
    url: Api.Banner,
    params,
  });
}

// 添加banner
export function addBanner(params: AddBanner) {
  return defHttp.post({
    url: Api.Banner,
    params,
  });
}

// 更新banner
export function updateBanner(id: string, params: UpdateBanner) {
  return defHttp.patch({
    url: `${Api.Banner}/${id}`,
    params,
  });
}

// 删除banner
export function delBanner(id: string) {
  return defHttp.delete({
    url: `${Api.Banner}/${id}`,
  });
}
