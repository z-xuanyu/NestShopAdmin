/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-08-13 16:19:45
 * @LastEditTime: 2021-08-13 16:40:20
 * @Description: Modify here please
 */
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import dayjs from 'dayjs';

export const columns: BasicColumn[] = [
  {
    title: '商品名称',
    dataIndex: 'name',
    width: 80,
    align: 'left',
  },
  {
    title: '商品图片',
    dataIndex: 'pic',
    width: 80,
    align: 'center',
  },
  {
    title: '商品分类',
    dataIndex: 'category',
    width: 80,
    align: 'center',
  },
  {
    title: '价格',
    dataIndex: 'price',
    width: 80,
    align: 'center',
  },
  {
    title: '销量',
    dataIndex: 'sales',
    width: 80,
    align: 'center',
  },
  {
    title: '库存',
    dataIndex: 'stock',
    width: 80,
    align: 'center',
  },
  {
    title: '浏览量',
    dataIndex: 'views',
    width: 80,
    align: 'left',
  },
  {
    title: '热门推荐',
    dataIndex: 'hot',
    width: 80,
    align: 'left',
  },
  {
    title: '是否上架',
    dataIndex: 'status',
    width: 80,
    align: 'left',
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    width: 180,
    customRender: ({ record }) => {
      return dayjs(record.createdAt).format('YYYY-MM-DD HH:mm');
    },
  },
  {
    title: '更新时间',
    dataIndex: 'updatedAt',
    width: 180,
    customRender: ({ record }) => {
      return dayjs(record.createdAt).format('YYYY-MM-DD HH:mm');
    },
  },
];
//  搜索form
export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '分类名称',
    component: 'Input',
    labelWidth: 80,
    colProps: { span: 4 },
  },
];
