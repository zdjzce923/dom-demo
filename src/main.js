// 1. create 创建div
const div = dom.create('<div>create</div>')
console.log(div)

// 2. after 在text后插入div
const text = document.getElementById('before')
dom.after(text, div)

// 3. before 在div前插入div2
const div2 = dom.create('<div>在create之前插入</div>')
dom.before(div, div2)

// 4. append
const divappend = dom.create('<div>儿子</div>')
const parent = document.querySelector('.parent')
dom.append(parent, divappend)

// 5. wrap 加爸爸
const father2 = document.querySelector('.father2')
const son2 = document.querySelector('.son2')
dom.wrap(son2, father2)

// 6. remove 删除元素
const remove = document.querySelector('.remove')
dom.remove(remove)

// 7. empty 删除后代
const removeall = document.querySelector('.removeall')
console.log(dom.empty(removeall))

// 8. attr 更改 读属性
const att = document.querySelector('.att')
dom.attr(att, 'title', 'hi,i am zdj')
console.log(dom.attr(att, 'title'))

// 9. text 更改 读文本
const setText = document.querySelector('.set-text')
dom.text(setText, '哈哈更改了文本')
console.log(dom.text(setText))

// 10. 更改innerHTML
const setHtml = document.querySelector('.set-html')
dom.html(setHtml, '<span>更改了innerhtml</span>')
console.log(dom.html(setHtml))

// 11. 更改style
const setStyle = document.querySelector('.setcolor')
dom.style(setStyle, 'color', 'red')
dom.style(setStyle, { color: 'green' })
console.log(dom.style(setStyle, 'color'))

// 12.添加class
const classdom = document.querySelector('.classdom')
dom.class.add(classdom, 'add')
dom.class.add(classdom, 'remove')
// 13.移除class
dom.class.remove(classdom, 'remove')
// 14.判断有无指定classname
console.log(dom.class.has(classdom, 'add'))

// 15 - 16 .添加删除事件监听
const eventL = document.querySelector('.event')
const fn = () => {
  console.log('被点击了')
}
dom.on(eventL, 'click', fn)
dom.off(eventL, 'click', fn)

// 17. 获取父标签
console.log(dom.parent(eventL))

// 18. 获取子标签
console.log(dom.children(setHtml))

// 19.找到指定选择器的元素
console.log(dom.find('.removeall')[0])
const look = document.querySelector('.look')
console.log(dom.find('.removeall', look)[0])

// 20. 获取兄弟元素
console.log(dom.siblings(setStyle))

// 21. 获取下一个元素
console.log(dom.next(setStyle))

// 22. 获取哥哥元素
console.log(dom.previous(setStyle))

// 23. 遍历所有节点
const span = dom.find('.setall')[0]
dom.each(dom.children(span), n => dom.style(n, 'color', 'blue'))

// 24. 获取元素索引
console.log(dom.index(setStyle))
