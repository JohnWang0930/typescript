/*
基础类型和变量声明
(let const var 省略)
*/
// 布尔值
let isDone: boolean = true;

// 字符串和数字（数字支持二进制、八进制、十进制、十六进制）
let decLiteral:number = 7; // 十进制
let hexLiteral:number = 0xf00d; // 十六进制
let binaryLiteral:number = 0b1010; // 二进制
let octalLiteral:number = 0o744; // 八进制

let people: string = "qzc";
let age: number = 12;

// 模板``
let sentence: string = `hello, I am ${people}. I'm ${age} years old`;

// 数组
let list: number[] = [1,2,3];
let list2: Array<number> = [1,2,3];

// 元组Tuple
let x: [string, number];
x = ['hello', 10];
// 当访问一个越界的元素，会使用联合类型替代
x[3] = 'world';
console.log(x[5].toString());

// 枚举
// 默认从0开始，可以手动指定成员数值
enum Color {Red = 1, Green, Blue}
// Color = {1: "Red", 2: "Green", 3: "Blue", Red: 1, Green: 2, Blue: 3}
let co: Color = Color.Green;
let colorName: string = Color[2];

// any类型
let notSure: any = 4;
notSure = true;
let listAny: any = [1,"2", true];

// void类型
// 当一个函数没有返回值时，通常会见到其返回值类型是 void
function warnUser(): void{
    alert("This is my warning message");
}
// void类型变量只能赋值 undefined和 null
let unusable: void = undefined;

// Null 和 Undefined
// 默认情况下null和undefined是所有类型的子类型
// 指定 --strictNullChecks后，null和undefined只能赋值给void和它们各自。若想传入一个null或undefined，可以使用联合类型
let u: undefined = undefined;
let n: null = null;

// never类型
// 抛出异常或不会有返回值的函数表达式
function error(message: string): never {
    throw new Error(message);
}

function infiniteLoop(): never{
    while (true){}
}

// 类型断言
// 仅在编译阶段起作用
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;

//---------------------------//

// 解构-------------------
// 解构数组
let input = [1,2];
let [first,second] = input;// first=input[0]; second=input[1];
// swap variables
[first, second] = [second, first];
// 用...创建剩余变量
let [one,...rest] = [1,2,3,4]; // one = 1;...rest = [2,3,4];
// 忽略其他元素
let [st] = [1,2,3,4]; // st = 1
let [, nd, ,th] = [1,2,3,4]; // nd = 2; th = 4

// 解构对象
let o = {
    a: "foo",
    b: 12,
    c: "bar"
};
let {a, c} = o; // {"foo", "bar"}
let {b,...re} = o; // b=12;re={a:"foo",c:"bar"}
let {a:newName1, b:newName2} = o; // let newName1 = o.a;let newName2 = o.b;
// let {a, b}: {a: string, b: string} // 指定类型

// 函数声明
type C = {a: string, b?: number} // b为可选属性，在interface中会提到
function fun({a, b}: C):void{
    // ...
}
// 指定默认值
function fun1({a,b}={a:"",b:0}):void{
    // ...
}
fun1(); // {a:"",b:0}
// b为可选属性
function fun2({a,b=0}={a:""}):void{
    // ...
}
fun2({a:"yes"}); // a="yes",b=0
fun2(); // a="",b=0

// 展开-------------------
// 数组
let arr_1 = [1,2];
let arr_2 = [3,4];
let bothPlus = [0,...arr_1,...arr_2,5]; // bothPlus = [0,1,2,3,4,5];arr_1和arr_2不变

// 对象
let obj_1 = {firstName:"Luffy", middleName: "D.", lastName: "Monkey"};
let onePiece = {firstName: "路飞",...obj_1} // obj_1中的firstName会覆盖firstName: "路飞"
// 展开只包含对象自身的可枚举属性，不包含方法
class D {
    p=12;
    m() {

    }
}
let d = new D();
let clone = {...d}; // clone = {p:12}
