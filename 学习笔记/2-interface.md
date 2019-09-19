# 接口
我们用接口来定义对象的类型。

接口是对行为的抽象，具体如何行动需要类（class）实现。
TypeScript 中接口除了对类的一部分行为进行抽象以外，也常用于对「对象的形状（Shape）」进行描述。
```typescript
interface Person {
  name: string;
  age: number
}

let Q: Person = {
  name: 'QZC',
  age: 18
}
```
接口一般首字母大写。有的语言会建议加上 `I` 前缀。
变量比接口少属性是不允许的
```typescript
// 报错
interface Person {
  name: string;
  age: number;
}

let Q: Person = {
  name: 'QZC'
}
```
多属性也不允许
```typescript
// 报错
interface Person {
  name: string;
  age: number;
}

let Q: Person = {
  name: 'QZC',
  age: 18,
  gender: 'male'
}
```

## 可选属性
```typescript
interface Person {
  name: string;
  age?: number;
}

let Q: Person = {
  name: 'QZC'
};
```

## 任意属性
```typescript
interface Person {
  name: string;
  age?: number;
  [propName: string]: any;
}

let Q: Person = {
  name: 'QZC',
  age: 18,
  genter: 'male'
}
```
任意属性的类型必须包含确定属性和可选属性的类型
```typescript
// 报错
interface Person {
  name: string;
  age?: number;
  [propName: string]: string;
}

let Q: Person = {
  name: 'QZC',
  age: 18,
  genter: 'male'
}
```
任意属性的可选值是 `string`，但是 `age` 属性的类型是 `number`。

## 只读属性
```typescript
interface Person {
  readonly id: number;
  name: string;
  age?: number;
  [propName: string]: any;
}

let Q: Person = {
  id: 112358,
  name: 'QZC',
  age: 18,
  genter: 'male'
}

Q.id = 123 // 报错
```
