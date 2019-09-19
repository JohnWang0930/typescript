# 定义方式
数组有多种定义方式

## 「类型 + 方括号」表示法
```typescript
let fibonacci: number[] = [1, 1, 2, 3, 5];
```
该数组中只能有`number`，不管是赋值还是`push`都不允许出现其他类型。

## 数组范型
```typescript
let fibonacci: Array<number> = [1, 1, 2, 3, 5];
```

## 接口表示
```typescript
interface NumberArray {
  [index: number]: number;
}
let fibonacci: NumberArray = [1, 1, 2, 3, 5];
```

## 用 `any` 表示数组中允许出现任意类型
```typescript
let array: any[] = [1, '2', {number: 12345}];
```

## 类数组
```typescript
function sum() {
  let args: IArguments = arguments;
}
```
常见的类数组都有自己的接口定义，如 `IArguments`, `NodeList`, `HTMLCollection` 等。
