<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-08-12 14:50:41
 * @LastEditTime: 2021-08-25 15:47:06
 * @Description: Modify here please
-->
<template>
  <div class="goods-list">
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增商品 </a-button>
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
    <GoodsDrawer @register="handleGoodsDrawer" />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { columns, searchFormSchema } from './goods.data';
  import { useDrawer } from '/@/components/Drawer';
  import GoodsDrawer from './GoodsDrawer.vue';
  export default defineComponent({
    name: 'GoodsList',
    components: {
      BasicTable,
      TableAction,
      GoodsDrawer,
    },
    setup() {
      const [registerTable, { reload }] = useTable({
        title: '商品分类',
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
      const del = () => {
        reload();
      };
      const [handleGoodsDrawer, { openDrawer: handleCreate }] = useDrawer();
      return {
        registerTable,
        handleCreate,
        handleGoodsDrawer,
        del,
      };
    },
  });
</script>

<style></style>
