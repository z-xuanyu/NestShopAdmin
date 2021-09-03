/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-08-11 16:09:00
 * @LastEditTime: 2021-09-03 15:36:11
 * @Description: Modify here please
 */
import { BasicColumn, FormSchema } from '/@/components/Table';
import dayjs from 'dayjs';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
export const columns: BasicColumn[] = [
  {
    title: '名称',
    dataIndex: 'name',
    width: 50,
    align: 'left',
  },
  {
    title: '会员头像',
    dataIndex: 'avatarImg',
    width: 80,
    align: 'center',
    slots: { customRender: 'avatarImg' },
  },
  {
    title: '性别',
    dataIndex: 'gender',
    width: 40,
    align: 'center',
    customRender: ({ record }) => {
      return h(
        Tag,
        {
          color: record.gender == 1 ? '#2db7f5' : '#87d068',
        },
        record.gender == 1 ? '男' : '女'
      );
    },
  },
  {
    title: '手机号',
    dataIndex: 'phone',
    width: 80,
    align: 'left',
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    width: 80,
    align: 'left',
  },
  {
    title: '消费金额',
    dataIndex: 'consumeMoney',
    width: 40,
    align: 'center',
  },
  {
    title: '消费次数',
    dataIndex: 'consumeCount',
    width: 40,
    align: 'center',
  },
  {
    title: '会员登录次数',
    dataIndex: 'loginCount',
    width: 40,
    align: 'center',
  },
  {
    title: '最后登录时间',
    dataIndex: 'loginTime',
    width: 80,
    align: 'center',
    customRender: ({ record }) => {
      return dayjs(record.createdAt).format('YYYY-MM-DD HH:mm');
    },
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    width: 80,
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
