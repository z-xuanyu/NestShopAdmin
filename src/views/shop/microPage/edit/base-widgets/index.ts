/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-09-15 16:18:03
 * @LastEditTime: 2021-09-15 16:19:45
 * @Description: Modify here please
 */
const modules = import.meta.globEager('./*/index.tsx');

const components = {};

Object.keys(modules).forEach((key: string) => {
  const name = key.replace(/\.\/(.*)\/index\.(tsx|vue)/, '$1');
  components[name] = modules[key]?.default || modules[key];
});

console.log(components, 'base-widgets');
export default components;
