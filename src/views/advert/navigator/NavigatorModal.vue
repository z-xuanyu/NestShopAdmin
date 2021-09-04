<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-08-31 10:00:42
 * @LastEditTime: 2021-09-02 10:43:56
 * @Description: Modify here please
-->
<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm">
      <!-- icon图片 -->
      <template #icon="{ model, field }">
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
    </BasicForm>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, unref, computed } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './navigator.data';
  import { uploadAvatar } from '/@/api/system/account';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue';
  import { Upload } from 'ant-design-vue';
  import { FileInfo, FileItem } from '/#/axios';
  import { addNavigator, updateNavigator } from '/@/api/navigator';
  export default defineComponent({
    name: 'NavigatorModal',
    components: {
      BasicModal,
      BasicForm,
      PlusOutlined,
      LoadingOutlined,
      [Upload.name]: Upload,
    },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const { createMessage } = useMessage();
      let navigatorId = '';
      // 表单配置
      const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
        labelWidth: 80,
        schemas: formSchema,
        showActionButtonGroup: false,
      });
      // Modal
      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        resetFields();
        setModalProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;
        if (unref(isUpdate)) {
          navigatorId = data.record._id;
          setFieldsValue({
            ...data.record,
          });
        }
      });
      const getTitle = computed(() => (!unref(isUpdate) ? '新增导航' : '编辑导航'));
      // 图片上传自定义请求
      const handleImageUploadRequest = async (file) => {
        const res = await uploadAvatar({ file: file.file });
        setFieldsValue({
          icon: res.data.result.url,
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
          createMessage.error('图片上传失败！');
        }
      };
      // 提交
      async function handleSubmit() {
        try {
          const values = await validate();
          setModalProps({ confirmLoading: true });
          if (!unref(isUpdate)) {
            // 添加导航
            await addNavigator(values);
          } else {
            // 编辑导航
            await updateNavigator(navigatorId, values);
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
      };
    },
  });
</script>
