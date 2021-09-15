<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-09-13 18:20:31
 * @LastEditTime: 2021-09-14 12:02:35
 * @Description: Modify here please
-->
<template>
  <div class="relative w-full h-full p-5">
    <a-card :bordered="false">
      <template #title>
        <div class="flex items-center">
          <span>店铺风格</span>
          <div
            class="p-1 ml-5 border-2 rounded-sm cursor-pointer theme-style"
            :class="active == index ? 'border-blue-500' : 'border-light-blue-500'"
            v-for="(item, index) in shopThemes"
            :key="index"
            @click="handleChangeTheme(index)"
          >
            <span class="px-4 py-1" :class="item.bgColor1"></span>
            <span class="px-4 py-1" :class="item.bgColor2"></span>
          </div>
        </div>
      </template>
      <div class="flex theme-box">
        <div class="relative mr-5 theme-preview-box">
          <img
            src="https://newyscdemo.oss-cn-shanghai.aliyuncs.com/static/common/theme_bg1.png"
            alt=""
          />
          <span
            class="absolute text-xl font-bold price"
            :class="shopThemes[active].textColor"
            style="top: 295px; left: 5px"
            >￥160</span
          >
          <div class="absolute flex btn-wrap" style="bottom: 5px; right: 0">
            <div
              class="px-2 py-1 mr-2 text-xs text-white rounded-full btn"
              :class="shopThemes[active].bgColor2"
              >加入购物车</div
            >
            <div
              class="px-2 py-1 text-xs text-white rounded-full btn"
              :class="shopThemes[active].bgColor1"
              >立即购买</div
            >
          </div>
        </div>
        <div class="relative mr-5 theme-preview-box">
          <img
            src="https://newyscdemo.oss-cn-shanghai.aliyuncs.com/static/common/theme_bg2.png"
            alt=""
          />
          <span
            class="absolute px-2 text-xs text-red-500 bg-red-500 border-2 bg-opacity-10 rounded-xl skus"
            style="top: 53%; left: 65px"
            :class="[
              shopThemes[active].borderColor,
              shopThemes[active].bgColor1,
              shopThemes[active].textColor,
            ]"
            >选中状态</span
          >
          <div
            class="absolute w-full p-2 text-xs text-center text-white rounded-full btn"
            style="bottom: 0"
            :class="shopThemes[active].bgColor1"
          >
            确认
          </div>
        </div>
        <div class="relative mr-5 theme-preview-box">
          <img
            src="https://newyscdemo.oss-cn-shanghai.aliyuncs.com/static/common/theme_bg3.png"
            alt=""
          />
          <div
            class="absolute px-2 py-1 text-xs text-center text-white rounded-full btn"
            :class="shopThemes[active].bgColor1"
            style="bottom: 5px; right: 5px"
          >
            去支付
          </div>
        </div>
      </div>
    </a-card>
    <!-- 确认修改主题 -->
    <div
      class="absolute bottom-0 flex items-center justify-center w-full h-16 text-center bg-white submit-btn"
    >
      <a-button type="primary"> 确认 </a-button>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, toRefs } from 'vue';
  import { Card, Button } from 'ant-design-vue';
  export default defineComponent({
    name: 'ShopStyle',
    components: {
      [Card.name]: Card,
      [Button.name]: Button,
    },
    setup() {
      const state = reactive({
        active: 0,
        shopThemes: [
          {
            bgColor1: 'bg-red-500',
            bgColor2: 'bg-gray-600',
            textColor: 'text-red-500',
            borderColor: 'border-red-500',
          },
          {
            bgColor1: 'bg-pink-500',
            bgColor2: 'bg-yellow-600',
            textColor: 'text-pink-400',
            borderColor: 'border-pink-400',
          },
          {
            bgColor1: 'bg-green-500',
            bgColor2: 'bg-purple-600',
            textColor: 'text-green-500',
            borderColor: 'border-green-500',
          },
        ],
      });

      // 切换主题
      const handleChangeTheme = (index: number) => {
        state.active = index;
      };
      return {
        ...toRefs(state),
        handleChangeTheme,
      };
    },
  });
</script>
