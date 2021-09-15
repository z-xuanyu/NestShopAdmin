/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-09-15 10:58:05
 * @LastEditTime: 2021-09-15 17:08:46
 * @Description: Modify here please
 */
import type { App } from 'vue';
import '@vant/touch-emulator';
import 'vant/lib/index.css';

import { Lazyload, Icon } from 'vant';

export const setupVant = (app: App) => {
  app.use(Lazyload).use(Icon);
};
