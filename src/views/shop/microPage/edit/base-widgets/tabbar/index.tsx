/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-09-15 17:12:46
 * @LastEditTime: 2021-09-15 17:29:18
 * @Description: Modify here please
 */
import { Tabbar, TabbarItem } from 'vant'
export default {
    key: 'tabbar',
    moduleName: 'baseWidgets',
    label: '底部导航',
    icon: 'bx:bxs-category',
    fixed: true,
    render: () => <Tabbar fixed={ false }>
    <TabbarItem icon="home-o">标签</TabbarItem>
    <TabbarItem icon="search">标签</TabbarItem>
    <TabbarItem icon="friends-o">标签</TabbarItem>
    <TabbarItem icon="setting-o">标签</TabbarItem>
</Tabbar>
}