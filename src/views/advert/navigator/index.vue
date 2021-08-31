<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-08-27 16:36:12
 * @LastEditTime: 2021-08-31 11:03:42
 * @Description: Modify here please
-->
<template>
  <BasicTable @register="registerTable">
    <template #toolbar>
      <a-button type="primary" @click="handleCreate"> 新增导航 </a-button>
    </template>
    <template #action="{ record }">
      <TableAction
        :actions="[
          {
            icon: 'clarity:note-edit-line',
            onClick: handleEdit.bind(null, record),
          },
          {
            icon: 'ant-design:delete-outlined',
            color: 'error',
            popConfirm: {
              title: '是否确认删除',
              confirm: handleDelete.bind(null, record),
            },
          },
        ]"
      />
    </template>
  </BasicTable>
  <NavigatorModal @register="registerModal" @success="handleSuccess" />
</template>

<script>
  import { defineComponent } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';
  import NavigatorModal from './NavigatorModal.vue';
  import { getNavigators } from '/@/api/navigator';
  import { columns, searchFormSchema } from './navigator.data';
  export default defineComponent({
    name: 'Navigator',
    components: {
      NavigatorModal,
      BasicTable,
      TableAction,
    },
    setup() {
      // Modal弹出层配置
      const [registerModal, { openModal }] = useModal();
      // 表格配置
      const [registerTable, { reload }] = useTable({
        title: '导航列表',
        api: getNavigators,
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
        },
        pagination: true,
        striped: false,
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        showIndexColumn: false,
        canResize: false,
        actionColumn: {
          width: 80,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
          fixed: undefined,
        },
      });
      // 添加导航
      const handleCreate = () => {
        openModal(true, {
          isUpdate: false,
        });
      };
      // 成功请求
      const handleSuccess = () => {
        reload();
      };
      return {
        registerTable,
        handleSuccess,
        registerModal,
        handleCreate,
      };
    },
  });
</script>
