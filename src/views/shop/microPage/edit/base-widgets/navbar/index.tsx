
/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-09-15 10:06:04
 * @LastEditTime: 2021-09-24 16:28:42
 * @Description: Modify here please
 */
import { NavBar } from 'vant'
import { props } from './props.data';
export default {
    key: 'navbar',
    moduleName: 'baseWidgets',
    label: '标题',
    icon: 'subway:title',
    render: () => {
        console.log(6546456456);
        return <NavBar { ...props.value }></NavBar>
    },
    props: props.value
}