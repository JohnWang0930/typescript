# 函数
函数是 `JavaScript` 中的一等公民。
在 `JavaScript` 中，有两种常见的定义函数的方式--函数声明和函数表达式。

## 函数声明
```typescript
function sum(x: number, y: number): number {
  return x + y;
}
```
`sum(1)` 和 `sum(1, 2, 3)` 是不允许的。

## 函数表达式
```typescript
// 等号左边的 sum 是根据类型推论推断出来的类型定义
let sum = function(x: number, y: number): number {
  return x + y;
};
// 手动给 sum 添加类型定义
let sum(x: number, y: number) => number = function (x: number, y: number): number {
  return x + y;
};
```
TypeScript中，`=>` 表示函数的定义，左边是输入类型，右边是输出类型。

ES6中，`=>` 表示箭头函数。

## 接口定义函数
```typescript
interface SumFunc {
  (x: number, y: number): number
}
let sum: SumFunc;
sum = function(x: number, y: number) {
  return x + y;
};
```

## 可选参数
和接口的可选属性类似
```typescript
function myName(firstName: string, lastName?: string): string {
  return lastName ? `${firstName} ${lastName}` : firstName;
};
```
可选参数必须在最后，后面不能出现必须参数

## 参数默认值
```typescript
function myName(firstName: string = 'ZC', lastName: string = 'Q') {
  return `${firstName} ${lastName}`;
};
```

## 剩余参数
可以使用 `...rest` 获取函数中的剩余参数
```typescript
function sum(x: number, ...rest: number[]): number {
  rest.push(x)
  return rest.reduce((num, item) => {return num + item;})
}
```

## 重载
重载允许一个函数接受不同数量或类型的参数时，作出不同的处理。
比如实现函数 `reverse`，输入数字 `123` 时输出 `321`，输入字符串 `abc` 时输出 `cba`。
```typescript
function reverse(x: number | string): number | string {
  if (typeof x === 'number') {
    return Number(x.toString().split('').reverse('').join(''));
  } else if (typeof x === 'string') {
    return x.split('').reverse('').join('');
  }
};
```
这样写的问题时不够精确表达出输入什么类型参数，输出的也是什么类型。

使用重载定义多个 `reverse` 函数类型
```typescript
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string {
  if (typeof x === 'number') {
    return Number(x.toString().split('').reverse('').join(''));
  } else if (typeof x === 'string') {
    return x.split('').reverse('').join('');
  }
};
```
