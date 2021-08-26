<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-08-25 15:38:29
 * @LastEditTime: 2021-08-26 11:15:32
 * @Description: Modify here please
-->
<template>
  <BasicDrawer v-bind="$attrs" title="添加商品" width="50%" showFooter @ok="handleOk">
    <BasicForm @register="register">
      <!-- 商品主图 -->
      <template #goods_pic="{ model, field }">
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
            <div class="ant-upload-text">商品主图</div>
          </div>
        </a-upload>
      </template>
      <!-- 商品banner图 -->
      <template #goods_banner>
        <div class="clearfix">
          <a-upload
            :customRequest="handleImageUploadRequest"
            list-type="picture-card"
            v-model:file-list="goodsBannerFileList"
            @preview="handlePreview"
          >
            <div v-if="goodsBannerFileList.length < 8">
              <plus-outlined />
              <div class="ant-upload-text">商品轮播图</div>
            </div>
          </a-upload>
          <!-- <a-modal :visible="previewVisible" :footer="null" @cancel="handlePreviewCancel">
            <img alt="example" style="width: 100%" :src="previewImage" />
          </a-modal> -->
        </div>
      </template>
    </BasicForm>
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { BasicDrawer } from '/@/components/Drawer';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { goodsDrawerFormSchema } from './goods.data';
  import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue';
  import { Upload } from 'ant-design-vue';
  import { FileInfo, FileItem } from '../category/type';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { uploadAvatar } from '/@/api/system/account';
  interface GoodsBnanerFileItem {
    uid: string;
    name?: string;
    status?: string;
    response?: string;
    percent?: number;
    url?: string;
    preview?: string;
    originFileObj?: any;
  }
  export default defineComponent({
    name: 'GoodsDrawer',
    components: { BasicDrawer, BasicForm, PlusOutlined, LoadingOutlined, [Upload.name]: Upload },
    setup() {
      const { createMessage } = useMessage();
      const [register, { resetFields, setFieldsValue }] = useForm({
        labelWidth: 120,
        showResetButton: false,
        showSubmitButton: false,
        schemas: goodsDrawerFormSchema,
        actionColOptions: {
          span: 24,
        },
      });

      // 图片上传自定义请求
      const handleImageUploadRequest = async (file) => {
        const res = await uploadAvatar({ file: file.file });
        setFieldsValue({
          pic: res.data.result.url,
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

      // 商品轮播图
      const previewVisible = ref<boolean>(false); // 是否显示商品预览图
      const previewImage = ref<string | undefined>(''); // 商品预览图
      const goodsBannerFileList = ref<GoodsBnanerFileItem[]>([
        {
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
          uid: '-2',
          name: 'image.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
      ]);
      const handlePreviewCancel = () => {
        previewVisible.value = false;
      };
      const handlePreview = async (file: FileItem) => {
        previewImage.value = file.url;
        previewVisible.value = true;
      };
      return {
        handleOk: () => {
          console.log('=====================');
          console.log('ok');
          console.log('======================');
        },
        register,
        resetFields,
        beforeUpload,
        handleImageUploadRequest,
        fileList,
        loading,
        handleUploadChange,
        previewVisible,
        previewImage,
        goodsBannerFileList,
        handlePreviewCancel,
        handlePreview,
      };
    },
  });
</script>
