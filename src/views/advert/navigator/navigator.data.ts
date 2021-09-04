/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-08-11 16:09:00
 * @LastEditTime: 2021-09-02 10:48:07
 * @Description: Modify here please
 */
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import dayjs from 'dayjs';
import { h } from 'vue';
import { Switch } from 'ant-design-vue';
export const columns: BasicColumn[] = [
  {
    title: '导航名称',
    dataIndex: 'name',
    width: 160,
    align: 'left',
  },
  {
    title: '导航图标',
    dataIndex: 'icon',
    width: 160,
    align: 'center',
    slots: { customRender: 'icon' },
  },
  {
    title: '链接地址',
    dataIndex: 'url',
    width: 160,
    align: 'left',
  },
  {
    title: '排序',
    dataIndex: 'sort',
    width: 160,
    align: 'left',
  },
  {
    title: '是否启用',
    dataIndex: 'status',
    width: 160,
    align: 'left',
    customRender: ({ record }) => {
      if (!Reflect.has(record, 'pendingStatus')) {
        record.pendingStatus = false;
      }
      return h(Switch, {
        checked: record.status,
        checkedChildren: '启用',
        unCheckedChildren: '禁用',
        loading: record.pendingStatus,
        // onChange(checked: boolean) {
        //   record.pendingStatus = true;
        //   const { createMessage } = useMessage();
        //   changeAdminStatus({ adminId: record._id, status: checked })
        //     .then(() => {
        //       record.status = checked;
        //       createMessage.success(`状态更改成功!`);
        //     })
        //     .catch(() => {})
        //     .finally(() => {
        //       record.pendingStatus = false;
        //     });
        // },
      });
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
    label: '导航名称',
    component: 'Input',
    labelWidth: 80,
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
    colProps: { span: 16 },
  },
  {
    field: 'url',
    label: '链接',
    component: 'Input',
    required: true,
    colProps: { span: 16 },
  },
  {
    field: 'icon',
    label: '图标',
    component: 'Input',
    rules: [{ required: true }],
    slot: 'icon',
  },
  {
    field: 'sort',
    label: '排序',
    component: 'InputNumber',
    required: true,
  },
];
