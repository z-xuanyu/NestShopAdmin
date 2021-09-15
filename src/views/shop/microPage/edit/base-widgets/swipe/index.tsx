/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-09-15 16:47:01
 * @LastEditTime: 2021-09-15 16:56:31
 * @Description: Modify here please
 */
import { Swipe, SwipeItem } from 'vant'
export default {
    key: 'swipe',
    moduleName: 'baseWidgets',
    label: '轮播图',
    icon: 'vaadin:picture',
    render: () => <div>
        <Swipe class="my-swipe" autoplay="3000" lazy-render indicator-color="white">
            <SwipeItem>
                <img src="https://img.yzcdn.cn/vant/apple-1.jpg" />
            </SwipeItem>
            <SwipeItem>
                <img src="https://img.yzcdn.cn/vant/apple-2.jpg" />
            </SwipeItem>
        </Swipe>
    </div>,
}