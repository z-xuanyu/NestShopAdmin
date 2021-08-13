/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-08-13 14:33:17
 * @LastEditTime: 2021-08-13 14:38:45
 * @Description: Modify here please
 */

export interface AddCategory {
  name: string;
  parentId?: string | null;
  pic: string;
  sort: number;
}

export interface UpdateCategory {
  name: string;
  parentId?: string | null;
  pic: string;
  sort: number;
}
