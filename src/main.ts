/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-08-04 14:54:26
 * @LastEditTime: 2021-09-15 11:03:10
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

// Do not introduce on-demand in local development?
// In the local development for introduce on-demand, the number of browser requests will increase by about 20%.
// Which may slow down the browser refresh.
// Therefore, all are introduced in local development, and only introduced on demand in the production environment
if (import.meta.env.DEV) {
  import('ant-design-vue/dist/antd.less');
}

async function bootstrap() {
  const app = createApp(App);

  // Configure store
  setupStore(app);

  // Initialize internal system configuration
  initAppConfigStore();

  // Register global components
  registerGlobComp(app);

  // Multilingual configuration
  await setupI18n(app);

  // Configure routing
  setupRouter(app);

  // router-guard
  setupRouterGuard(router);

  // Register global directive
  setupGlobDirectives(app);

  // Configure global error handling
  setupErrorHandle(app);

  // Mount when the route is ready
  // https://next.router.vuejs.org/api/#isready
  await router.isReady();
  // 注冊vant插件
  setupVant(app);
  app.mount('#app', true);
}

void bootstrap();
