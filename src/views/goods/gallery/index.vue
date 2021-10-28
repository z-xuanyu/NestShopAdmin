<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-09-23 11:25:35
 * @LastEditTime: 2021-09-23 16:01:58
 * @Description: Modify here please
-->
<template>
  <PageWrapper title="素材库" content="图片素材">
    <CardList
      :params="params"
      :api="getGoodsGalleryList"
      @getMethod="getMethod"
      @delete="handleDel"
    >
      <template #header>
        <Button type="primary" color="success">上传素材</Button>
      </template>
    </CardList>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { CardList } from '/@/components/CardList';
  import { Button } from '/@/components/Button';
  import { PageWrapper } from '/@/components/Page';
  import { getGoodsGalleryList } from '/@/api/goods';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { delGoodsImg } from '/@/api/goods';
  const { notification } = useMessage();
  // 请求api时附带参数
  const params = {};

  let reload = () => {};
  // 获取内部fetch方法;
  function getMethod(m: any) {
    reload = m;
  }
  //删除按钮事件
  async function handleDel(name: string) {
    console.log(name);
    await delGoodsImg({ name: name });
    notification.success({ message: `成功删除${name}` });
    reload();
  }
</script>
