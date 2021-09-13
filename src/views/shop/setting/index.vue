<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-09-13 16:59:26
 * @LastEditTime: 2021-09-13 18:17:06
 * @Description: Modify here please
-->
<template>
  <div class="w-full p-5">
    <a-card title="店铺信息" :bordered="false">
      <BasicForm @register="registerForm" @submit="handleSubmit">
        <template #logo="{ model, field }">
          <a-upload
            v-model:file-list="fileList"
            list-type="picture-card"
            class="avatar-uploader"
            :show-upload-list="false"
            :customRequest="handleImageUploadRequest"
            :before-upload="beforeUpload"
            @change="handleUploadChange"
          >
            <img v-if="model[field]" :src="model[field]" />
            <div v-else>
              <loading-outlined v-if="loading" />
              <plus-outlined v-else />
              <div class="ant-upload-text">logo</div>
            </div>
          </a-upload>
        </template>
      </BasicForm>
    </a-card>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue';
  import { Card, Upload } from 'ant-design-vue';
  import { formSchema } from './setting.data';
  import { uploadAvatar } from '/@/api/system/account';
  import { FileInfo, FileItem } from '/#/axios';
  import { useMessage } from '/@/hooks/web/useMessage';
  export default defineComponent({
    name: 'ShopSetting',
    components: {
      [Card.name]: Card,
      BasicForm,
      PlusOutlined,
      LoadingOutlined,
      [Upload.name]: Upload,
    },
    setup() {
      const { createMessage } = useMessage();
      const [registerForm, { validate, setProps, setFieldsValue }] = useForm({
        labelWidth: 80,
        schemas: formSchema,
        showActionButtonGroup: false,
        actionColOptions: {
          span: 20,
        },
      });

      // 图片上传自定义请求
      const handleImageUploadRequest = async (file) => {
        const res = await uploadAvatar({ file: file.file });
        setFieldsValue({
          logo: res.data.result.url,
        });
      };
      // 图片上传
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
      async function handleSubmit() {
        const values = await validate();
        console.log(values);
      }
      return {
        registerForm,
        handleSubmit,
        setProps,
        formSchema,
        beforeUpload,
        handleImageUploadRequest,
        handleUploadChange,
        fileList,
        loading,
      };
    },
  });
</script>
