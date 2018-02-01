let burger: string = "hamburger",
    calories: number = 300,
    tasty: boolean = true;
function speak(food:string,energy:number): string{
    return "The " + food + " has " + energy + " calories.";
}

/* --------------------------------------- */
interface Food{
    name: string;
    calories: number;
}
interface Talk{
    (food: Food): string;
}
let talk: Talk = function(food: Food): string{
    return "The " + food.name + " has " + food.calories + " calories.";
}
let ice_cream: Food = { name: "ice cream", calories: 200 };

let info:string = talk(ice_cream);
document.getElementsByTagName("h1")[0].innerHTML = info;

/* --------------------------------------- */

class Menu {
    items: Array<string>;
    pages: number;

    constructor(item_list: Array<string>, total_pages: number) {
        this.items = item_list;
        this.pages = total_pages;
    }

    list(): void{
        for(let i=0,len=this.items.length; i<len;i++){
            console.log(this.items[i]);
        }
    }
}

let sundayMenu = new Menu(["pancakes","waffles","orange juice"],1);

sundayMenu.list();

// 继承
class ExtraMenu extends Menu {
    constructor(item_list: Array<string>,total_pages: number){
        super(item_list,total_pages);
    }
    list(): void{
        console.log("This is a extra menu");
        for(let i in this.items){
            console.log(this.items[i]);
        }
    }
}

let eMenu = new ExtraMenu(['a','b','c'],2);

eMenu.list();
