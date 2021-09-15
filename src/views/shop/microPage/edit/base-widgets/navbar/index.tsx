
/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-09-15 10:06:04
 * @LastEditTime: 2021-09-15 16:13:28
 * @Description: Modify here please
 */
import { NavBar } from 'vant'
export default {
    key: 'navbar',
    moduleName: 'baseWidgets',
    label: '标题',
    icon: 'subway:title',
    render: () => <NavBar title='标题' left-text="返回" right-text="按钮" left-arrow></NavBar>,
}