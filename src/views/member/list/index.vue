<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-08-11 15:53:23
 * @LastEditTime: 2021-09-03 15:10:28
 * @Description: Modify here please
-->
<template>
  <div class="member-list">
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增会员 </a-button>
      </template>
      <template #avatarImg="{ record }">
        <TableImg :size="50" :imgList="[record.avatarImg]" />
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
  import { BasicTable, useTable, TableAction, TableImg } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';
  import MemberModal from './MemberModal.vue';
  import { getMembers, delMember } from '/@/api/member';
  import { columns, searchFormSchema } from './membrtList.data';
  import { useMessage } from '/@/hooks/web/useMessage';
  export default defineComponent({
    name: 'MemberList',
    components: {
      BasicTable,
      TableAction,
      MemberModal,
      TableImg,
    },
    setup() {
      const { createMessage } = useMessage();
      const [registerModal, { openModal }] = useModal();

      const [registerTable, { reload }] = useTable({
        title: '会员列表',
        api: getMembers,
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
      const handleDelete = async (record: Recordable) => {
        await delMember(record._id);
        handleSuccess();
        createMessage.success('删除成功!');
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
