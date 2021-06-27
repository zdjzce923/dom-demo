window.dom = {
  // 1. 创建元素 create('<div>create</div>')
  create(string) {
    // 搞个容器并返回第一个子元素
    const template = document.createElement('template')
    template.innerHTML = string.trim()
    return template.content.firstChild
  },
  // 2. 在指定元素后添加
  after(node, node2) {
    // 把node2插入到node的下一个节点之前
    node.parentNode.insertBefore(node2, node.nextSibling)
  },
  // 3. 在指定元素前添加
  before(node, node2) {
    node.parentNode.insertBefore(node2, node)
  },
  // 4. 加儿子
  append(parent, node) {
    parent.appendChild(node)
  },
  // 5.加爸爸
  wrap(node, parent) {
    this.before(node, parent)
    this.append(parent, node)
  },
  // 6.删除元素
  remove(node) {
    node.parentNode.removeChild(node)
    return node
  },
  // 7. 删除后代
  empty(node) {
    const arr = []
    let x = node.firstChild
    // 删除节点会改变长度 删节点时始终让x等于第一个以便保存
    while (x) {
      arr.push(this.remove(node.firstChild))
      x = node.firstChild
    }
    return arr
  },
  // 8.更改/读属性(重载)
  attr(node, name, value) {
    // 传三个值设置属性 两个值读属性
    if (arguments.length === 3) {
      node.setAttribute(name, value)
    } else if (arguments.length === 2) {
      return node.getAttribute(name)
    }
  },
  // 9. 读写文本内容 重载+适配
  text(node, string) {
    if (arguments.length === 2) {
      if ('innerText' in node) {
        node.innerText = string
      } else {
        node.textContent = string
      }
    } else if (arguments.length === 1) {
      if ('innerText' in node) {
        return node.innerText
      } else {
        return node.textContent
      }
    }
  },
  // 10. 读取+更改 innerHTML
  html(node, string) {
    if (arguments.length === 2) {
      node.innerHTML = string
    } else if (arguments.length === 1) {
      return node.innerHTML
    }
  },
  // 11. 更改style
  style(node, name, value) {
    // 传值三个为设置属性
    if (arguments.length === 3) {
      node.style[name] = value
    } else if (arguments.length === 2) {
      if (typeof name === 'string') {
        // dom.style(div,'color')
        return node.style[name]
      } else if (name instanceof Object) {
        // dom.style(div,{color:'red'})
        const obj = name
        for (let key in obj) {
          node.style[key] = obj[key]
        }
      }
    }
  },
  class: {
    // 12 - 14 添加、删除、判断有无类
    add(node, className) {
      node.classList.add(className)
    },
    remove(node, className) {
      node.classList.remove(className)
    },
    has(node, className) {
      return node.classList.contains(className)
    },
  },
  // 15. 添加事件监听
  on(node, eventName, fn) {
    node.addEventListener(eventName, fn)
  },
  // 16. 删除事件监听
  off(node, eventName, fn) {
    node.removeEventListener(eventName, fn)
  },
  // 17. 获取父标签
  parent(node) {
    return node.parentNode
  },
  // 18. 获取所有子标签
  children(node) {
    return node.children
  },
  // 19. 获取标签或标签们
  find(selector, scope) {
    // scope为在指定元素内查找
    return (scope || document).querySelectorAll(selector)
  },
  // 20. 获取兄弟元素
  siblings(node) {
    // 过滤掉自己本身剩下的就是兄弟元素
    return Array.from(node.parentNode.children).filter(n => n !== node)
  },
  // 21. 获取下一个元素
  next(node) {
    let x = node.nextSibling
    // 如果下个元素存在并且为文本节点 则让x再等于下一个节点
    while (x && x.nodeType === 3) {
      x = x.nextSibling
    }
    return x
  },
  // 22. 获取哥哥元素
  previous(node) {
    let x = node.previousSibling
    while (x && x.nodeType === 3) {
      x = x.previousSibling
    }
    return x
  },
  // 23. 遍历所有节点
  each(nodeList, fn) {
    for (let i = 0; i < nodeList.length; i++) {
      // 将元素传到fn里就可以对这些元素进行操作了
      fn.call(null, nodeList[i])
    }
  },
  // 24. 获取元素索引
  index(node) {
    const list = dom.children(node.parentNode)
    let i
    for (i = 0; i < list.length; i++) {
      // 遍历元素伪数组，发现当前索引的值与传入相同则退出并返回值
      if (list[i] === node) {
        break
      }
    }
    return i
  },
}
