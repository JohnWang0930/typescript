# 类型断言

## 语法
`<类型>值` 或者 `值 as 类型`
在tsx语法（jsx语法的ts版）中，必须用后者。

##例子：将一个联合类型的变量指定为一个更加具体的类型
```typescript
function getLength(something: string | number): number {
  if((<string>something).length) {
    return (<string>something).length;
  } else {
    return something.toString().length
  }
}

function getLength(something: string | number): number {
  if((something as string).length) {
    return (something as string).length;
  } else {
    return something.toString().length
  }
}
```
类型断言不是类型转换，断言成联合类型中不存在的类型是不允许的。
