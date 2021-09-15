/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-09-15 16:15:12
 * @LastEditTime: 2021-09-15 17:02:10
 * @Description: Modify here please
 */
import { Search } from 'vant'
export default {
    key: 'searchBar',
    moduleName: 'baseWidgets',
    label: '搜索栏',
    icon: 'ion:search',
    render: () => <Search placeholder="请输入搜索关键词" />,
}