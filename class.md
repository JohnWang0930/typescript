# 类
传统方法中，JavaScript 通过构造函数实现类的概念，通过原型链实现继承。而在 ES6 中，我们终于迎来了 class。

TypeScript 除了实现了所有 ES6 中的类的功能以外，还添加了一些新的用法。

## 概念

* 类（Class）：定义了一件事物的抽象特点，包含它的属性和方法
* 对象（Object）：类的实例，通过`new`生成
* 面向对象（OOP）的三大特征：封装、继承、多态
* 封装（Encapsulation）：将对数据的操作细节隐藏起来，只暴露对外的接口。外界调用端不需要（也不能）知道细节，就能通过对外提供的接口来访问该对象，同时也保证了外界无法任意更改对象内部的数据
* 继承（Inheritance）：子类继承父类，子类除了拥有父类的所有特性外，还有一些更具体的特性
* 多态（Polymorphism）：由继承而产生了相关的不同的类，对同一个方法可以有不同的响应。比如`Cat`和`Dog`都继承`Animal`，但是分别实现了自己的`eat`方法。此时针对某个实例，我们无需了解她是`Cat`还是`Dog`，就可以直接调用`eat`方法，程序会自动判断出阿里应该如何执行`eat`
* 存取器（getter&setter）：用来改变属性的读取和赋值行为
* 修饰符（Modifiers）：修饰符是一些关键字，用于限定成员或类型的性质。比如`public`表示公有属性或方法
* 抽象类（Abstract Class）：抽象类是供其它类继承的基类，抽象类不允许被实例化。抽象类中的抽象方法必须在子类中被实现
* 接口（Interface）：不同类之间公有的属性或方法，可以以抽象成一个接口。接口可以被类实现（implements）。一个类只能继承另一个类，但是可以实现多个接口

## ES6中类的用法

