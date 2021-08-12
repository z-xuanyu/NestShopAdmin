/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-08-11 16:09:00
 * @LastEditTime: 2021-08-12 11:00:07
 * @Description: Modify here please
 */
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import dayjs from 'dayjs';
export const columns: BasicColumn[] = [
  {
    title: '名称',
    dataIndex: 'name',
    width: 160,
    align: 'left',
  },
  {
    title: '手机号',
    dataIndex: 'phone',
    width: 160,
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
];

//  搜索form
export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '名称',
    component: 'Input',
    labelWidth: 50,
    colProps: { span: 4 },
  },
];

// 添加 form
export const formSchema: FormSchema[] = [
  {
    field: 'name',
    label: '名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'phone',
    label: '手机号',
    component: 'Input',
    rules: [{ required: true }],
  },
  {
    field: 'password',
    label: '密码',
    component: 'InputPassword',
    required: true,
  },
];
