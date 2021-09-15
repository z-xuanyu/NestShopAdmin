/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-09-15 16:06:43
 * @LastEditTime: 2021-09-15 16:06:44
 * @Description: Modify here please
 */
import { getCurrentInstance } from 'vue';
import { RouteLocationNormalizedLoaded, Router } from 'vue-router';

interface GlobalProperties {
  $$refs: any;
  $route: RouteLocationNormalizedLoaded;
  $router: Router;
}

export const useGlobalProperties = () => {
  const globalProperties = getCurrentInstance()!.appContext.config
    .globalProperties as GlobalProperties;

  const registerRef = (el, _vid: string) => el && (globalProperties.$$refs[_vid] = el);

  return {
    globalProperties,
    registerRef,
  };
};
