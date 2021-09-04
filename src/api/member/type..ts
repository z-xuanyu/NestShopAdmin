/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-09-02 11:16:23
 * @LastEditTime: 2021-09-02 11:20:30
 * @Description: Modify here please
 */
export interface GetMembers {
  pageNumber: number;
  pageSize: number;
}

export interface AddMember {
  name: string;
  phone: string;
  password: string;
}

export interface UpdateMember {
  name: string;
  phone: string;
}
