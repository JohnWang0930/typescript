var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var burger = "hamburger", calories = 300, tasty = true;
function speak(food, energy) {
    return "The " + food + " has " + energy + " calories.";
}
var talk = function (food) {
    return "The " + food.name + " has " + food.calories + " calories.";
};
var ice_cream = { name: "ice cream", calories: 200 };
var info = talk(ice_cream);
document.getElementsByTagName("h1")[0].innerHTML = info;
/* --------------------------------------- */
var Menu = /** @class */ (function () {
    function Menu(item_list, total_pages) {
        this.items = item_list;
        this.pages = total_pages;
    }
    Menu.prototype.list = function () {
        for (var i = 0, len = this.items.length; i < len; i++) {
            console.log(this.items[i]);
        }
    };
    return Menu;
}());
var sundayMenu = new Menu(["pancakes", "waffles", "orange juice"], 1);
sundayMenu.list();
// 继承
var ExtraMenu = /** @class */ (function (_super) {
    __extends(ExtraMenu, _super);
    function ExtraMenu(item_list, total_pages) {
        return _super.call(this, item_list, total_pages) || this;
    }
    ExtraMenu.prototype.list = function () {
        console.log("This is a extra menu");
        for (var i in this.items) {
            console.log(this.items[i]);
        }
    };
    return ExtraMenu;
}(Menu));
var eMenu = new ExtraMenu(['a', 'b', 'c'], 2);
eMenu.list();
