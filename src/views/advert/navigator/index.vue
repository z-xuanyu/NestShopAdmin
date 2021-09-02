<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-08-27 16:36:12
 * @LastEditTime: 2021-09-02 10:49:15
 * @Description: Modify here please
-->
<template>
  <div class="navigator-page">
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增导航 </a-button>
      </template>
      <template #icon="{ record }">
        <TableImg :size="60" :imgList="[record.icon]" />
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
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicTable, useTable, TableAction, TableImg } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';
  import NavigatorModal from './NavigatorModal.vue';
  import { getNavigators, delNavigator } from '/@/api/navigator';
  import { columns, searchFormSchema } from './navigator.data';
  import { useMessage } from '/@/hooks/web/useMessage';
  export default defineComponent({
    name: 'Navigator',
    components: {
      NavigatorModal,
      BasicTable,
      TableAction,
      TableImg,
    },
    setup() {
      const { createMessage } = useMessage();
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
      // 编辑导航
      const handleEdit = (record: Recordable) => {
        openModal(true, {
          record,
          isUpdate: true,
        });
      };
      // 删除
      const handleDelete = async (record: Recordable) => {
        await delNavigator(record._id);
        handleSuccess();
        createMessage.success('删除成功!');
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
        handleEdit,
        handleDelete,
      };
    },
  });
</script>
