/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-08-31 10:17:33
 * @LastEditTime: 2021-08-31 10:20:29
 * @Description: Modify here please
 */
export interface GetBanners {
  pageNumber: number;
  pageSize: number;
}

export interface AddBanner {
  name: string;
  type: number;
  goodsId: string;
  url: string;
}

export interface UpdateBanner {
  name: string;
  type: number;
  goodsId: string;
  url: string;
}
