## 类型别名

```typescript
    type Name = string | number;
    function getName(n: Name): string {
        if(typeof n === 'string'){
            return n;
        }else{
            return n.toString();
        }
    }
```

## 字符串字面量类型
用来约束取值只能是某几个字符串中的一个

```typescript
    type EventNames = 'click' | 'scroll' | 'mousemove';
    function handleEvent(ele: Element, event: EventNames) {
        // do someting
    }

    handleEvent(document.getElementById('hello'),'scroll'); // 只能是'click'、'scroll'、'mousemove'三种事件
```

## 元组（Tuple）
合并不同类型的对象

### 例子

```typescript
    let qzc: [string, number] = ['qzc', 18];
```

```typescript
    let qzc: [string, number];
    qzc[0] = 'qzc';
    qzc[1] = 18;

    qzc[0].slice(1);
    qzc[1].toFixed(2);
    //------也可以只赋值一项
    qzc[0] = 'qzc';
    //------直接对元组类型的变量进行初始化或者赋值的时候，要提供所有元组类型中指定的项
    qzc = ['qzc', 18];
```

### 越界元素
当赋值给越界元素时，类型会被限制为元组中每个类型的联合类型

```typescript
    let qzc: [string, number];
    qzc = ['qzc', 18, 'hhh']; // 第三项只能是string或number

    let test = qzc[2].slice(1) // 报错，因为只能访问联合类型中公有的属性或方法
```

## 枚举
用于取值被限定在一定范围内的场景。TypeScript的枚举类型概念来源于C#

### 例子

```typescript
    enum Days {Sun, Mon, Tue, Wed, Thu, Fri, Sat};
```

被编译为

```typescript
    var Days;
    (function (Days) {
        Days[Days["Sun"] = 0] = "Sun";
        Days[Days["Mon"] = 1] = "Mon";
        Days[Days["Tue"] = 2] = "Tue";
        Days[Days["Wed"] = 3] = "Wed";
        Days[Days["Thu"] = 4] = "Thu";
        Days[Days["Fri"] = 5] = "Fri";
        Days[Days["Sat"] = 6] = "Sat";
    })(Days || (Days = {}));
```

枚举成员会被赋值为从`0`开始递增的数字，同时也会对枚举值到枚举名进行反向映射

```typescript
    enum Days {Sun, Mon, Tue, Wed, Thu, Fri, Sat};

    console.log(Days["Sun"] === 0); // true
    console.log(Days["Mon"] === 1); // true
    console.log(Days["Tue"] === 2); // true
    console.log(Days["Sat"] === 6); // true

    console.log(Days[0] === "Sun"); // true
    console.log(Days[1] === "Mon"); // true
    console.log(Days[2] === "Tue"); // true
    console.log(Days[6] === "Sat"); // true
```

### 手动赋值

```typescript
    // 未手动赋值的枚举项接着上一个枚举项递增，递增步长为1
    enum Days {Sun = 7, Mon = 1, Tue, Wed, Thu, Fri, Sat};
    // 避免赋值项与未赋值项重复
    enum Days {Sun = 3, Mon = 1, Tue, Wed, Thu, Fri, Sat};
    // 手动赋值可以不是数字，用类型断言让tsc无视类型检查。赋值为非数字时，该项后面不能紧接一个未手动赋值项
    enum Days {Sun = 7, Mon, Tue, Wed, Thu, Fri, Sat = <any>"S"};
    // 手动赋值可以是小数或负数，后续递增步长为1
    enum Days {Sun = -1, Mon, Tue = 2.1, Wed, Thu, Fri, Sat};
```

### 常数项和计算所得项

```typescript
    enum Color {Red, Green, Blue = "blue".length};
```
* `Blue`为计算所得项。未手动赋值的项不能紧接在计算所得项后面

### 常数枚举

```typescript
    const enum Directions {
        Up,
        Down,
        Left,
        Right
    }
    let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
```

常数枚举在编译阶段会被删除，并且不能包含计算成员

上例编译后

```javascript
    var directions = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */];
```

### 外部枚举
和声明语句一样，常出现在声明文件中

```typescript
    declare enum Directions {
        Up,
        Down,
        Left,
        Right
    }
    let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
```

上例编译后

```javascript
    var directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
```

同时使用`declare`和`const`

```typescript
    declare const enum Directions {
        Up,
        Down,
        Left,
        Right
    }
    let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];

```

上例编译后

```javascript
    var directions = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */];
```
