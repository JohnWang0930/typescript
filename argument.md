# 关于Arguments对象

## 1.特性
`arguments`对象和`Function`是分不开的。`arguments`无法显式创建，只有函数开始时才可用。

## 2.使用方法
`arguments`是类数组，访问单个参数的方法和访问数组元素的方式相同。

`arguments[0]`

在js中，不需要明确指出参数名，就能访问它们

```typescript
function test(){
    let s = "";
    console.log(arguments)
    for(let i = 0; i < arguments.length; i++){
        console.log(arguments[i]);
        s += arguments[i]+",";
    }
    return s;
}
```

## 3.属性
* length
 与数组length相同
* callee
 用于引用该函数的函数体内当前正在执行的函数
 **在匿名函数中很有用
 **由于会影响现代浏览器性能和闭包，在ES5严格模式中删除

## 4.转换为真正的`Array`

```typescript
var args = Array.prototype.slice.call(arguments);
var args = [].slice.call(arguments);

// es6
const args = Array.from(arguments);
```

对参数使用`slice`会阻止某些JavaScript引擎中的优化
通过遍历`arguments`对象来构造一个新的数组

```typescript
var args = (arguments.length === 1 ? [arguments[0]:Array.apply(null, arguments)]);
```
