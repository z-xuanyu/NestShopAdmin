<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-08-25 15:38:29
 * @LastEditTime: 2021-08-26 17:31:41
 * @Description: Modify here please
-->
<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    :title="getTitle"
    width="50%"
    showFooter
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm">
      <!-- 商品主图 -->
      <template #coverImg="{ model, field }">
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
      <template #bannerPathList>
        <div class="clearfix">
          <a-upload
            :customRequest="handleBannerImageUploadRequest"
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
  import { defineComponent, ref, unref, computed, watch } from 'vue';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { goodsDrawerFormSchema } from './goods.data';
  import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue';
  import { Upload } from 'ant-design-vue';
  import { FileInfo, FileItem } from '../category/type';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { uploadAvatar } from '/@/api/system/account';
  import { getGoodsCategories } from '/@/api/goods';
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
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const { createMessage } = useMessage();
      const [registerForm, { resetFields, setFieldsValue, updateSchema, validate }] = useForm({
        labelWidth: 120,
        showResetButton: false,
        showSubmitButton: false,
        schemas: goodsDrawerFormSchema,
        actionColOptions: {
          span: 24,
        },
      });
      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        resetFields();
        setDrawerProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;
        if (unref(isUpdate)) {
          setFieldsValue({
            ...data.record,
          });
        }

        // 商品分类
        const goodsCategories = await getGoodsCategories();
        updateSchema({
          field: 'categories',
          componentProps: { treeData: goodsCategories.items },
        });
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '添加商品' : '编辑商品'));
      // 商品主图上传
      const handleImageUploadRequest = async (file) => {
        const res = await uploadAvatar({ file: file.file });
        setFieldsValue({
          coverImg: res.data.result.url,
        });
      };
      // 图片上传之前处理
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
      const goodsBannerFileList = ref<GoodsBnanerFileItem[]>([]); // 商品轮播图
      const handlePreviewCancel = () => {
        previewVisible.value = false;
      };
      const handlePreview = async (file: FileItem) => {
        previewImage.value = file.url;
        previewVisible.value = true;
      };
      // 商品轮播图上传
      const handleBannerImageUploadRequest = async (file) => {
        const res = await uploadAvatar({ file: file.file });
        goodsBannerFileList.value.push({
          uid: new Date().getTime().toString(),
          status: 'done',
          url: res.data.result.url,
        });
        goodsBannerFileList.value = goodsBannerFileList.value.filter((item) => item.url);
        console.log(goodsBannerFileList.value, 45456);
      };
      // 监听商品轮播图变化
      watch(
        () => goodsBannerFileList.value,
        () => {
          setFieldsValue({
            bannerPathList: goodsBannerFileList.value.map((item) => item.url),
          });
        }
      );
      // 保存提交商品表单信息
      const handleSubmit = async () => {
        try {
          const values = await validate();
          setDrawerProps({ confirmLoading: true });
          // TODO custom api
          console.log(values);
          closeDrawer();
          emit('success');
        } finally {
          setDrawerProps({ confirmLoading: false });
        }
      };
      return {
        handleSubmit,
        registerForm,
        registerDrawer,
        resetFields,
        beforeUpload,
        handleImageUploadRequest,
        handleBannerImageUploadRequest,
        fileList,
        loading,
        handleUploadChange,
        previewVisible,
        previewImage,
        goodsBannerFileList,
        handlePreviewCancel,
        handlePreview,
        getTitle,
      };
    },
  });
</script>
