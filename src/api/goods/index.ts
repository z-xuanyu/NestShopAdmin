/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-08-13 10:23:56
 * @LastEditTime: 2021-08-27 15:27:35
 * @Description: Modify here please
 */

import { AddCategory, AddGodds, UpdateCategory, UpdateGodds } from './type';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  Category = '/categories',
  Goods = '/commodities',
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

// 获取商品列表
export function getGoodsList(params?: any) {
  return defHttp.get({
    url: Api.Goods,
    params,
  });
}

// 添加商品
export function addGoods(params: AddGodds) {
  return defHttp.post({
    url: Api.Goods,
    params,
  });
}

//更新商品信息
export function updateGoods(id: string, params: UpdateGodds) {
  return defHttp.patch({
    url: `${Api.Goods}/${id}`,
    params,
  });
}

// 刪除商品
export function delGoods(id: string) {
  return defHttp.delete({
    url: `${Api.Goods}/${id}`,
  });
}
