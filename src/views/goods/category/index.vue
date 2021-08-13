<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-08-12 14:47:31
 * @LastEditTime: 2021-08-13 16:38:09
 * @Description: Modify here please
-->
<template>
  <div class="goods-category">
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增分类 </a-button>
      </template>
      <template #pic="{ record }">
        <TableImg :size="40" :imgList="[record.pic]" />
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
    <CategoryModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicTable, useTable, TableAction, TableImg } from '/@/components/Table';
  import { columns, searchFormSchema } from './category.data';
  import { getGoodsCategories, delCategory } from '/@/api/goods';
  import { useModal } from '/@/components/Modal';
  import { useMessage } from '/@/hooks/web/useMessage';
  import CategoryModal from './CategoryModal.vue';
  export default defineComponent({
    name: 'GoodsCategory',
    components: {
      BasicTable,
      TableAction,
      TableImg,
      CategoryModal,
    },
    setup() {
      const { createMessage } = useMessage();
      const [registerModal, { openModal }] = useModal();
      const [registerTable, { reload }] = useTable({
        title: '商品分类',
        api: getGoodsCategories,
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
      // 编辑
      const handleEdit = (record: Recordable) => {
        openModal(true, {
          record,
          isUpdate: true,
        });
      };
      // 添加
      const handleCreate = () => {
        openModal(true, {
          isUpdate: false,
        });
      };

      const handleSuccess = () => {
        reload();
      };
      // 处理删除
      const handleDelete = async (record: Recordable) => {
        await delCategory(record._id);
        reload();
        createMessage.success('删除成功!');
      };
      return {
        registerTable,
        handleEdit,
        handleCreate,
        handleDelete,
        handleSuccess,
        registerModal,
      };
    },
  });
</script>

<style></style>
