# 对象的类型--接口

## 什么是接口?
对行为的抽象，具体如何行动需要由类（classes）去实现。

## 简单例子

```typescript
  interface Person {
      name: string;
      age: number;
  }

  let tom: Person = {
      name: 'Tom',
      age: 25
  }
```

* 上例中，赋值的时候，变量的形状必须和接口保持一致。

## 可选属性

```typescript
  interface Person {
      name: string;
      age?: number;
  }

  let tom: Person = {
      name: 'Tom'
  }
```

* 上例中，`age`可以不定义

## 任意属性

```typescript
  interface Person {
      name: string;
      age?: number;
      [propName: string]: any;
  }

  let tom: Person = {
      name: 'Tom',
      gender: 'male'
  }
```

**定义了任意属性后，确定属性和可选属性都必须是它的子属性**

## 只读属性

```typescript
  interface Person {
      readonlu id: number;
      name: string;
      age?: number;
      [propName: string]: any;
  }

  let tom: Person = {
      id: 112358,
      name: 'Tom',
      gender: 'male'
  }
```

* 上例中，属性id初始化后无法被赋值。

- - -

# 数组的类型

## elemType[]表示

```typescript
    let fibonacci: number[] = [1,1,2,3,5,8];
```

* 数组的项中不允许出现其他类型
* 不仅在定义时会限制，使用数组方法时也会限制。如`.push`

## 数组泛型 Array<elemType>

可以使用数组泛型 `Array<elemType>`来表示数组

```typescript
    let fibonacci: Array<number> = [1,1,2,3,5,8];
```

## 用接口表示数组

```typescript
    interface NumberArray {
        [index: number]: number;
    }
    let fibonacci: NumberArray = [1,1,2,3,5,8];
```

* 上例中，只要`index`的类型是`number`，值的类型必须是`number`

## 类数组

类数组（Array-like Object）不是数组类型，比如 `arguments`

```typescript
    function sum() {
        let args: number[] = arguments;
    }
```

* 常见的类数组都有自己的接口定义，如`IArguments`，`NodeList`，`HTMLCollection`等
```typescript
    function sum() {
        let args: IArguments = arguments;
    }
```

- - -

# 函数的类型

## 定义函数

1.函数声明

```typescript
    function sum(x :number, y: number): number {
        return x + y;
    }
```

* 只能输入相应的参数，不能多也不能少

2.函数表达式

```typescript
    let mySum = function (x: number, y: number):number{
        return x + y;
    }
```

* 事实上，上面的代码只对等号右侧的匿名函数进行了类型定义，等号左边是通过赋值操作惊醒类型推论而来的。如果手动给`mySum`添加类型，如下

```typescript
    let mySum: (x: number, y: number) => number = function (x: number, y: number): number {
        return x + y;
    }
```
**TypeScript 中的`=>`和 ES6 中的`=>`是不同的**
在TypeScript的类型定义中，`=>`用来表示函数的定义，左边是输入类型，需要用括号扩起来，右边是输出类型。

在ES6中，`=>`是箭头函数。

3.接口定义

```typescript
    interface SearchFunc {
        (source: string, subString: string): boolean;
    }

    let mySearch: SearchFunc;
    mySearch = function(src: string, sub: string){
        return src.search(sub) !== -1;
    }
```

## 函数可选参数

```typescript
    function buildName(firstName: string, lastName?: string) {
        if(lastName) {
            return firstName + ' ' + lastName;
        } else {
            return firstName;
        }
    }
```

**可选参数必须在最后定义**

## 参数默认值

```typescript
    function buildName(firstName: string, lastName: string = 'Cat'){
        return firstName + ' ' + lastName;
    }
```

## 剩余参数

```typescript
    function push(array, ...rest) {
        rest.forEach(function(item){
            array.push(item);
        })
    }
```

* `rest`是一个数组，我们可以用数组来定义

```typescript
    function push(array: any[], ...rest: Array<any>){
        rest.forEach(function(item){
            array.push(item);
        });
    }
```

**`rest`参数只能是最后一个参数**

## 重载

重载允许一个函数接收不同数量或类型的参数时，做出不同的处理。

例：反转函数

```typescript
    function reverse(x: number): number;
    function reverse(x: string): string;
    // 多次定义函数 reverse，精确表达 输入为数字时，输出也为数字；输入为字符串时，输出也为字符串。
    function reverse(x: number | string): number | string {
        if(typeof x === 'number'){
            return Number(x.toString().split('').reverse().join(''));
        }else if(typeof x === 'string'){
            return x.split('').reverse().join('');
        }
    }
```

**优先把精确的定义写在前面**

- - -

# 类型断言

手动指定一个值的类型。

## 语法

`<类型>值` 或者 `值 as 类型`

* 在tsx中必须用后一种

## 将联合类型的变量指定为更加具体的类型

```typescript
    function getLength(something: string | number): number {
        if((something as string).length) {
            return (something as string).length;
        }else{
            return something.toString().length;
        }
    }
```

- - -

# 声明文件

使用第三方库时，需要引用它的声明文件

## 声明语句

使用第三方库jQuery

```typescript
    declare var $: (string) => any;
    $('#foo');
```

## 声明文件

通常把类型声明放到一个单独的文件中

```typescript
    // jQuery.d.ts

    declare var $: (string) => any;
```

* 文件名以 `.d.ts` 为后缀

在使用到的文件开头，用 `///` 表示引用了声明文件

```typescript
    /// <reference path='./jQuery.d.ts' />
    $('#foo');
```

## 第三方声明文件

推荐使用工具统一管理第三方库的声明文件。如 [@types](https://blogs.msdn.microsoft.com/typescript/2016/06/15/the-future-of-declaration-files/);

@types 安装jQuery声明文件

```bush
    npm install @types/jquery --save-dev
```

在[这个页面](https://microsoft.github.io/TypeSearch/)搜索需要的声明文件

- - -

# 内置对象

JavaScript中的内置对象可以直接在TypeScript中当做定义好了的类型

## ECMAScript的内置对象

如`Boolean`、`Error`、`Date`、`RegExp`

```typescript
    let b: Boolean = new Boolean(1);
    let e: Error = new Error('Error occurred');
    let d: Date = new Date();
    let r: RegExp = /[a-z]/;
```

## DOM和BOM的内置对象

如`Document`、`HTMLElement`、`Event`、`NodeList`

```typescript
    let body: HTMLElement = document.body;
    let allDiv: NodeList = document.querySelector('div');
    document.addEventListener('click', function(e:MouseEvent) {

    })
```

## TypeScript核心库的定义文件

以上两种内置对象的定义文件都在TypeScript核心库的定义文件中

TypeScript核心库的定义文件中定义了所有浏览器环境需要用到的类型，并且是预置在TypeScript中的。当使用一些常用的方法的时候，TypeScript实际上已经做了很多类型判断的工作

```typescript
    Math.pow(10,'2');
    // 该方法会报错，因为只能接受两个number类型的参数
```

实际上，`Math.pow`的类型定义如下

```typescript
    interface Math{
        pow(x: number, y: number): number;
    }
```

DOM中的例子

```typescript
    document.addEventListener('click', function(e) {
        console.log(e.targetCurrent);
    });
    // 该方法会报错，因为MouseEvent没有targetCurrent属性
```

类型定义

```typescript
    interface Document extends Node, GlobalEventHandlers, NodeSelector, DocumentEvent {
        addEventListener(type: string, listenerL (ev: MouseEvent) => any, useCapture?: boolean): void;
    }
```

## TypeScript写Node.js

需要引入第三方声明文件

```bash
    npm install @types/node --save-dev
```
