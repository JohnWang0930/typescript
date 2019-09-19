# 基础类型

数据类型分为 原始数据类型 和 对象类型。
原始数据类型包括：布尔值、数值、字符串、`null`、`undefined` 以及 `ES6` 中的新类型 `Symbol`。

## 1. 布尔值
```typescript
let isDone: boolean = true;
```
直接调用 `Boolean` 返回一个 `boolean` 类型
```typescript
let createdNewBoolean: boolean = Boolean(1);
```
`new Boolean()` 返回的是 `Boolean` 对象
```typescript
let createdNewBoolean: boolean = new Boolean(1);
// 编译不通过
```

## 2. 数值
```typescript
let decLiteral: number = 7; // 十进制
let hexLiteral: number = 0xf00d; // 十六进制
let binaryLiteral: number = 0b1010; // 二进制
let octalLiteral: number = 0o744; // 八进制
let notANumber: number = NaN;
let infinityNumber: number = Infinity;
```

## 3. 字符串
```typescript
let myName: string = 'Tom';
let myAge: number = 25;

// 模板字符串
let sentence: string = `Hello, my name is ${myName}.
I'll be ${myAge + 1} years old next month.`;
```

## 4. 空值
JavaScript 中没有空值（Void）的概念，在 TypeScript 中可以用 `void` 表示没有任何返回值的函数：
```typescript
function warnUser(): void{
    alert("This is my warning message");
}
```
void类型变量只能赋值 `undefined` 和 `null`
```typescript
let unusable: void = undefined;
```

## 5. Null 和 Undefined
```typescript
let u: undefined = undefined;
let n: null = null;
```
`undefined` 类型变量只能赋值为 `undefined`，`null` 同理
与 `void` 不同，`undefined` 和 `null` 是所有类型的子类型，可以赋值给任何类型变量
```typescript
// 不报错
let num: number = undefined;
```
```typescript
// 不报错
let u: undefined;
let num: number = u;
```
而 `void` 类型变量不能赋值给 `number`类型
```typescript
// 报错
let v: void;
let num: number = v;
```

## 6. 任意值
任意值类型变量可以赋值为任何类型，可以访问任何属性，也可以调用任何方法
```typescript
let anyValue: any = 'seven';
anyValue = 7;

console.log(anyValue.value)
anyValue.setValue(null)
```

声明变量是未指定类型，会被识别为任意类型
```typescript
let something;
something = 'seven';
something = 7;
```

## 7. 类型推论
如果定义变量时未声明类型但是给了初始值，ts 会类型推论
```typescript
// 报错
let something = 'seven';
// 等价于 let somthing: string = 'seven';

something = 7;
```

## 8. 联合类型
表示取值时可以为多种类型中的一种
```typescript
let seven: string | number;
seven = 'seven';
seven = 7;
```
只能访问联合类型的所有类型里共有的属性或方法
```typescript
// 报错
function getLength(something: number | string): number{
  return something.length;
}
```
```typescript
// 不报错
function getString(something: number | string): string{
  return something.toString();
}
```
联合类型赋值时会类型推论出是什么类型
```typescript
let something: string | number;
something = 'seven';
console.log(something.length); // 5
something = 7;
console.log(something.length); // 报错
```
