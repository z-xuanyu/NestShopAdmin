/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-09-14 14:07:55
 * @LastEditTime: 2021-09-14 14:16:48
 * @Description: Modify here please
 */
import { BasicColumn, FormSchema } from '/@/components/Table';
import dayjs from 'dayjs';
export const columns: BasicColumn[] = [
  {
    title: '标题',
    dataIndex: 'title',
    width: 200,
    align: 'center',
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
    label: '页面标题',
    component: 'Input',
    labelWidth: 80,
    colProps: { span: 4 },
  },
];
