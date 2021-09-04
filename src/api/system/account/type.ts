/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-07-20 10:19:36
 * @LastEditTime: 2021-08-11 14:39:05
 * @Description: Modify here please
 */
export interface AddAccountForm {
  name: string;
  email: string;
  password?: string;
  roleIds: Array<string>;
}

export interface ChangeAdminStatusQuery {
  adminId: string;
  status: boolean;
}
export interface ImageUrl {
  url: string;
}
export interface UploadApiResult {
  message?: string;
  code: number;
  result: ImageUrl;
}
