/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-09-15 12:04:12
 * @LastEditTime: 2021-09-15 16:37:53
 * @Description: Modify here please
 */

import { defineComponent } from 'vue';
import components from './base-widgets';
export default defineComponent({
    props: {
        block: { type: Object }
    },
    setup(props){
        const block:any = props.block;
        const elementBlock = components[block.key];
        return elementBlock.render;
    }
})