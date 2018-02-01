##泛型

泛型（Generics）是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性。
相比于`any`类型，泛型来创建可复用的组件要更好，因为泛型会保留参数类型。

##简单例子

```typescript
    function createArray(length: number, value: any): Array<any> {
        let result = [];
        for (let i = 0; i < length; i++){
            result[i] = value;
        }
        return result;
    }

    createArray(3, 'x');
```

* 用到了`array<elemtype>`数组泛型
* 但是函数没有准确定义返回值类型

```typescript
    function createArray<T>(length: number, value: T): Array<T> {
        let result: T[] = [];
        for (let i = 0; i < length; i++){
            result[i] = value;
        }
        return result;
    }

    createArray<string>(3, 'x');
```

##多个类型参数

```typescript
    function swap<T,U>(tuple: [T,U]):[U,T] {
        return [tuple[1], tuple[0]];
    }

    swap([7, 'seven']); // ['seven', 7]
```

##泛型约束

在函数内部使用泛型变量的时候，由于事先不知道它是哪种类型，所以不能随意的操作它的属性或方法

```typescript
    function loggingIdentity<T>(arg: T): T {
        console.log(arg.length);
        return arg;
    }
```

*上例中，泛型T不一定包含属性 `length`，所以编译的时候会报错
我们可以对泛型进行约束，只允许这个函数传入那些包含`length`属性的变量

```typescript
    interface Lengthwise {
        length: number;
    }

    function loggingIdentity<T extends Lengthwise>(arg: T): T {
        console.log(arg.length);
        return arg;
    }
```

多个类型参数之间也可以互相约束

```typescript
    function copyFields<T extends U, U>(target: T, source: U): T {
        for (let id in source){
            target[id] = (<T>source)[id];
        }
        return target;
    }

    let x = {a: 1, b: 2, c: 3, d: 4};
    copyFields(x,{b: 10, d: 20});
```

##泛型接口

使用含有泛型的接口来定义函数的形状

```typescript
    interface CreateArrayFunc {
        <T>(length: number, value: T): Array<T>;
    }

    let createArray: CreateArrayFunc;
    createArray = function<T>(length: number, value: T): Array<T> {
        let result: T[] = [];
        for (let i = 0; i < length; i++){
            result[i] = value;
        }
        return result;
    }

    createArray(3, 'x'); // ['x','x','x']
```

* 我们可以把泛型参数提前到接口名上

```typescript
    interface CreateArrayFunc<T> {
        (length: number, value: T): Array<T>;
    }

    let createArray: CreateArrayFunc<any>;
    createArray = function<T>(length: number, value: T): Array<T> {
        let result: T[] = [];
        for (let i = 0; i < length; i++){
            result[i] = value;
        }
        return result;
    }
    createArray(3, 'x'); // ['x',x','x']
```

##泛型类

```typescript
    class GenericNumber<T> {
        zeroValue: T;
        add: (x: T, y: T) => T;
    }

    let myGenericNumber = new GenericNumber<number>();
    myGenericNumber.zeroValue = 0;
    myGenericNumber.add = function(x, y) { return x + y; };
```

##泛型参数的默认类型

ts2.3后，可以为泛型中的类型参数指定默认类型

```typescript
    function createArrau<T = string>(length: number, value: T): Array<T> {
        let result: T[] = [];
        for(let i = 0;i < length; i++){
            result[i] = value;
        }
        return result;
    }
```
