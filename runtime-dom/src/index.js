// 1、声明Vue
export const Vue = {
    createApp (options) {
      const app = ensureRender().createApp(options)
      
      const { mount } = app
      app.mount =  (containerOrSelector) => {
        const container = normalizeContainer(containerOrSelector)
        if (!container) return
        // app._component是用户传入的配置参数
        const component = app._component
        if (!isFunction(component) && !component.render && !component) {
          component.template = container.innerHTML
        }
        // clear content before mounting
        container.innerHTML = ''
        const proxy = mount(container)

        // 当前模组中未计划涉及该方法。
        // 暂不使用。
        // container.removeAttribute('v-cloak')
        return proxy
      }
    }
  }

/**
 * 粗糙的方法：容器
 * @param {Object} containerOrSelector 
 */
const normalizeContainer = function (containerOrSelector) {
  if (isHTMLElement(containerOrSelector)) return containerOrSelector
  const container = document.querySelector(containerOrSelector)
  return container
}

/**
 * 判断对象是否为DOM节点
 * @param {Object} object 需要判断的对象
 */
const isHTMLElement = function (object) {
  return ( typeof HTMLElement === 'object' ) ?
    function(object){
      return object instanceof HTMLElement
    } :
    function(object){
      return object && typeof object === 'objectect'
        && object.nodeType === 1
        && typeof object.nodeName === 'string'
    }
}

// 判断是否为函数
const isFunction = function (FunName) {
  return typeof FunName === "function"
}