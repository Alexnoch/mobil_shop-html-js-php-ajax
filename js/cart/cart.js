var localGoods = '';
// ЗАгрузка данных из Локального Хранилища
function loadLocalStorage(){            
 var getlocal = localStorage.getItem('miniCart');
 localGoods = JSON.parse(getlocal);


 
 if ($.isEmptyObject(localGoods)){
    console.log('пуст');
    }else{
        console.log('Что-то есть')
    }
}

// Получение данных из JSON файла
$.getJSON('goods.json',showMyJson);
var jsonGoods = '';


// Передача обьекта JSON и вызов показа карточки товара
function showMyJson(data){
        jsonGoods = data;
        showMyCart();
}



// Формирование карточки товара
function showMyCart(){
    var out ='';
    var prob =[];
    for(var key in localGoods){
        out += '<div class="head__cart-box">';
        out +='<img src="'+jsonGoods[key].img+'">';
        out += '<p class="head__cart-box-model">'+jsonGoods[key].model+'</p>';
        out +='<div class="head__cart-box-interface">';
        out +='<button class="cart-button-m" id="'+key+'">-</button>';
        out +='<p>'+localGoods[key]+'</p>';
        out +='<button class="cart-button" id="'+key+'">+</button>';
        out += '</div>';
        out +='<p>Стоимость: <span>'+jsonGoods[key].cost+'р </span>1 шт</p>';
        out +='<p>Общая стоимость: <span>'+jsonGoods[key].cost*localGoods[key]+'р </span>'+localGoods[key]+' шт</p>';
        out +='</div>';
        prob.push(jsonGoods[key].cost*localGoods[key]); 
    }

    $('.head__cart-container').html(out);
    $('.cart-button').on('click',plusGoods);
    $('.cart-button-m').on('click',minusGoods);
    allMiniGoods();
    myTest(prob);
}
// Общая цена за все покупки!
    function myTest(prob){          
    var ress =0;    
    for(i=0; i<prob.length; i++){
         ress += prob[i];
        }
        $('#resul').html(ress);     
    };


function minusGoods(){
    var id = $(this).attr('id');
    if(localGoods[id] == 1){
        delete localGoods[id]
    }else{
        localGoods[id] = localGoods[id] - 1;
    }
    
    mraze();
    showMyCart();
}


function plusGoods(){
    var id = $(this).attr('id');
    localGoods[id] = localGoods[id] + 1;
    mraze();
    showMyCart();
}

// Сохранение в LocalStorage
function mraze(){
    localStorage.setItem('miniCart', JSON.stringify(localGoods));
}

// Показать общее количество товаров в мини корзине
function allMiniGoods (){
    var result = 0;
    for(key in localGoods){
        result +=localGoods[key]; 
    }
    $('#size').html(result);
}
// Отправка на сервер
function sendMail(){
    var mailname = $('#mailname').val();
    var mail = $('#mail').val();

        $.post('script/mail/mail.php',
        {
            "mailnames":mailname,
            "mails":mail,
            "jsongoods":jsonGoods
        },
        function(data){
            if(!data == ''){
                console.log('Заказ отправлен');
                $('.mail__row').html(data);
                
            }else{
                console.log('Заказ не отправлен. Произошла ошибка!')
            }
        }
    )
}


$(document).ready(function(){
    $('#sendMail').on('click',sendMail);
    loadLocalStorage();
    showMyCart();
})