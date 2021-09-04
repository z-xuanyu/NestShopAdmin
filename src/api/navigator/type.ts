/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-08-31 10:06:43
 * @LastEditTime: 2021-08-31 10:09:24
 * @Description: Modify here please
 */

export interface GetNavigators {
  pageNumber: number;
  pageSize: number;
}

export interface AddNavigator {
  name: string;
  icon: string;
  url: string;
  sort: number;
}

export interface UpdateNavigator {
  name: string;
  icon: string;
  url: string;
  sort: number;
}
