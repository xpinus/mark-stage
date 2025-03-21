# [mark-stage](https://www.npmjs.com/package/mark-stage)

> 基于svg实现的网页元素上添加标记（如高亮、下划线等）

> A js library for add svg marks (highlight, underline, etc.) on web page 

![高亮示例](https://github.com/xpinus/mark-stage/raw/master/doc/images/highlight.gif)

## Install

```shell
npm install mark-stage
```
或
```html
<script src="../dist/markstage.umd.js"></script>
```

## Quick Start

```js
import { MarkStage, Highlight } from 'mark-stage';
//  const { MarkStage, Highlight } = marks;  // umd的全局名称为markstage

// step 1: 创建stage
const stage = new MarkStage(document.querySelector('article'));

document.addEventListener("mouseup", markSelection, false);

function markSelection() {
  const selection = window.getSelection();
  const range = selection.getRangeAt(0);

  if (!selection.isCollapsed) {
    // step 2: 创建mark，将mark添加到stage
    stage.add(new Highlight({
      range, // mark的范围
      classList: ['highlight']  
    })); 
  }
}

// step 3: 监听stage的click事件，移除mark
stage.event.on('click', function (e) {

  const uuid = e.target.getAttribute('data-uuid');

  stage.remove(uuid); // remove by mark.uuid
})
```

> ⚠ 注意：mark是通过在container下插入一个svg并进行绘制，svg通过position: absolute将自己覆盖在target之上产生重叠的效果
```js
const containerPosition = window.getComputedStyle(container, null).position;  // 检测container的style的position设置
if (containerPosition === 'static' || !containerPosition) {
  container.style.position = 'relative';  // 如果container未设置适当的position，则会默认添加relative
}
```

## Options

### Stage

```js
new MarkStage(target, options)
```
- target: 目标元素, stage作用范围
- options: 配置项

option     | description               | default
:--------: | :--------:                | :--------:
container  | stage的svg被插入的元素位置  | target.parentElemetn 或 document.body

### Mark

```js
new Mark({...})
```

option     | description   | default
:--------: | :--------:    | :--------:
range      | 标记的元素范围[Range](https://developer.mozilla.org/en-US/docs/Web/API/Range)  |  -
classList  | 自定义类名数组  |  []
style       | 自定义样式对象  |  string

## Salute

> [marks-pane](https://github.com/fchasen/marks)