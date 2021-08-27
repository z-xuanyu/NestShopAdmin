<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-08-12 14:50:41
 * @LastEditTime: 2021-08-27 14:52:56
 * @Description: Modify here please
-->
<template>
  <div class="goods-list">
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增商品 </a-button>
      </template>
      <template #coverImg="{ record }">
        <TableImg :size="40" :imgList="[record.coverImg]" />
      </template>
      <template #categories="{ record }">
        <a-tag color="#2db7f5">{{ record.categories.name }}</a-tag>
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
    <GoodsDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicTable, useTable, TableAction, TableImg } from '/@/components/Table';
  import { columns, searchFormSchema } from './goods.data';
  import { useDrawer } from '/@/components/Drawer';
  import GoodsDrawer from './GoodsDrawer.vue';
  import { getGoodsList, delGoods } from '/@/api/goods';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { Tag } from 'ant-design-vue';
  export default defineComponent({
    name: 'GoodsList',
    components: {
      BasicTable,
      TableAction,
      GoodsDrawer,
      TableImg,
      [Tag.name]: Tag,
    },
    setup() {
      const { createMessage } = useMessage();
      const [registerTable, { reload }] = useTable({
        title: '商品列表',
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
        },
        api: getGoodsList,
        pagination: true,
        striped: false,
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        showIndexColumn: true,
        canResize: false,
        actionColumn: {
          width: 80,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
          fixed: undefined,
        },
      });
      const [registerDrawer, { openDrawer }] = useDrawer();
      // 添加商品
      function handleCreate() {
        openDrawer(true, {
          isUpdate: false,
        });
      }
      // 编辑商品
      const handleEdit = (record: Recordable) => {
        openDrawer(true, {
          record,
          isUpdate: true,
        });
      };
      const handleSuccess = () => {
        reload();
      };
      // 删除商品
      const handleDelete = async (record: Recordable) => {
        await delGoods(record._id);
        createMessage.success('删除成功!');
        reload();
      };
      return {
        registerTable,
        registerDrawer,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
      };
    },
  });
</script>

<style></style>
