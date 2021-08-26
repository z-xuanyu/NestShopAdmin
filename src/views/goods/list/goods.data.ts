/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-08-13 16:19:45
 * @LastEditTime: 2021-08-26 18:07:03
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
    dataIndex: 'coverImg',
    width: 80,
    align: 'center',
  },
  {
    title: '商品分类',
    dataIndex: 'categories',
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
    dataIndex: 'isRecommend',
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
    componentProps: {
      placeholder: '请输入商品名称',
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
    componentProps: {
      placeholder: '请输入商品副标题',
    },
    required: true,
  },
  {
    field: 'coverImg',
    component: 'Input',
    label: '商品主图',
    colProps: {
      span: 16,
    },
    slot: 'coverImg',
    componentProps: {
      placeholder: '请上传商品主图',
    },
    required: true,
  },
  {
    field: 'bannerPathList',
    component: 'Input',
    label: '商品轮播图',
    colProps: {
      span: 16,
    },
    required: true,
    slot: 'bannerPathList',
    componentProps: {
      placeholder: '请上传商品轮播图',
    },
  },
  {
    field: 'categories',
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
    field: 'price',
    component: 'InputNumber',
    label: '原价格',
    colProps: {
      span: 16,
    },
    componentProps: {
      placeholder: '请输入价格',
    },
    required: true,
  },
  {
    field: 'discountPrice',
    component: 'InputNumber',
    label: '折扣价',
    colProps: {
      span: 16,
    },
    componentProps: {
      placeholder: '请输入折扣价',
    },
    required: true,
  },
  {
    field: 'stock',
    component: 'InputNumber',
    label: '库存',
    colProps: {
      span: 16,
    },
    componentProps: {
      placeholder: '请输入库存',
    },
    required: true,
  },
  {
    field: 'isNewest',
    component: 'Switch',
    label: '是否新品',
    colProps: {
      span: 16,
    },
    required: true,
  },
  {
    field: 'isRecommend',
    component: 'Switch',
    label: '是否热门',
    colProps: {
      span: 16,
    },
    required: true,
  },
  {
    field: 'status',
    component: 'Switch',
    label: '是否上架',
    colProps: {
      span: 16,
    },
    required: true,
  },
  {
    field: 'desc',
    component: 'Input',
    label: '商品详情',
    defaultValue: '商品详情',
    rules: [{ required: true }],
    render: ({ model, field }) => {
      return h(Tinymce, {
        value: model[field],
        onChange: (value: string) => {
          model[field] = value;
        },
        height: 600,
      });
    },
  },
];
