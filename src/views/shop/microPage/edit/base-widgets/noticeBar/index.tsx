/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-09-15 17:04:10
 * @LastEditTime: 2021-09-15 17:09:34
 * @Description: Modify here please
 */
import { NoticeBar } from 'vant'
export default {
    key: 'noticeBar',
    moduleName: 'baseWidgets',
    label: '公告',
    icon: 'ant-design:notification-outlined',
    render: () => <NoticeBar
    left-icon="volume-o"
    text="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。"
  />
}