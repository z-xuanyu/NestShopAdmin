/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-08-13 10:23:56
 * @LastEditTime: 2021-08-13 14:39:57
 * @Description: Modify here please
 */

import { AddCategory, UpdateCategory } from './type';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  Category = '/categories',
}

//  获取商品分类列表
export function getGoodsCategories(params?: any) {
  return defHttp.get({ url: Api.Category, params });
}

// 添加商品分类
export function addCategory(params: AddCategory) {
  return defHttp.post({ url: Api.Category, params });
}

// 编辑更新商品分类信息
export function updateCategory(id: string, params: UpdateCategory) {
  return defHttp.patch({
    url: `${Api.Category}/${id}`,
    params,
  });
}

// 删除商品分类
export function delCategory(id: string) {
  return defHttp.delete({
    url: `${Api.Category}/${id}`,
  });
}
