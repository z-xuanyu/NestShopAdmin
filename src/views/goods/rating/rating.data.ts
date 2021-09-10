/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-09-07 14:02:07
 * @LastEditTime: 2021-09-07 16:31:11
 * @Description: Modify here please
 */
import { BasicColumn, FormSchema } from '/@/components/Table';
import dayjs from 'dayjs';
import { h } from 'vue';
import { Rate } from 'ant-design-vue';

export const columns: BasicColumn[] = [
  {
    title: '商品信息',
    dataIndex: 'commoditiesId',
    width: 80,
    align: 'left',
    slots: { customRender: 'commoditiesId' },
  },
  {
    title: '会员信息',
    dataIndex: 'memberId',
    width: 80,
    align: 'left',
    customRender: ({ record }) => {
      return record.memberId.name;
    },
  },
  {
    title: '评价星级',
    dataIndex: 'starRating',
    width: 80,
    align: 'left',
    customRender: ({ record }) => {
      return h(Rate, {
        disabled: true,
        value: ~~record.starRating,
      });
    },
  },
  {
    title: '评价晒图',
    dataIndex: 'blueprint',
    width: 80,
    align: 'left',
  },
  {
    title: '回复评价',
    dataIndex: 'ratingContent',
    width: 80,
    align: 'left',
  },
  {
    title: '评论时间',
    dataIndex: 'createdAt',
    width: 180,
    customRender: ({ record }) => {
      return dayjs(record.createdAt).format('YYYY-MM-DD HH:mm');
    },
  },
];
//  搜索form
export const searchFormSchema: FormSchema[] = [
  {
    field: 'commoditiesId',
    label: '商品名称',
    component: 'Input',
    labelWidth: 80,
    colProps: { span: 4 },
  },
];
export const formSchema: FormSchema[] = [
  {
    field: 'ratingContent',
    label: '回复评论',
    component: 'InputTextArea',
    required: true,
    componentProps: {
      placeholder: '请输入回复的内容...',
    },
  },
];
