<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-07-20 10:38:11
 * @LastEditTime: 2021-08-13 14:41:04
 * @Description: Modify here please
-->
<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm">
      <!-- 分类图 -->
      <template #pic="{ model, field }">
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
            <div class="ant-upload-text">分类图</div>
          </div>
        </a-upload>
      </template>
    </BasicForm>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref, reactive, toRefs } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue';
  import { Upload } from 'ant-design-vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './category.data';
  import { getGoodsCategories, addCategory, updateCategory } from '/@/api/goods';
  import { uploadAvatar } from '/@/api/system/account';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { FileInfo, FileItem } from './type';
  export default defineComponent({
    name: 'CategoryModal',
    components: {
      BasicModal,
      BasicForm,
      PlusOutlined,
      LoadingOutlined,
      [Upload.name]: Upload,
    },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const state = reactive({
        categoryId: '',
      });
      const { createMessage } = useMessage();
      const isUpdate = ref(true);
      const [registerForm, { resetFields, setFieldsValue, updateSchema, validate }] = useForm({
        labelWidth: 80,
        schemas: formSchema,
        showActionButtonGroup: false,
      });
      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        resetFields();
        setModalProps({ confirmLoading: false });

        isUpdate.value = !!data?.isUpdate;
        if (unref(isUpdate)) {
          state.categoryId = data.record._id;
          setFieldsValue({
            ...data.record,
          });
        }

        const categoryTree = await getGoodsCategories();
        updateSchema({
          field: 'parentId',
          componentProps: { treeData: categoryTree.items },
        });
      });
      const getTitle = computed(() => (!unref(isUpdate) ? '新增分类' : '编辑分类'));
      async function handleSubmit() {
        try {
          const values = await validate();
          setModalProps({ confirmLoading: true });
          // 新增
          if (!unref(isUpdate)) {
            await addCategory(values);
            createMessage.success('添加成功!');
          } else {
            // 编辑
            await updateCategory(state.categoryId, values);
            createMessage.success('编辑成功!');
          }
          closeModal();
          emit('success');
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

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
      return {
        ...toRefs(state),
        registerModal,
        registerForm,
        getTitle,
        handleSubmit,
        handleUploadChange,
        handleImageUploadRequest,
        beforeUpload,
        loading,
        fileList,
      };
    },
  });
</script>
