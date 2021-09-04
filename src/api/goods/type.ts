/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-08-13 14:33:17
 * @LastEditTime: 2021-08-27 15:27:19
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

// 添加商品
export interface AddGodds {
  name: string;
  subTitle: string;
  coverImg: string;
  bannerPathList: string[];
  categories: string;
  price: number;
  discountPrice: number;
  stock: string;
  isNewest: boolean;
  isRecommend: boolean;
  status: boolean;
  desc: string;
}

// 更新商品信息
export interface UpdateGodds {
  name: string;
  subTitle: string;
  coverImg: string;
  bannerPathList: string[];
  categories: string;
  price: number;
  discountPrice: number;
  stock: string;
  isNewest: boolean;
  isRecommend: boolean;
  status: boolean;
  desc: string;
}
