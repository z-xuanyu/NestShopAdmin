/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-09-01 14:17:47
 * @LastEditTime: 2021-09-01 17:51:36
 * @Description: Modify here please
 */
import { BasicColumn, FormSchema } from '/@/components/Table';
import dayjs from 'dayjs';
export const columns: BasicColumn[] = [
  {
    title: 'Banner名称',
    dataIndex: 'name',
    width: 160,
    align: 'left',
  },
  {
    title: 'Banner类型',
    dataIndex: 'type',
    width: 80,
    align: 'center',
    customRender: ({ record }) => {
      return record.type == 1 ? '无跳转' : record.type == 2 ? '外链' : '商品';
    },
  },
  {
    title: 'Banner图片',
    dataIndex: 'pic',
    width: 160,
    align: 'center',
    slots: { customRender: 'pic' },
  },
  {
    title: '外链地址',
    dataIndex: 'targetUrl',
    width: 160,
    align: 'left',
  },
  {
    title: '关联商品',
    dataIndex: 'commodityId',
    width: 160,
    align: 'left',
    customRender: ({ record }) => {
      return record.commodityId.name;
    },
  },
  {
    title: '创建时间',
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
    field: 'name',
    label: 'Banner名称',
    component: 'Input',
    labelWidth: 80,
    colProps: { span: 4 },
  },
];
// 添加 编辑 form
export const formSchema: FormSchema[] = [
  {
    field: 'name',
    label: '名称',
    component: 'Input',
    colProps: {
      span: 16,
    },
    required: true,
  },
  {
    field: 'type',
    label: '类型',
    component: 'Select',
    required: true,
    colProps: {
      span: 16,
    },
    componentProps: ({ formActionType }) => {
      return {
        options: [
          {
            label: '无跳转',
            value: 1,
            key: 1,
          },
          {
            label: '外链',
            value: 2,
            key: 2,
          },
          {
            label: '关联商品',
            value: 3,
            key: 3,
          },
        ],
        onSelect(value: number) {
          // 动态显示
          formActionType.updateSchema({
            field: 'commodityId',
            show: value == 3 ? true : false,
          });
          // 动态显示
          formActionType.updateSchema({
            field: 'targetUrl',
            show: value == 2 ? true : false,
          });
        },
      };
    },
  },
  {
    field: 'pic',
    label: '图片',
    component: 'Input',
    required: true,
    slot: 'pic',
  },
  {
    field: 'targetUrl',
    label: '链接地址',
    component: 'Input',
    colProps: {
      span: 16,
    },
    show: false,
  },
  {
    field: 'commodityId',
    label: '关联商品',
    component: 'Input',
    colProps: {
      span: 16,
    },
    show: false,
    slot: 'commodityId',
  },
];
