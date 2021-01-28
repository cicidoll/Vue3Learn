// 获取渲染器实例
// overload 1: no hydration
export function createRenderer (options) {
  return baseCreateRenderer(options)
}

function baseCreateRenderer() {

  // 渲染器其实是个对象，包含三个属性
  // render-渲染函数，hydrate-用于ssr，createAPP-实例函数
  return {
    render,
    // hydrate, 本次不编写注水，故省略
    // createApp: createAppAPI(render, hydrate)
    createApp: createAppAPI(render)
  }
}