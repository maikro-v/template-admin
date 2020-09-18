import main from './modules/main'
import errorPage from './modules/error-page'
import home from './modules/home'

/*
* 注释: 子菜单只在 children.length >= 1 时出现
* name: 'router-name'                在使用<keep-alive>时，name字段是必需的，它还应该匹配其组件的name属性
* meta: {
*   title: 'title'                    在子菜单和面包屑中显示的名称(recommend set)
*   icon: 'icon-name'                 图标显示在侧边栏
*   hideInMenu: false                 如果为true，此路径将不会显示在侧边栏中(default is false)
*   hideBread: false                  如果为true，项目将隐藏在面包屑中(default is false)
* }
* */

export default [
  ...main,
  ...errorPage,
  ...home
]
