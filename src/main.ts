/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-08-04 14:54:26
 * @LastEditTime: 2021-10-20 15:10:53
 * @Description: Modify here please
 */
import '/@/design/index.less';
import '/@/design/tailwind.css';
// Register icon sprite
import 'virtual:svg-icons-register';
import App from './App.vue';
import { createApp } from 'vue';
import { initAppConfigStore } from '/@/logics/initAppConfig';
import { setupErrorHandle } from '/@/logics/error-handle';
import { router, setupRouter } from '/@/router';
import { setupRouterGuard } from '/@/router/guard';
import { setupStore } from '/@/store';
import { setupGlobDirectives } from '/@/directives';
import { setupI18n } from '/@/locales/setupI18n';
import { registerGlobComp } from '/@/components/registerGlobComp';
import { setupVant } from '/@/plugins/vant';

// 在本地开发中不引入按需？
// 在本地开发中引入点播，浏览器请求的数量会增加20%左右。
// 这可能会减慢浏览器刷新速度。
// 所以，都是在本地开发中引入的，在生产环境中才按需引入
if (import.meta.env.DEV) {
  import('ant-design-vue/dist/antd.less');
}

async function bootstrap() {
  const app = createApp(App);

  // 配置store仓库
  setupStore(app);

  // 初始化内部系统配置
  initAppConfigStore();

  // 注册全局组件
  registerGlobComp(app);

  // 多语言配置
  await setupI18n(app);

  // 配置路由
  setupRouter(app);

  // 路由守卫
  setupRouterGuard(router);

  // 注册全局自定义指令
  setupGlobDirectives(app);

  // 配置全局错误处理
  setupErrorHandle(app);

  // Mount when the route is ready
  // https://next.router.vuejs.org/api/#isready
  await router.isReady();
  // 注冊vant插件
  setupVant(app);
  app.mount('#app', true);
}

void bootstrap();
