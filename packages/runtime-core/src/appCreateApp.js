export function createAppAPI (render) {
  // rootComponent就是用户传入的根组件
  return function createApp (rootComponent, rootProps = null) {
    const context = createAppContext()
    const installedPlugins = new Set()

    let isMounted = false

    const app = (context.app = {
      _component: rootComponent,
      _props: rootProps,
      _container: null,
      _context: context,

      // 该计划不编写hydrate，故isHydrate参数省略
      // mount(rootContainer, isHydrate)
      mount (rootContainer) {
        // 如果还没有挂载，就将实例挂载
        if (!isMounted) {
          // 创建虚拟结点
          const vnode = createVNode(
            rootComponent,
            rootProps
          )
          // store app context on the root VNode.
          // this will be set on the root instance on initial mount.
          vnode.appContext = context

          // 将isMounted置true
          isMounted = true
          // 更新app._container状态
          app._container = rootContainer
          // 更新rootContainer.__vue_app__状态
          rootContainer.__vue_app__ = app
        }
      },
    })

    return app
  }
}