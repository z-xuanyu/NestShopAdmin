<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-09-07 14:01:26
 * @LastEditTime: 2021-09-07 16:33:04
 * @Description: Modify here please
-->
<template>
  <div class="goods-rating">
    <BasicTable @register="registerTable">
      <template #commoditiesId="{ record }">
        <TableImg :size="40" :imgList="[record.commoditiesId.coverImg]" />
        <span> {{ record.commoditiesId.name }} </span>
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
    <RatingModel @register="registerModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicTable, useTable, TableAction, TableImg } from '/@/components/Table';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useModal } from '/@/components/Modal';
  import { searchFormSchema, columns } from './rating.data';
  import RatingModel from './RatingModel.vue';
  import { getGoodsCommoditiesRatings } from '/@/api/goods';
  export default defineComponent({
    name: 'GoodsRating',
    components: {
      BasicTable,
      TableAction,
      RatingModel,
      TableImg,
    },
    setup() {
      const { createMessage } = useMessage();
      const [registerModal, { openModal }] = useModal();
      const [registerTable, { reload }] = useTable({
        title: '商品评价',
        api: getGoodsCommoditiesRatings,
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

      const handleSuccess = () => {
        reload();
      };
      // 处理删除
      const handleDelete = async (record: Recordable) => {
        console.log(record._id);
        reload();
        createMessage.success('删除成功!');
      };
      return {
        registerTable,
        registerModal,
        handleEdit,
        handleSuccess,
        handleDelete,
      };
    },
  });
</script>
