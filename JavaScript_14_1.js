"use strict";

// Написання функцій стрілкам
const arrow = $("div.arrow");

$(arrow[0]).click(() =>{
    openVarieties(0);
});
$(arrow[1]).click(() =>{
    openVarieties(1);
});
$(arrow[2]).click(() =>{
    openVarieties(2);
});
$(arrow[3]).click(() =>{
    openVarieties(3);
});
$(arrow[4]).click(() =>{
    openVarieties(4);
});

const cheese_varieties = $(".cheese_varieties"); // список, який можна відкривати/закривати

let press_arrow = [];               // масив змінних, кожен елемент якого показує, чи була натиснута відповідна стрілка

for(let i = 0; i < arrow.length; i++){
    press_arrow[i] = false;
}
// Функція, яка відкриває чи закриває список
function openVarieties(n){
    if(press_arrow[n] == false){
        press_arrow[n] = true;
        arrow.eq(n).html("&#8659");
        $(cheese_varieties[n]).css("display", "block");
    }
    else if(press_arrow[n] == true){
        press_arrow[n] = false;
        arrow.eq(n).html("&#8658");
        $(cheese_varieties[n]).css("display", "none");
    }
}
// Ціни на компоненти піци
const cheese_variety = $(".cheese_variety");

// ціни порцій сирів
let price1 = [40, 44, 47, 43, 42, 47, 50, 49]; // відповідно: Пекоріно, Гауда, Пармезан, Чеддер, Маасдам, Гарроча, Конте, Рікота.

// ціни порцій ковбас
let price2 = [38, 39, 36, 40, 39, 37, 38, 41, 35, 36];
// відповідно: Сом, Лосось, Шинка елітна, Шинка Царська, Буженина домашня, Ковбаса Президентська, Ковбаса Орнамент, Шинка Розкіш,
// Ковбаса Гетьманська, Ковбаса Монблан.

// ціни порцій соусів
let price3 = [20, 21, 24, 22]; // відповідно: томатний, овочевий, вершковий, з червоним вином.

// ціни порцій овочів
let price4 = [21, 23, 29, 22, 25, 22]; // відповідно: кукурудза, цибуля, ананас, гриби, перець, томати чері.

// об'єднуємо масиви усіх цін в один
let price = $.merge($.merge(price1, price2), $.merge(price3, price4)); // масив усіх цін. Якщо який-небудь компонент поки відсутній, його ціна встановлюється нульовою.

let price_small = 60;                   // ціна малої заготовки піци
let price_middle = 80;                  // ціна середньої заготовки піци
let price_big = 100;                    // ціна великої заготовки піци

let bread = false;                              // змінна, яка показує, чи вибрали заготовку піци
let acception = false;                          // змінна, яка показує, чи натиснули "Оформити замовлення"
let bread_price = 0;                            // ціна заготовки, яка залежить від розміру останньої
let result = 0;                                 // ціна усієї піци разом
const res = $("#price");                        // рядок для виведення ціни
const _bread = $("div.bread");

// функції вибору заготовок піци
$(cheese_variety[cheese_variety.length - 3]).click(() =>{
    selectBread('Маленька');
});
$(cheese_variety[cheese_variety.length - 2]).click(() =>{
    selectBread('Середня');
});
$(cheese_variety[cheese_variety.length - 1]).click(() =>{
    selectBread('Велика');
});
// за замовчуванням вибирається маленька заготовка
selectBread('Маленька');

const text_area = $("textarea");

function selectBread(bread_size){
    if(bread == false && acception == false){
        bread = true;
        switch(bread_size){
            case 'Маленька':
                result += price_small;
                bread_price = price_small;
                break;
            case 'Середня':
                result += price_middle;
                bread_price = price_middle;
                break;
            case 'Велика':
                result += price_big;
                bread_price = price_big;
                break;
        }
        res.text(result);
        _bread.prepend("<div id='size'></div>");
        $("#size").text(bread_size);
    }
    if(bread == true && acception == false){
        switch(bread_size){
            case 'Маленька':
                result -= bread_price;
                result += price_small;
                bread_price = price_small;
                break;
            case 'Середня':
                result -= bread_price;
                result += price_middle;
                bread_price = price_middle;
                break;
            case 'Велика':
                result -= bread_price;
                result += price_big;
                bread_price = price_big;
                break;
        }
        res.text(result);
        $("#size").text(bread_size);
    }
}

// функція кнопки відміни даного вибору
$("#cancel").click(() =>{
    result = 0;
    acception = false;
    $("textarea").html('');
    $("#size").remove();
    $("div.bread li.cheese_variety").remove();
    bread = false;   
    selectBread('Маленька');
});

// функція кнопки "Оформити замовлення"
$("#accept").click(() =>{
    if(acception == false){
        acception = true;
        alert('Заповніть форму нижче після завершення конструювання піци');
        text_area.prepend($("#size").text());
        text_area.append(result);
    }
});

// функція добавки компонентів в піцу
let components = $("li.cheese_variety");
for(let i = 0; i < $("li.cheese_variety").length - 3; i++){
    components.eq(i).click(() =>{
        if(bread == true && acception == false && price[i] != 0){
            components.eq(i).clone().appendTo(_bread);
            text_area.append($(components[i]).text());
            result += price[i];
            res.text(result);
        }
        if(bread == true && acception == false && price[i] == 0){
            alert('Компонент тимчасово відсутній');
        }
    });
}


// втеча кнопки "Отримати знижку"
let discount = $("#discount");
let x = discount.offset().left;
let y = discount.offset().top;
let discount_w = discount.width();
let discount_h = discount.height();
$(_bread).mousemove(() =>{
    if(event.clientX >= x && event.clientX <= (x + discount_w + 3) && event.clientY >= y && event.clientY <= (y + discount_h + 3)){
        discount.css("marginLeft", Math.floor(Math.random() * ($("div.bread").width() * 0.9 - discount_w)) + 'px');
        discount.css("marginTop", Math.floor(Math.random() * ($("div.bread").height() * 0.8 - discount_h)) + 'px');
        x = discount.offset().left;
        y = discount.offset().top;
    }
});

// перелистування картинок піци
let a = 'url(\'img14_1/bread';
let b = '\.jpg\')';
//$("div.bread").css("background-image", "url('img14_1/bread0.jpg')");
let picture_number = 0;

// перелистування назад
$("#previous").click (() => {
    if(picture_number == 0){
        picture_number = 2;
    }
    else{
        picture_number--;
    }
    $("div.bread").css("background-image", a + picture_number + b);
});

// перелистування вперед
$("#next").click (() => {
    drawNextPicture();
});
function drawNextPicture(){
    if(picture_number == 2){
        picture_number = 0;
    }
    else{
        picture_number++;
    }
    $("div.bread").css("background-image", a + picture_number + b);
}
// самостійне перелистування з інтервалом 15 секунд
setInterval(drawNextPicture, 15000);