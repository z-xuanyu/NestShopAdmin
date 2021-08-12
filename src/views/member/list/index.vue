<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-08-11 15:53:23
 * @LastEditTime: 2021-08-12 14:45:06
 * @Description: Modify here please
-->
<template>
  <div class="member-list">
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增会员 </a-button>
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
    <MemberModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';
  import MemberModal from './MemberModal.vue';
  import { getMemberList } from '/@/api/member';
  import { columns, searchFormSchema } from './membrtList.data';
  export default defineComponent({
    name: 'MemberList',
    components: {
      BasicTable,
      TableAction,
      MemberModal,
    },
    setup() {
      const [registerModal, { openModal }] = useModal();

      const [registerTable, { reload }] = useTable({
        title: '账号列表',
        api: getMemberList,
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

      // 添加会员
      const handleCreate = () => {
        openModal(true, {
          isUpdate: false,
        });
      };

      // 编辑会员
      const handleEdit = (record: Recordable) => {
        openModal(true, {
          record,
          isUpdate: true,
        });
      };

      // 删除
      const handleDelete = (record: Recordable) => {
        console.log(record._id);
        handleSuccess();
      };

      const handleSuccess = () => {
        reload();
      };
      return {
        registerModal,
        registerTable,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
      };
    },
  });
</script>

<style></style>
