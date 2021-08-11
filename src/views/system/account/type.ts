/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-08-11 11:41:05
 * @LastEditTime: 2021-08-11 11:41:45
 * @Description: Modify here please
 */
export interface FileItem {
  uid: string;
  name?: string;
  status?: string;
  response?: string;
  url?: string;
  type?: string;
  size: number;
  originFileObj: any;
}

export interface FileInfo {
  file: FileItem;
  fileList: FileItem[];
}
