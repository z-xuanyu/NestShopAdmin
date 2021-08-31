/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-08-31 10:05:56
 * @LastEditTime: 2021-08-31 10:15:05
 * @Description: Modify here please
 */
import { AddNavigator, GetNavigators, UpdateNavigator } from './type';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  Navigator = '/navigator',
}

//  获取导航列表
export function getNavigators(params: GetNavigators) {
  return defHttp.get({ url: Api.Navigator, params });
}

// 添加导航
export function addNavigator(params: AddNavigator) {
  return defHttp.post({
    url: Api.Navigator,
    params,
  });
}

// 更新导航信息
export function updateNavigator(id: string, params: UpdateNavigator) {
  return defHttp.patch({
    url: `${Api.Navigator}/${id}`,
    params,
  });
}

// 删除导航
export function delNavigator(id: string) {
  return defHttp.delete({
    url: `${Api.Navigator}/${id}`,
  });
}
