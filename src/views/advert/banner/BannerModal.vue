<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-09-01 14:17:59
 * @LastEditTime: 2021-09-01 17:52:42
 * @Description: Modify here please
-->
<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm">
      <!-- 图片 -->
      <template #pic="{ model, field }">
        <a-upload
          v-model:file-list="fileList"
          name="avatar"
          list-type="picture-card"
          class="avatar-uploader"
          :show-upload-list="false"
          :customRequest="handleImageUploadRequest"
          :before-upload="beforeUpload"
          @change="handleUploadChange"
        >
          <img v-if="model[field]" :src="model[field]" alt="avatar" />
          <div v-else>
            <loading-outlined v-if="loading" />
            <plus-outlined v-else />
            <div class="ant-upload-text">图片</div>
          </div>
        </a-upload>
      </template>
      <!-- 关联商品 -->
      <template #commodityId="{ model, field }">
        <ApiSelect
          :api="getGoodsList"
          showSearch
          placeholder="请选择关联商品"
          v-model:value="model[field]"
          :filterOption="false"
          resultField="items"
          labelField="name"
          valueField="_id"
        />
      </template>
    </BasicForm>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, unref, computed } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm, ApiSelect } from '/@/components/Form/index';
  import { formSchema } from './banner.data';
  import { uploadAvatar } from '/@/api/system/account';
  import { getGoodsList } from '/@/api/goods';
  import { addBanner, updateBanner } from '/@/api/banner';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue';
  import { Upload } from 'ant-design-vue';
  import { FileInfo, FileItem } from '/#/axios';
  export default defineComponent({
    name: 'BannerModal',
    components: {
      BasicModal,
      BasicForm,
      PlusOutlined,
      LoadingOutlined,
      ApiSelect,
      [Upload.name]: Upload,
    },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const { createMessage } = useMessage();
      let bannerId = ''; // bannerId
      // 表单配置
      const [registerForm, { resetFields, setFieldsValue, validate, updateSchema }] = useForm({
        labelWidth: 80,
        schemas: formSchema,
        showActionButtonGroup: false,
      });
      // Modal
      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        resetFields();
        setModalProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;
        // 编辑
        if (unref(isUpdate)) {
          updateSchema({
            field: 'commodityId',
            show: data.record.type == 3 ? true : false,
          });
          updateSchema({
            field: 'targetUrl',
            show: data.record.type == 2 ? true : false,
          });
          bannerId = data.record._id;
          setFieldsValue({
            ...data.record,
            commodityId: data.record.commodityId._id,
          });
        }
      });
      const getTitle = computed(() => (!unref(isUpdate) ? '新增Bnaner' : '编辑Banner'));
      // 图片上传自定义请求
      const handleImageUploadRequest = async (file) => {
        const res = await uploadAvatar({ file: file.file });
        setFieldsValue({
          pic: res.data.result.url,
        });
      };
      // 图片上传前处理文件类型和大小
      const beforeUpload = (file: FileItem) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
          createMessage.error('上传图片格式必须为JPG/PNG');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          createMessage.error('图片大小已超过2MB!');
        }
        return isJpgOrPng && isLt2M;
      };
      const fileList = ref([]);
      const loading = ref<boolean>(false);
      // 上传改变
      const handleUploadChange = (info: FileInfo) => {
        if (info.file.status === 'uploading') {
          loading.value = true;
          return;
        }
        if (info.file.status === 'done') {
          loading.value = false;
        }
        if (info.file.status === 'error') {
          loading.value = false;
          createMessage.error('upload error');
        }
      };
      // 提交
      async function handleSubmit() {
        try {
          const values = await validate();
          setModalProps({ confirmLoading: true });
          // 新增
          console.log(values);
          if (!unref(isUpdate)) {
            // 添加Banner
            await addBanner(values);
          } else {
            // 编辑Banner
            await updateBanner(bannerId, values);
          }
          closeModal();
          emit('success');
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }
      return {
        registerForm,
        registerModal,
        getTitle,
        handleSubmit,
        handleImageUploadRequest,
        beforeUpload,
        handleUploadChange,
        fileList,
        loading,
        getGoodsList,
      };
    },
  });
</script>