具体可以参考 [ECMAScript 6 入门](http://es6.ruanyifeng.com/#docs/class);

### 属性和方法
```javascript
    class Animal {
        constructor(name) {
            this.name = name;
        }
        sayHi() {
            return `My name is ${this.name}`;
        }
    }

    let a = new Animal('Jack');
    console.log(a.sayHi()); // My name is Jack;
```

### 类的继承
```javascript
    class Cat extends Animal {
        constructor (name) {
            super(name); // 调用父类的 constructor(name)
            console.log(this.name);
        }
        sayHi() {
            return 'Meow, ' + super.sayHi() // 调用父类的sayHi()
        }
    }

    let c = new Cat('Tom');
    console.log(c.sayHi()); // Meow, My name is Tom
```

### 存取器
setter 和 getter 可以改变属性的赋值和读取行为
```javascript
    class Animal {
        constructor(name) {
            this.name = name;
        }
        get name(){
            return 'Jack';
        }
        set name(value){
            console.log('setter: ' + value);
        }
    }

    let a = new Animal('kitty'); // setter: kitty
    a.name = 'Tom'; // setter: Tom
    console.log(a.name) // Jack
```

### 静态方法
`static`修饰符修饰的方法成为静态方法，不需要实例化，而是直接通过类来调用
```javascript
    class Animal {
        static isAnimal(a) {
            return a instanceof Animal;
        }
    }

    let a = new Animal('Jack');
    Animal.isAnimal(a); // true
    a.isAnimal(a); // TypeError: a.isAnimal is not a function
```

## ES7中类的用法

### 实例属性

```javascript
    class Animal {
        name: 'Jack';
        constructor() {
            // ...
        }
    }

    let a = new Animal();
    console.log(a.name); // Jack
```

### 静态属性

```javascript
    class Animal {
        static num = 12;
        constructor() {
            // ...
        }
    }

    console.log(Animal.num); // 12
```

## TypeScript中类的用法

### public provate和protected

TypeScript可以使用三种访问修饰符（Access Modifiers），分别是`public`、`private`和`protected`
* `public`修饰的属性或方法是公有的，可以再任何地方被访问到，默认所有的属性和方法都是`public`
* `private`修饰的属性或方法是私有的，不能再声明它的类的外部访问
* `protected`修饰的属性或方法是受保护的，它和`private`类似，区别是它在子类中也是允许被访问的

```typescript
    class Animal{
        private name;
        public constructor(name) {
            this.name = name;
        }
    }

    let a = new Animal('Jack');
    console.log(a.name) // 不允许访问
    a.name = 'Tom'; // 不允许访问
```

**编译之后的代码并没有限制 `private`属性在外部的可访问性

在子类中，`private`修饰的属性和方法也不允许访问，`protected`修饰的属性和方法可以访问
```typescript
    class Animal {
        private name;
        public constructor(name){
            this.name = name;
        }
        protected myName(name){
            return `My name is ${name}`;
        }
    }

    class Cat extends Animal {
        constructor(name){
            super(name);
            console.log(this.name); // 不允许访问
        }
        myName(name) {
            return 'Hi'+ super.myName(name); // 允许访问
        }
    }
```

### 抽象类
不允许被实例化，继承该抽象类的子类必须实现该类的抽象方法

```typescript
    abstract class Animal{
        name;
        constructor(name) {
            this.name = name;
        }
        abstract sayHi();
    }

    // 错误示范-------------------
    let a = new Animal('Jack'); // 不允许被实例化

    class Cat extends Animal {
        // 未实现抽象类的抽象方法
        public eat(){
            console.log(`${this.name} is eating`);
        }
    }

    // 正确示范-------------------
    // 正确调用
    class Cat extends Animal {
        public sayHi() {
            console.log(`My name is ${this.name}`);
        }
    }
    let cat = new Cat('Tom');
```
*建议看看编译后的js文件

### 类的类型
与接口类似

```typescript
    class Animal{
        name: string;
        constructor(name:string) {
            this.name = name;
        }
        sayHi(): string {
            return `My name is ${this.name}`;
        }
    }

    let a:animal = new Animal('Jack');
    console.log(a.sayHi()); // My name is Jack
```

## 类与接口

接口可以用于对对象的形状进行描述，还可以对类的一部分行为进行抽象

### 类实现接口

实现（impleements）是面向对象中的一个重要概念。一般来讲，一个类只能继承自另一个类，有时候不同类之间可以有一些共有的特性，这时候就可以把特性提取成接口，用 `implements`关键字来实现。这个特性大大提高了面向对象的灵活性。

ex：门是一个类，防盗门是门的子类。防盗门有一个报警器的功能。如果有另一个类，车，也有报警器的功能，就可以考虑把报警器提取出来，作为一个接口，防盗门和车都去实现它

```typescript
    interface Alarm{
        alert();
    }
    class Door{

    }
    class SecurityDoor extends Door implements Alarm {
        alert(){
            console.log("SecurityDoor alert");
        }
    }
    class Car implements Alarm {
        alert(){
            console.log("Car alert");
        }
    }
```

一个类可以实现多个接口

```typescript
    interface Alarm{
        alert();
    }

    interface Light {
        lightOn();
        lightOff();
    }

    class Car implements Alarm, Light {
        alert() {
            console.log("Car alert");
        }
        lightOn() {
            console.log('Car light on');
        }
        lightOff() {
            console.log('Car light off');
        }
    }
```

### 接口继承接口

```typescript
    interface Alarm{
        alert();
    }
    interface LightableAlarm extends Alarm{
        lightOn();
        lightOff();
    }
```

### 接口继承类

```typescript
    class Point {
        x: number;
        y: number;
    }

    interface Point3d extends Point {
        z: number;
    }

    let point3d: Point3d = {x: 1, y: 2, z: 3};
```

### 混合类型

用接口的方式来定义一个函数需要符合的形状

```typescript
    interface SearchFunc {
        (source: string, subString: string): boolean;
    }

    let mySearch: SrearchFunc;
    mySearch = function(src: string, sub: string) {
        return src.search(sub) !== -1;
    }
```

还可以有属性和方法

```typescript
    interface Counter {
        (start: number): string;
        interval: number;
        reset(): void;
    }

    function getCounter(): Counter {
        let counter = <Counter>function (start: number) {};
        counter.interval = 123;
        counter.reset = function () {};
        return counter;
    }

    let c = getCounter();
    c(10);
    c.reset();
    c.interval = 5.0;
```
