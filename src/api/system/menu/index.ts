/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-07-19 15:09:21
 * @LastEditTime: 2021-08-11 15:15:00
 * @Description: Modify here please
 */
import { getRoleMenusResultModel, MenuItem } from './type';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  MenuList = '/menu/list',
  Menu = '/menu',
  Tree = '/menu/tree',
  GetRoleMenus = '/menu/roleMenus',
}

// 获取权限菜单列表
export function getRoleMenus() {
  return defHttp.get<getRoleMenusResultModel>({ url: Api.GetRoleMenus });
};
//  获取菜单列表
export function getMenuList() {
  return defHttp.get<MenuItem>({ url: Api.MenuList });
}

// 获取菜单树结构
export function getMenuTree() {
  return defHttp.get({
    url: Api.Tree,
  });
}

//  添加菜单
export function addMenu(params: MenuItem) {
  return defHttp.post<MenuItem>({ url: Api.Menu, params });
}

//  更新菜单信息
export function updateMenu(id: string, params: MenuItem) {
  return defHttp.patch<MenuItem>({ url: `/${Api.Menu}/${id}`, params });
}

//  删除菜单
export function delMenu(id: string) {
  return defHttp.delete<MenuItem>({ url: `/${Api.Menu}/${id}` });
}
