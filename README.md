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

const stage = new MarkStage(document.querySelector('article'));

document.addEventListener("mouseup", markSelection, false);

function markSelection() {
  const selection = window.getSelection();
  const range = selection.getRangeAt(0);

  if (!selection.isCollapsed) {
    stage.add(new Highlight({
      range,
      classList: ['highlight']  // 自定义类名
    })); // add mark
  }
}

stage.event.on('click', function (e) {

  const uuid = e.target.getAttribute('data-uuid');

  stage.remove(uuid); // remove by mark.uuid
})
```


## Options

### Stage

```js
new MarkStage(target, container)
```

option     | description               | default
:--------: | :--------:                | :--------:
target     | 创建stage的目标元素         |  -
container  | stage的svg被插入的元素位置  | document.body

### Mark

```js
new Mark({...})
```

option     | description   | default
:--------: | :--------:    | :--------:
range      | 标记的元素范围[Range](https://developer.mozilla.org/en-US/docs/Web/API/Range)  |  -
classList  | 自定义类名数组  |  []

## Salute

> [marks-pane](https://github.com/fchasen/marks)