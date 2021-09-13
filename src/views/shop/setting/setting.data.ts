/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-09-13 17:23:50
 * @LastEditTime: 2021-09-13 18:11:16
 * @Description: Modify here please
 */
import { FormSchema } from '/@/components/Table';
import { Tinymce } from '/@/components/Tinymce/index';
import { h } from 'vue';
export const formSchema: FormSchema[] = [
  {
    field: 'name',
    label: '商城名称：',
    component: 'Input',
    required: true,
    colProps: {
      span: 10,
    },
    componentProps: {
      placeholder: '请输入商城名称',
    },
  },
  {
    field: 'logo',
    label: '店铺logo：',
    component: 'Input',
    slot: 'logo',
    required: true,
  },
  {
    field: 'phone',
    label: '客服电话：',
    component: 'Input',
    colProps: {
      span: 10,
    },
    componentProps: {
      placeholder: '请输入设置的客服电话',
    },
  },
  {
    field: 'copyright',
    component: 'RadioGroup',
    label: '版权链接：',
    colProps: {
      span: 24,
    },
    defaultValue: true,
    componentProps: {
      options: [
        {
          label: '开启',
          value: true,
        },
        {
          label: '关闭',
          value: false,
        },
      ],
    },
  },
  {
    field: 'memberAgreement',
    component: 'Input',
    label: '会员注册协议：',
    labelWidth: 100,
    defaultValue: '本《用户注册协议》是您（以下亦称“用户”）',
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
  {
    field: 'anchorAgreement',
    component: 'Input',
    label: '主播服务协议：',
    labelWidth: 100,
    defaultValue: '本《用户注册协议》是您（以下亦称“用户”）',
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
  {
    field: 'privacyAgreement',
    component: 'Input',
    label: '用户隐私协议：',
    labelWidth: 100,
    defaultValue: '本《用户注册协议》是您（以下亦称“用户”）',
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
