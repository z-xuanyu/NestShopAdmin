<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-08-04 14:54:25
 * @LastEditTime: 2021-09-23 11:38:17
 * @Description: Modify here please
-->
<template>
  <ConfigProvider :locale="getAntdLocale">
    <AppProvider>
      <RouterView />
    </AppProvider>
  </ConfigProvider>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { ConfigProvider } from 'ant-design-vue';
  import { AppProvider } from '/@/components/Application';
  import { useTitle } from '/@/hooks/web/useTitle';
  import { useLocale } from '/@/locales/useLocale';

  export default defineComponent({
    name: 'App',
    components: { ConfigProvider, AppProvider },
    setup() {
      useTitle();

      // support Multi-language
      const { getAntdLocale } = useLocale();

      return { getAntdLocale };
    },
  });
</script>
