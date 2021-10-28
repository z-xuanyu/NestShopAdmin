<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-09-14 14:21:37
 * @LastEditTime: 2021-09-24 16:34:52
 * @Description: Modify here please
-->
<template>
  <div class="relative micro-page-create">
    <!-- 组件库 -->
    <div class="absolute max-h-full components-base top-5 left-5">
      <a-card title="基本组件" :bodyStyle="{ padding: 0 }">
        <div style="height: 80vh">
          <ScrollContainer>
            <div class="p-2" style="width: 285px">
              <draggable
                class="dragArea list-group"
                :list="list1"
                :group="{ name: 'people', pull: 'clone', put: false }"
                @change="log"
                item-key="key"
              >
                <template #item="{ element }">
                  <div
                    class="inline-block w-1/3 p-2 my-2 cursor-move hover:shadow-2xl hover:rounded-2xl"
                  >
                    <div class="flex flex-col items-center justify-center">
                      <Icon :icon="element.icon" />
                      <span class="mt-2">{{ element.label }}</span>
                    </div>
                  </div>
                </template>
              </draggable>
            </div>
          </ScrollContainer>
        </div>
      </a-card>
    </div>
    <!-- 布局容器 -->
    <div class="absolute components-layout-container top-16 left-1/3">
      <div style="height: 750px" class="relative bg-white">
        <ScrollContainer>
          <div style="width: 375px">
            <img
              src="https://newyscdemo.oss-cn-shanghai.aliyuncs.com/static/common/header-black.png"
              alt=""
            />
            <draggable
              :list="list2"
              group="people"
              @change="log"
              item-key="key"
              style="height: calc(750px - 67px)"
            >
              <template #item="{ element, index }">
                <div
                  class="p-2 cursor-move"
                  :class="activeIndex == index ? 'border-2 border-purple-600' : ''"
                  @click="handleLayoutComponentClick(index, $event)"
                >
                  <ElementBlock :block="element" />
                </div>
              </template>
            </draggable>
          </div>
        </ScrollContainer>
      </div>
      <!-- 右边组件操作栏 311 - 61 = 250 -->
      <div
        class="absolute flex flex-col items-center justify-center w-10 p-1 bg-purple-600 rounded-md action-wrap -right-12"
        :style="{ top: `${actionWrapTop}px` }"
      >
        <Icon
          class="my-1 cursor-pointer"
          size="26"
          color="#fff"
          icon="ic:baseline-library-add"
          @click="handleComponentCopy"
        />
        <Icon
          class="my-1 cursor-pointer"
          size="26"
          color="#fff"
          icon="mdi:delete-sweep-outline"
          @click="handleDelCurrentComponent"
        />
        <Icon
          class="my-1 cursor-pointer"
          size="26"
          color="#fff"
          icon="mdi:arrow-up-thick"
          @click="handleComponentMoveUp"
        />
        <Icon
          class="my-1 cursor-pointer"
          size="26"
          color="#fff"
          icon="mdi:arrow-down-thick"
          @click="handleComponentMoveDown"
        />
      </div>
    </div>
    <!-- 组件属性 -->
    <div class="absolute components-property-container top-5 right-5">
      <a-card title="组件属性" :bodyStyle="{ padding: 0 }">
        <div style="height: 80vh">
          <ScrollContainer>
            <div class="p-2" style="width: 380px">
              <van-field label="标题" v-model="props.title" placeholder="请输入用户名" />
              <van-field label="左侧文案" v-model="props.leftText" placeholder="请输入文案" />
              <van-field label="右侧文案" v-model="props.rightText" placeholder="请输入文案" />
              {{ props }}
            </div>
          </ScrollContainer>
        </div>
      </a-card>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, toRefs, onMounted } from 'vue';
  import { ScrollContainer } from '/@/components/Container/index';
  import { Icon } from '/@/components/Icon';
  import draggable from 'vuedraggable';
  import { Card } from 'ant-design-vue';
  import components from './base-widgets';
  import ElementBlock from './renderBlock';
  import { Field } from 'vant';
  import { props } from './base-widgets/navbar/props.data';
  export default defineComponent({
    name: 'ShopMicroPageEdit',
    components: {
      [Card.name]: Card,
      ScrollContainer,
      draggable,
      Icon,
      ElementBlock,
      [Field.name]: Field,
    },
    setup() {
      // console.log(components, '组件信息');

      // 请求数据
      onMounted(() => {
        let data = {
          blocks: [
            {
              componentKey: 'navbar',
              moduleName: 'baseWidgets',
              props: {
                title: '标题',
              },
              styles: {
                display: 'flex',
              },
            },
          ],
        };
        // const els = data.blocks.map((item) => {
        //   return {
        //     key: item.componentKey,
        //     moduleName: item.moduleName,
        //     label: '标题',
        //     icon: 'subway:title',
        //     render: components[item.componentKey].render(),
        //     props: item.props,
        //   };
        // });
        // state.list2 = els;
        // console.log(els, '请求数据');
      });
      const state = reactive({
        activeIndex: 0,
        actionWrapTop: 61,
        // list1: [
        //   { name: '标题栏', id: 1, icon: 'subway:title' },
        //   { name: '搜索框', id: 2, icon: 'ion:search' },
        //   { name: '轮播图', id: 3, icon: 'vaadin:picture' },
        //   { name: '图文导航', id: 8, icon: 'mdi:image-text' },
        //   { name: '图片魔方', id: 9, icon: 'bx:bxs-category' },
        //   { name: '视频', id: 10, icon: 'ic:outline-video-library' },
        //   { name: '公告', id: 11, icon: 'ant-design:notification-outlined' },
        // ],
        list1: Object.values(components),
        list2: [],
      });
      // 拖拽组件监听函数
      const log = (params) => {
        console.log(params);
      };
      // 点击当前的组件
      const handleLayoutComponentClick = (index, event) => {
        state.activeIndex = index;
        state.actionWrapTop = event.clientY - 250;
        console.log(index, '点到我了');
        console.log(state.list2);
      };
      // 复制组件
      const handleComponentCopy = () => {
        state.list2.splice(state.activeIndex, 0, state.list2[state.activeIndex]);
      };
      // 处理组件上移
      const handleComponentMoveUp = () => {};
      // 处理组件下移
      const handleComponentMoveDown = () => {};
      // 删除当前选中组件
      const handleDelCurrentComponent = () => {
        state.list2.splice(state.activeIndex, 1);
        console.log('删除组件');
      };
      return {
        ...toRefs(state),
        log,
        handleLayoutComponentClick,
        handleDelCurrentComponent,
        handleComponentCopy,
        handleComponentMoveUp,
        handleComponentMoveDown,
        props,
      };
    },
  });
</script>
