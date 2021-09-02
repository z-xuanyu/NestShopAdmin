<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-08-27 16:34:48
 * @LastEditTime: 2021-09-01 17:35:31
 * @Description: Modify here please
-->
<template>
  <div class="banner-page">
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增Banner </a-button>
      </template>
      <template #pic="{ record }">
        <TableImg :size="100" :imgList="[record.pic]" />
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
    <BannerModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicTable, useTable, TableAction, TableImg } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';
  import { columns, searchFormSchema } from './banner.data';
  import BannerModal from './BannerModal.vue';
  import { getBanners, delBanner } from '/@/api/banner';
  import { useMessage } from '/@/hooks/web/useMessage';
  export default defineComponent({
    name: 'Banner',
    components: {
      BasicTable,
      TableAction,
      BannerModal,
      TableImg,
    },
    setup() {
      const { createMessage } = useMessage();
      // Modal弹出层配置
      const [registerModal, { openModal }] = useModal();
      // 表格配置
      const [registerTable, { reload }] = useTable({
        title: 'Banner列表',
        api: getBanners,
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

      // 添加banner
      const handleCreate = () => {
        openModal(true, {
          isUpdate: false,
        });
      };
      // 编辑banner
      const handleEdit = (record: Recordable) => {
        openModal(true, {
          record,
          isUpdate: true,
        });
      };
      // 删除
      const handleDelete = async (record: Recordable) => {
        await delBanner(record._id);
        handleSuccess();
        createMessage.success('删除成功!');
      };
      // 成功请求
      const handleSuccess = () => {
        reload();
      };
      return {
        registerTable,
        registerModal,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
      };
    },
  });
</script>

<style></style>
