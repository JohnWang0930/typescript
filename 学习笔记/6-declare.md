# 声明文件
当使用第三方库时，需要引用它的声明文件，才能获得对应的代码补全、接口提示等功能。
声明文件仅仅会用于编译时的检查，声明文件里的内容在编译结果中会被删除。

## 语法
- [`declare var`](#declare-var) 声明全局变量
- [`declare function`](#declare-function) 声明全局方法
- [`declare class`](#declare-class) 声明全局类
- [`declare enum`](#declare-enum) 声明全局枚举类型
- [`declare namespace`](#declare-namespace) 声明（含有子属性的）全局对象
- [`interface` 和 `type`](#interface-和-type) 声明全局类型
- [`export`](#export) 导出变量
- [`export namespace`](#export-namespace) 导出（含有子属性的）对象
- [`export default`](#export-default) ES6默认导出
- [`export =`](#export-=) common.js导出模块
- [`export as namespace`](#export-as-namespace) UMD 库声明全局变量
- [`declare global`](#declare-global) 扩展全局变量
- [`declare module`](#declare-module) 扩展模块
- [`/// <reference />`](#三斜线指令) 三斜线指令

## 声明语句
例如引用第三方库jQuery：
```typescript
declare var jQuery: (selector: string) => any;

jQuery('#foo');
```
`declare var` 并没有真的定义一个变量，只是定义了全局变量 `jQuery` 的类型，仅仅会用于编译时检查。

## 声明文件
将声明语句放在单独的文件（`jQuery.d.ts`）中，就是声明文件：
```typescript
// src/jQuery.d.ts
declare var jQuery: (selector: string) => any;
```

```typescript
// src/index.ts
jQuery('#foo');
```

声明文件必须以 `.d.ts` 为后缀。

这是声明全局变量模式，模块导入的方式使用第三库是另外一种方式。

## 第三方声明文件
推荐使用 `@types` 管理第三方声明文件。

直接 `npm` 安装即可
```typescript
npm i @types/jquery --save-dev
```

在 [`TypeSearch`](https://microsoft.github.io/TypeSearch/) 中搜索需要的声明文件。

## 书写声明文件
在不同场景下，声明文件的内容和使用方式会有所不同。

- [全局变量](#全局变量)：通过 `<script>` 标签引入第三方库，注入全局变量。
- [npm 包](#npm包)：通过 `import foo from 'foo'` 导入，符合 `ES6` 模块规范。
- [UMD 库](#UMD库)：既可以通过 `<script>` 标签引入，又可以通过 `import` 导入。
- [直接扩展全局变量](#直接扩展全局变量)：通过 `<script>` 引入后，改变一个全局变量的结构。
- [在 npm 包或 UMD 库中扩展全局变量](#在npm包或UMD库中扩展全局变量)：引用 `npm` 包或 `UMD` 库后，改变一个全局变量结构。
- [模块插件](#模块插件)：通过 `<script>` 或 `import` 导入后，改变另一个模块的结构。

### 全局变量
使用全局变量的声明文件时，如果是 `npm install @types/xxx --save-dev` 安装的，就不需要任何配置。如果是将声明文件直接放在当前文件中，则建议和其他源码一起放在 `src` 目录下（或者对应的源码目录下）。

```typescript
├── src
|  ├── index.ts
|  └── jQuery.d.ts
└── tsconfig.json
```

如果没有生效，可以检查下 `tsconfig.json` 中的 `files`、`include` 和 `exclude` 配置，确保其包含了 `jQuery.d.ts` 文件。

全局变量声明主要有以下几种语法：
- [`declare var`](#declare-var) 声明全局变量
- [`declare function`](#declare-function) 声明全局方法
- [`declare class`](#declare-class) 声明全局类
- [`declare enum`](#declare-enum) 声明全局枚举类型
- [`declare namespace`](#declare-namespace) 声明（含有子属性的）全局对象
- [`interface` 和 `type`](#interface&type) 声明全局类型

#### declare var
与其类似的，还有 `declare const` 和 `declare let`。`let` 和 `var` 没什么区别，声明的变量可以修改。`const` 表示常量，声明后不允许修改。
```typescript
// src/jQuery.d.ts
declare let jQuery: (selector: string) => any;
```

一般来说全局变量都是禁止修改的常量，所以大部分情况下都应该使用 `const`。
```typescript
// src/jQuery.d.ts
declare const jQuery: (selector: string) => any;
```

声明语句只能定义类型，避免直接定义具体的实现。
```typescript
declare const foo = function() {
  // do something
}
// 这是不允许出现的。
```

### declare function
`declare function` 用来定义全局函数类型。jQuery也是一个函数，所以也可以用 `function` 来定义。
```typescript
// src/jQuery.d.ts
declare function jQuery(selector: string): any;
```

函数重载也是支持的
```typescript
// src/jQuery.d.ts
declare function jQuery(selector: string): any;
declare function jQuery(domReadyCallback: () => any): any;
```

```typescript
// src/index.ts
jQuery('#foo');
jQuery(function() {
  alert('Dom ready');
});
```

### declare class

```typescript
// src/Animal.d.ts

declare class Animal {
    name: string;
    constructor(name: string);
    sayHi(): string;
}
```
```typescript
// src/index.ts

let cat = new Animal('Tom');
```

`declare class` 也只能定义类型，不能用来定义具体的实现。比如定义 `sayHi` 方法的具体实现则会报错。

```typescript
// src/Animal.d.ts

declare class Animal {
    name: string;
    constructor(name: string);
    sayHi() {
        return `My name is ${this.name}`;
    };
    // ERROR: An implementation cannot be declared in ambient contexts.
}
```

### declare enum
使用 `declare enum` 定义的枚举类型也称为外部枚举
```typescript
// src/Directions.d.ts
declare enum Directions {
  Up,
  Down,
  Right,
  Left
}
```
```typescript
// src/index.ts

let directions = [Directions.Up, Directions.Down, Directions.Right, Directions.Left];
```

与其他全局变量的类型声明一致，`declare enum` 仅用来定义类型，而不是具体的值。

### declare namespace
`namespace`（命名空间）是 ts 早期为了解决模块化而创造的关键字。

现已经不推荐使用 `namespace`，建议使用 `ES6` 的模块化方案。

`namespace` 被淘汰了，但是在声明文件中，`declare namespace` 还是比较常用的，它用来表示全局变量是一个对象，包含很多子属性。

比如 `jQuery` 是一个全局变量，它是一个对象，提供了一个 `jQuery.ajax` 方法调用，那么我们就应该使用 `declare namespace jQuery` 来声明这个拥有多个子属性的全局变量。

```typescript
// src/jQuery.d.ts
declare namespace jQuery {
  function ajax(url: string, settings?: any): void;
}
```
```typescript
// src/index.ts

jQuery.ajax('/api/get_something');
```

在 `declare namespace` 内部直接使用 `function` 而不用 `declare function` 来声明函数。

```typescript
declare namespace jQuery {
  function ajax(url: string, settings?: any): void;
  const version: number;
  class Event {
    blur(eventType: eventType): void;
  }
  enum EventType {
    CustomClick
  }
}
```
```typescript
// src/index.ts

jQuery.ajax('/api/get_something');
console.log(jQuery.version);
const e = new jQuery.Event();
e.blur(jQuery.EventType.CustomClick);
```

#### 嵌套的命名空间

如果对象有深层的层级，则需要用嵌套的 `namespace` 来声明深层的属性的类型
```typescript
// src/jQuery.d.ts
declare namespace jQuery {
  function ajax(url: string, settings?: any): void;
  namespace fn {
    function extend(object: any): void;
  }
}
```
```typescript
// src/index.ts

jQuery.ajax('/api/get_something');
jQuery.fn.extend({
    check: function() {
        return this.each(function() {
            this.checked = true;
        });
    }
});
```

### `interface` 和 `type`
在类型声文件中，可以直接使用 `interface` 或 `type` 来直接声明一个全局的接口或类型
```typescript
// src/jQuery.d.ts

interface AjaxSettings {
  method?: 'GET' || 'POST';
  data?: any;
}
declare namespace jQuery {
  function ajax(url: string, settings?: AjaxSettings): void;
}
```

这样在其他文件也能使用这个接口或类型了
```typescript
// src/index.js

let settings: AjaxSettings = {
  method: 'POST',
  data: {
    name: 'Q'
  }
};

jQuery.ajax('/api/post_something', settings);
```
`type` 和 `interface` 类似。

#### 防止命名冲突
暴露在最外层的 `interface` 和 `type` 会作为全局类型作用于整个项目中，我们应该尽可能地减少全局变量或全局类型的数量。所以最好将它们放在 `namespace` 中。

```typescript
// src/jQuery.d.ts

declare namespace jQuery {
  interface AjaxSettings {
    method?: 'GET' || 'POST';
    data?: any;
  }
  function ajax(url: string, settings?: AjaxSettings): void;
}
```
使用

```typescript
// src/index.ts

let settings: jQuery.AjaxSettings = {
  method: 'POST',
  data: {
    name: 'Q'
  }
};
jQuery.ajax('xxx/xxx', settings)
```

### 声明合并

加入 `jQuery` 既是一个函数，又是一个对象，那么可以组合多个声明语句。

```typescript
// src/jQuery.d.ts

declare function jQuery(selector: string): any;
delcare namespace jQuery {
  function ajax(url: string, settings?: any): void;
}
```

更多声明合并看 `merge` 章节。

## npm包

我们通过 `import foo from 'foo'` 来导入npm包。

一般来说，npm包的声明文件可能存在于两个地方。

1. 与npm包绑定在一起。查看 `package.json` 中是否有 `type` 字段，或者有 `index.d.ts` 声明文件。这种模式不需要额外安装其他包。
2. 发布到 `@types` 里。通过命令 `npm install @types/foo --save-dev` 安装相应的声明文件。

如果两种方式都没找到对应的声明文件，就需要自己写了。由于是通过 `import` 语句导入的模块，所以声明文件存放的位置也有约束，一般有两种方案。

1. 创建一个 `node_module/@types/foo/index.d.ts` 文件，存放 `foo` 模块的声明文件。虽然不需要额外的配置，但是由于 `node_module` 目录不稳定，加上不会保存至仓库，无法管理版本，所以不推荐这个方案，一般只用作临时测试。
2. 创建一个 `types` 目录，专门用来管理自己写的声明文件，将 `foo` 的声明文件放在 `types/foo/index.d.ts` 中。这种方式需要配置 `tsconfig.json` 中的 `paths` 和 `baseUrl` 字段。

目录结构：

```plain
/path/to/project

├── src
|  └── index.ts
├── types
|  └── foo
|     └── index.d.ts
└── tsconfig.json
```

`tsconfig.json` 内容：

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "baseUrl": "./",
    "paths": {
      "*": ["types/*"]
    }
  }
}
```
`module` 有很多选项，不同的选项会影响模块的导入导出模式。这里使用了最常用的 `commonjs` 选项。

`npm` 包的声明文件主要有以下几种语法：

- `export` 导出变量
- `export namespace` 导出（含有子属性的）对象
- `export default` ES6 默认导出
- `export =` commonjs 导出模块

### `export`
`npm` 包的声明文件与全局变量的声明文件有很大的区别。在 `npm` 包的声明文件中，使用 `declare` 不再会声明一个全局变量，而只会在当前文件中声明一个局部变量。只有在声明文件中使用 `export` 导出，然后在使用方 `import` 导入后，才会应用到这些类型声明。

`export` 的语法与普通的 ts 中的语法类似，区别仅在于声明文件中禁止定义具体的实现：

```typescript
// types/foo/index.d.ts

export const name: string;
export function getName(): stirng;
export class Animal {
  constructor(name: string);
  sayHi(): string;
}
export enum Directions {
  Up;
  Down;
  Left;
  Right;
}
export interface Options {
  data: any;
}
```

对应的导入和使用模块应该是这样：

```typescript
// src/index.ts

import { name, getName, Animal, Directions, Options } from 'foo';

let myName = getName();
let cat = new Animal('Tom');
let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
let options: Options = {
  data: {
    name: 'foo'
  }
}
```

#### 混用 `declare` 和 `export`
我们也可以使用 `declare` 先声明多个变量，最后再用 `export` 一次性导出。上例的声明文件可以等价的改写为：

```typescript
// types/foo/index.d.ts

declare const name: string;
declare function getName(): string;
declare class Animal {
  constructor(name: string);
  sayHi(): string;
}
declare enum Directions {
  Up,
  Down,
  Left,
  Right
}
interface Options {
  data: any;
}

export { name, getName, Animal, Directions, Options };
```

与全局变量的声明文件类似，`interface` 前是不需要 `declare` 的。

### `export namespace`
与 `declare namespace` 类似，`export namespace` 用来导出一个拥有子属性的对象：

```typescript
// types/foo/index.d.ts

export namespace foo {
  const name: string;
  namespace bar {
    functiom baz(): string;
  }
}
```

```typescript
import { foo } from 'foo';

console.log(foo.name);
foo.bar.baz();
```

### `export default`
在 ES6 模块系统中，使用 `export default` 可以导出一个默认值，使用方可以用 `import foo from 'foo'` 而不是 `import { foo } from 'foo'` 来导入这个默认值。

在类型声明文件中，`export default` 用来导出默认值的类型：

```typescript
// types/foo/index.d.ts

export default function foo(): string;
```

```typescript
import foo from 'foo';

foo();
```

只有 `function` 、`class` 和 `interface` 可以直接默认导出，其他的变量需要先定义出来，再默认导出：

```typescript
// types/foo/index.d.ts

export default enum Directions {
  // ERROR: Expression expected.
  Up,
  Down,
  Left,
  Right
}
```

上例中 `export default enum` 是错误的语法，需要使用 `declare enum` 定义出来，然后使用 `export default` 导出：

```typescript
// types/foo/index.d.ts

declare enum Directions {
  Up,
  Down,
  Left,
  Right
}

export default Directions;
```

针对这种默认导出，我们一般会将导出语句放在整个声明文件的最前面：

```typescript
// types/foo/index.d.ts

export default Directions;

declare enum Directions {
  Up,
  Down,
  Left,
  Right
}
```

### `export =`
在 commonjs 规范中，我们用以下方式来导出一个模块：

```typescript
// 整体导出
module.exports = foo;
// 单个导出
exports.bar = bar;
```

在 ts 中，针对这种模块导出，有多种方式可以导入，第一种方式是 `const ... = require` ：

```typescript
// 整体导入
const foo = require('foo');
// 单个导入
const bar = require('foo').bar;
```

第二种方式是 `import ... from` ，注意针对整体导出，需要使用 `import * as` 来导入：

```typescript
// 整体导入
import * as foo from 'foo';
// 单个导入
import { bar } from 'foo';
```

第三种方式是 `import ... require` ，这也是 ts 官方推荐的方式：

```typescript
// 整体导入
import foo = require('foo');
// 单个导入
import bar = foo.bar;
```

对于这种使用 commonjs 规范的库，假如要为它写类型声明文件的话，就需要使用到 `export = ` 这种语法了：

```typescript
// types/foo/index.d.ts

export = foo;

declare function foo(): string;
declare namespace foo {
  const bar: number;
}
```

上例中使用了 `export = ` 之后，就不能再单个导出 `export {bar}` 了。所以我们通过声明合并，使用 `declare namespace foo` 将 `bar` 合并到 `foo` 里。

准确地说，`export = `不仅可以用在声明文件中，也可以用在普通的 ts 文件中。实际上，`import ... require` 和 `export = ` 都是 ts 为了兼容 AMD 规范和 commonjs 规范而创立的新语法，由于并不常用也不推荐使用，这里就不详细介绍，详情看[官方文档](https://www.typescriptlang.org/docs/handbook/modules.html#export--and-import--require)。

由于很多第三方库是 commonjs 规范的，所以声明文件也就不得不用到 `export = ` 这种语法了。但是还是需要强调，相比 `export = `，更推荐使用 ES6 标准的 `export default` 和 `export`。

## UMD 库

既可以通过 `<script>` 标签引入，又可以通过 `import` 导入的库，称为 UMD 库。相比于 npm 包的类型声明文件，我们需要额外声明一个全局变量，为了实现这种方式，ts 提供了一个新语法 `export as namespace`。

### `export as namespace`

一般使用 `export as namespace` 时，都是先有了 npm 包的声明文件，再基于它添加一条 `export as namespace` 语句，即可将声明好的一个变量声明为全局变量，举例如下：

```typescript
// types/foo/index.d.ts

export as namespace foo;
export = foo;

declare function foo(): string;
declare namespace foo {
  const bar: number;
}
```

当然它也可以与 `export default` 一起使用：

```typescript
// types/foo/index.d.ts

export as namespace foo;
export default foo;

declare function foo(): string;
declare namsepace foo {
  const bar: string;
}
```

## 直接扩展全局变量

有的第三方库扩展了一个全局变量，可是此全局变量的类型却没有相应的更新过来，就会导致 ts 编译错误，此时就需要扩展全局变量的类型。比如扩展 `string` 类型：

```typescript
interface String {
  prependHello(): string;
}

'foo'.prependHello();
```

通过声明合并，使用 `interface String` 即可给 `String` 添加属性或方法。

也可以使用 `declare namespace` 给已有的命名空间添加类型声明：

```typescript
// types/jquery-plugin/index.d.ts

declare namespace JQuery {
  interface CustomOptions {
    bar: string;
  }
}

interface JQueryStatic {
  foo(options: JQuery.CustomOptions): string;
}
```

```typescript
// src/index.ts

jQuery.foo({
  bar: ''
})
```

## 在 npm 包或 UMD 库中扩展全局变量

如之前所说，对于一个 npm 包或者 UMD 库的声明文件，只有 `export` 导出的类型声明才能被导入。所以对于 npm 包或 UMD 库，如果导入此库之后会扩展全局变量，则需要使用另一种语法在声明文件中扩展全局变量的类型，那就是 `declare global`。

### `declare global`

使用 `declare global` 可以在 npm 包或者 UMD 库的声明文件中扩展全局变量的类型：

```typescript
// types/foo/index.d.ts

declare global {
  interface String {
    prependHello(): string;
  }
}

export {};
```

```typescript
// src/index.ts

'bar'.prependHello();
```

即使此声明文件不需要导出任何东西，仍然需要导出一个空对象，用来告诉编译器这是一个模块的声明文件，而不是一个全局变量的声明文件。

## 模块插件

有时候通过 `import` 导入一个模块插件，可以改变另一个原有模块的结构。
