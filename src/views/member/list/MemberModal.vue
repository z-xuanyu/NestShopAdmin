<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-07-20 10:38:11
 * @LastEditTime: 2021-08-12 10:27:02
 * @Description: Modify here please
-->
<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm">
      <!-- 头像 -->
      <template #avatar="{ model, field }">
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
  import { defineComponent, ref, computed, unref, reactive, toRefs } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './membrtList.data';
  import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue';
  import { addAdmin, updateAdmin, uploadAvatar } from '/@/api/system/account';
  import { CheckboxGroup, Row, Col, Checkbox, Upload } from 'ant-design-vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { FileInfo, FileItem } from './type';
  export default defineComponent({
    name: 'AccountModal',
    components: {
      BasicModal,
      BasicForm,
      [CheckboxGroup.name]: CheckboxGroup,
      [Row.name]: Row,
      [Col.name]: Col,
      [Checkbox.name]: Checkbox,
      LoadingOutlined,
      PlusOutlined,
      [Upload.name]: Upload,
    },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const { createMessage } = useMessage();
      const state = reactive({
        adminId: '',
        roleList: [] as any,
      });
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
          state.adminId = data.record._id;
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
      const getTitle = computed(() => (!unref(isUpdate) ? '新增会员' : '编辑会员'));
      async function handleSubmit() {
        try {
          const values = await validate();
          setModalProps({ confirmLoading: true });
          // 新增
          if (!unref(isUpdate)) {
            await addAdmin(values);
          } else {
            // 编辑
            const data = {
              name: values.name,
              email: values.email,
              roleIds: values.roleIds,
            };
            await updateAdmin(state.adminId, data);
          }
          closeModal();
          emit('success');
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }
      // 图片上传自定义请求
      const handleImageUploadRequest = async (file) => {
        console.log(file, 'api');
        const res = await uploadAvatar({ file: file.file });
        console.log(res, '上传图片返回');
        setFieldsValue({
          avatar: res.data.result.url,
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
        beforeUpload,
        handleUploadChange,
        handleImageUploadRequest,
        fileList,
        loading,
      };
    },
  });
</script>
