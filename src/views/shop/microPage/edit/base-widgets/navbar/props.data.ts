/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-09-24 11:22:04
 * @LastEditTime: 2021-09-24 11:43:23
 * @Description: Modify here please
 */
import { ref } from 'vue';
export const props = ref({
  title: '导航标题',
  leftText: '返回',
  rightText: '按钮',
  leftArrow: true,
  border: false,
  fixed: false,
  zIndex: 1,
});
