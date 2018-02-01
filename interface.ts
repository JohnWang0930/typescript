/*
接口
*/
// TypeScript的核心原则之一是对值所具有的结构进行类型检查。 它有时被称做“鸭式辨型法”或“结构性子类型化”。 在TypeScript里，接口的作用就是为这些类型命名和为你的代码或第三方代码定义契约。
interface LabelledValue {
    label: string;
}

function printLabel(labelledObj: LabelledValue) {
    console.log(labelledObj.label);
}

let myObj = {size:10, label: "Size 10 Object"};
printLabel(myObj);

// 可选属性-----------------------
interface SquareConfig{
    color?: string;
    width?: number;
}

function createSquare(config: SquareConfig): {color: string;area: number} {
    let newSquare= {color: "white",area: 100};
    if (config.color) {
        newSquare.color = config.color;
    }
    if (config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare;
}

// 只读属性-----------------------
// readonly作为属性使用，const作为变量使用
interface Point{
    readonly x: number;
    readonly y: number;
}
let p1: Point = {x:10, y:20}; // 赋值后x,y不能被改变
// ReadonlyArry<T>
let q: number[] = [1,2,3,4];
let ro: ReadonlyArray<number> = q; // ro无法被修改，也无法赋值给别的数组

q = ro as number[]; // 可以用类型断言重写

// 额外的属性检查-----------------------
/* interface SquareConfig{
    color?: string;
    width?: number;
}

function createSquare(config: SquareConfig): {color: string;area: nu-mber} {
    let newSquare= {color: "white",area: 100};
    if (config.color) {
        newSquare.color = config.color;
    }
    if (config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare;
} */
// 绕开目标类型检查
// 1.使用类型断言
let mySquare = createSquare({colour: "red",width: 100} as SquareConfig);

// 2.赋值给另一个变量
let squareOption = { colour: "red", width: 100};
mySquare = createSquare(squareOption);

// 3.添加一个字符串索引签名（最佳）
interface SquareConfig{
    color?: string;
    width?: number;
    [propName: string]: any; // 只要属性不是color和width，数量、类型无限制
}

// 函数类型-----------------------
interface SearchFunc {
    (source: string, subString: string): boolean;
}
let mySearch: SearchFunc;
mySearch = function(src, sub) {
    let result = src.search(sub);
    return result > -1;
}
mySearch("1","12");
