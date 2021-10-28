/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-09-23 11:41:18
 * @LastEditTime: 2021-09-23 11:41:19
 * @Description: Modify here please
 */
import { ref } from 'vue';
//每行个数
export const grid = ref(12);
// slider属性
export const useSlider = (min = 6, max = 12) => {
  // 每行显示个数滑动条
  const getMarks = () => {
    const l = {};
    for (let i = min; i < max + 1; i++) {
      l[i] = {
        style: {
          color: '#fff',
        },
        label: i,
      };
    }
    return l;
  };
  return {
    min,
    max,
    marks: getMarks(),
    step: 1,
  };
};
