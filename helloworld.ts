class Student {
    fullName: string;
    // 使用 public 等同于创建了同名的成员变量
    constructor(public firstName, public middleInitial, public lastName) {
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
}
interface Person{
    firstName: string;
    lastName: string;
}
function greeter(person:Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}
let user = new Student("Zhicheng", 1,"Qian");

document.body.innerHTML = greeter(user);
