/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-08-13 16:19:45
 * @LastEditTime: 2021-08-26 10:11:28
 * @Description: Modify here please
 */
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import dayjs from 'dayjs';
import { Tinymce } from '/@/components/Tinymce/index';
import { h } from 'vue';

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

// 添加编辑
export const goodsDrawerFormSchema: FormSchema[] = [
  {
    field: 'name',
    component: 'Input',
    label: '商品名称',
    colProps: {
      span: 16,
    },
    required: true,
  },
  {
    field: 'subTitle',
    component: 'Input',
    label: '商品副标题',
    colProps: {
      span: 16,
    },
    required: true,
  },
  {
    field: 'goods_pic',
    component: 'Input',
    label: '商品主图',
    colProps: {
      span: 16,
    },
    slot: 'goods_pic',
    required: true,
  },
  {
    field: 'goods_banner',
    component: 'Input',
    label: '商品轮播图',
    colProps: {
      span: 16,
    },
    required: true,
    slot: 'goods_banner',
  },
  {
    field: 'goods_category',
    label: '商品分类',
    component: 'TreeSelect',
    colProps: {
      span: 10,
    },
    componentProps: {
      placeholder: '请选择商品分类',
      replaceFields: {
        title: 'name',
        key: '_id',
        value: '_id',
      },
      getPopupContainer: () => document.body,
    },
    required: true,
  },
  {
    field: 'goods_price',
    component: 'InputNumber',
    label: '原价格',
    colProps: {
      span: 16,
    },
    required: true,
  },
  {
    field: 'goods_z_price',
    component: 'InputNumber',
    label: '折扣价',
    colProps: {
      span: 16,
    },
    required: true,
  },
  {
    field: 'goods_k',
    component: 'InputNumber',
    label: '库存',
    colProps: {
      span: 16,
    },
    required: true,
  },
  {
    field: 'goods_new',
    component: 'Switch',
    label: '是否新品',
    colProps: {
      span: 16,
    },
    required: true,
  },
  {
    field: 'goods_hot',
    component: 'Switch',
    label: '是否热门',
    colProps: {
      span: 16,
    },
    required: true,
  },
  {
    field: 'goods_status',
    component: 'Switch',
    label: '是否上架',
    colProps: {
      span: 16,
    },
    required: true,
  },
  {
    field: 'goods_desc',
    component: 'Input',
    label: '商品详情',
    defaultValue: 'defaultValue',
    rules: [{ required: true }],
    render: ({ model, field }) => {
      return h(Tinymce, {
        value: model[field],
        onChange: (value: string) => {
          model[field] = value;
        },
      });
    },
  },
];
