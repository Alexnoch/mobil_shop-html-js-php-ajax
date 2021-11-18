var miniCart ={};

//-------------ЗАПРОС В БАЗУ НА ЗАГРУЗКУ ТОВАРОВ--------------------
function loadGoodsInDB(){
    $.post('script/MainLoadAllGoods.php',
            {
            "action":"givemeallgoods"
            },
            getJsonResult
);
    };

// Загрузка товаров из БД на главную страницу
function getJsonResult(data){
    var allGoodsObject = JSON.parse(data);

    var allGoods = [];
    for(var key in allGoodsObject){
        allGoods.push(allGoodsObject[key]);
    };
    console.log(allGoods);
    var out = '';
    for(var i = 0; i<allGoods.length; i++){
         out +='<div class="cart-test">';
         out +='<img class="cart-img" src="img/jpeg/'+allGoods[i].image+'">';
         out +='<p class="cart-model">'+allGoods[i].model+'</p>';
         out +='<p class="cart-cost">'+allGoods[i].cost+'</p>';
         out +='<p class="cart-desc">'+allGoods[i].description+'</p>';
         out +='<button class="cart-buy" id="">Купить</button>';
         out +='</div>';
        }
        $('.block-content__row').html(out);
        $('.cart-buy').on('click',addToCart);
    }
    
function addToCart(){
    // Добавить в корзину
    var id = $(this).attr('id');

    if(miniCart[id] == undefined){
        miniCart[id] = 1;
    }else{
        miniCart[id]++;
    }
      
    allMiniGoods(miniCart);
    saveToLocalStorage();
}

function allMiniGoods (){
    // Показать общее количество товаров в мини корзине
    var result = 0;
    for(key in miniCart){
        result +=miniCart[key];
    }
    $('#size').html(result);
}

function saveToLocalStorage(){
    localStorage.setItem('miniCart',JSON.stringify(miniCart));    
}

function loadCart() {
    //проверяю есть ли в localStorage запись cart
    if (localStorage.getItem('miniCart')){
        // если есть - расширфровываю и записываю в переменную cart
        miniCart = JSON.parse(localStorage.getItem('miniCart'));
        allMiniGoods();   // Не забываю после прогрузки показывать корзину   
    }
}

$(document).ready(function(){
    loadGoodsInDB();
    loadCart();
})