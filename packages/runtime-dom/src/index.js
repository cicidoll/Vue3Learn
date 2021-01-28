// 1、声明Vue
export const Vue = {
    // 获取一个Vue实例
    createApp (options) {
      const app = ensureRenderer().createApp(options)
      
      // 扩展mount方法，使之可以在用户m诶呦设置render函数h欧哲template选项时
      // 获取根组件的模板
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
 * 粗糙的方法：返回容器变量
 * @param {Object} containerOrSelector 容器元素或选择器
 * @returns {HTMLElement} 返回一个DOM节点
 */
const normalizeContainer = function (containerOrSelector) {
  if (isHTMLElement(containerOrSelector)) 
    return containerOrSelector
  const container = document.querySelector(containerOrSelector)
  return container
}

/**
 * 判断对象是否为DOM节点
 * @param {Object} object 需要判断的对象
 * @returns {Function} 返回一个函数，函数功能为判断对象是否为DOM节点
 */
const isHTMLElement = ( typeof HTMLElement === 'object' ) ?
    function (object) {
      return object instanceof HTMLElement
    } :
    function (object) {
      return object && typeof object === 'objectect'
        && object.nodeType === 1
        && typeof object.nodeName === 'string'
    }

/**
 * 判断是否为函数
 * @param {function} FunName 需要判断的函数变量名
 * @returns {Boolean} 函数是否为参数
 */
const isFunction = function (FunName) {
  return typeof FunName === "function"
}

let renderer

// 获取一个渲染器的实例
function ensureRenderer() {
  return renderer || (render = createRender(rendererOptions))
}