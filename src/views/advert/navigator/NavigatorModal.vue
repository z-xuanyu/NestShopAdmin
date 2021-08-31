<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-08-31 10:00:42
 * @LastEditTime: 2021-08-31 10:47:56
 * @Description: Modify here please
-->
<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm">
      <!-- 头像 -->
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
            <div class="ant-upload-text">头像</div>
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
  //   import { addNavigator } from '/@/api/navigator';
  // 上传文件类型
  export interface FileItem {
    uid: string;
    name?: string;
    status?: string;
    response?: string;
    url?: string;
    type?: string;
    size: number;
    originFileObj: any;
  }
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
      // 表单配置
      const [registerForm, { resetFields, setFieldsValue, updateSchema, validate }] = useForm({
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
          setFieldsValue({
            ...data.record,
          });
        }
        // 如果编辑不显示密码输入框
        updateSchema({
          field: 'password',
          required: !unref(isUpdate),
          show: !unref(isUpdate),
        });
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
      // 提交
      async function handleSubmit() {
        try {
          const values = await validate();
          setModalProps({ confirmLoading: true });
          // 新增
          console.log(values);
          if (!unref(isUpdate)) {
            // TODO: 添加导航
          } else {
            // TODO: 编辑导航
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
      };
    },
  });
</script>
