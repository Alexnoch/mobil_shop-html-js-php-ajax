var goods = [];
var boolean ={};
// ----------------------------------------ШАГ 1 НАЧАЛО-----------------------
//-------------------------Загрузка ШАГ 1 Категории айфоны из БД--------------
function stepOneIphones(){
    $.post('controller/loadstep1.php',
    {
        "loadiphones":"loadiphones"
    },
    loadiphones
    );
};
function loadiphones(data){
    var result = JSON.parse(data);
    var model = [];
    for(i =0; i<result.length; i++){
        model.push(result[i].model)
    };
    for(i =0; i<model.length; i++){
        $('.select-menu').prepend('<option>'+model[i]+'</option>');
    }; 
    goods.push(result);
};
//-------------------------------------ШАГ 1 конец--------------------------------
// --------------------------------------ШАГ 2 Начало  Визуальное отображение товаров-----------------------
//Получение значения из меню option - выбор модели телефона
$('.select-menu').on('change',selectHash);
$('#query').on('click',viewGoods);
function selectHash(){
     var hash = ''; 
     hash = $(this).val();
     viewGoods(hash);
}
// Выборка из Обьекта goods всех характеристик по модели из хэша
function viewGoods(hash){
    for(var i = 0; i<goods[0].length; i++){
        if(goods[0][i].model == hash){
            var viewGood = goods[0][i];
            queryGoods(viewGood);
            writeMargin(viewGood);
        }
     } 
}
// Отображение данных в ШАГ 2. Отрисовка товара.
function queryGoods(viewGood){
    out = '';
    out +='<div class="admin-cart">';
    out +='<div>';
    out +='<img src="../img/jpeg/'+viewGood.image+'" class="admin-image">';
    out +='</div>';
    out += '<p class="admin-model"> Модель: '+viewGood.model+'</p>';
    out += '<p class="admin-cost"> Цена: '+viewGood.cost+'</p>';
    out += '<p><span class="admin-desc"> Описание товара: </span>'+viewGood.description+'</p>';
    out +='</div>';
    $('.admin-panel-cart').html(out);
    console.log(viewGood);
}

function writeMargin(viewGood){
     $('#img').val(viewGood.image);
     $('#model').val(viewGood.model);
     $('#cost').val(viewGood.cost);
     $('#description').val(viewGood.description);
}
//------------------------------------Шаг 2 конец-----------------------------------
//--------------------ШАГ 3 начало  КОМПОНЕНТ  ------------------
$('#saveInDb').on('click',saveInDb);
//--3.0--Проверка и разветвление Создать новый товар или Обновить.
function saveInDb(){
    namePicture();
    console.log('Нажата кнопка Сохранить в БД')
    var img = namePicture();
    $('#img').val(img);
    var model= $('#model').val();
    var cost = $('#cost').val();
    var description = $('#description').val();
    $('#saveInDb').unbind('click',saveInDb);
    console.log(img);
    $.post('controller/step3Edit.php',
        {
        "action":"checkGoods",
        "model":model,
        "cost":cost,
        "description":description,
        "img":img
        },
        saveComplete
    );
};
//--3.1--Создание нового товара  !!!!-------ОБРАБОТКА СКРИПТА ВЕДЁТЬСЯ НА СЕРВЕРЕ -------!!!!!!Файл step3Edit.php
 
function saveComplete(data){
    try {
        var result = JSON.parse(data);
        if(result[1] == true){
            $('#condition').css('color','red')
            $('#condition').after('<button class="save-cancel">Отменить</button>')
            $('#condition').after('<button class="save-complete">Принять</button>')
            $('.save-complete').on('click', saveNewModelCheck);
            $('.save-cancel').on('click', cancelSave);
        }else{
            $('#condition').css('color','green');
            console.log('Сработал Else на обновление');
            // boolean.count = 0;
            function reload(){
            $('.modal-update').css('display','flex');
            }
        setTimeout(reload,2000);
    
            function sayHi() {
                location.reload();
              }
              
              setTimeout(sayHi, 4000);
            
        } 
        $('#condition').html(result[0]);
    }catch (error) {
        console.log('Возникла ошибка'+error);
        boolean.count = 0;
    }

    
}
//--3.1--Проверка перед сохранением в БД на пустоту строк + очищение строк
var saveNewModelCheck =()=>{
     if($('#img').val() && $('#model').val() && $('#cost').val() && $('#description').val() != ''){
        $('#condition').html('');
        $('.save-cancel').remove();
        $('.save-complete').remove();
         saveNewModel();   
     }else{
        $('#condition').html('');
        $('#condition').html('Заполните поля!');
        $('.save-cancel').remove();
        $('.save-complete').remove();
        $('#saveInDb').on('click',saveInDb);
     };}
//--3.1-- Окончательное сохранение товара
function saveNewModel(){
    if(boolean["count"] == 1){   // Проверка через обьект, загружена-ли картинка
    $('#saveInDb').on('click',saveInDb);
    var img = $('#img').val();
    var model= $('#model').val();
    var cost = $('#cost').val();
    var description = $('#description').val();
    $.ajax({
        type:"POST",
        url:("controller/savenewmodel.php"),
        data:{
            "action":"saveindatabase",
            "img":img,
            "model":model,
            "cost":cost,
            "description":description
        },
        beforeSend:function(){
            $('#condition').html('3...2...1...');
        },
        complete:function(){
            $('#condition').html('');
            $('#condition').css('color','green');
            $('#condition').html('Модель успешно добавлена в базу ! Обновите страницу!');
        },
        success:function(data){
            $('#img').val('');
            $('#model').val('');
            $('#cost').val('');
            $('#description').val('');
        }
        })
        boolean.count = 0;
        $('#condition').html('Картинка Загрузилась');
     }else{
        $('#condition').html('Картинка не загружена!');
        $('#saveInDb').on('click',saveInDb);
    }
       
};

// --3.1.--Обновление Товара--Проверка перед обновлением на заполнение полей.
var saveNewModelCheck =()=>{
    if($('#img').val() && $('#model').val() && $('#cost').val() && $('#description').val() != ''){
       $('#condition').html('');
       $('.save-cancel').remove();
       $('.save-complete').remove();
        // UpdateModel();   
    }else{
       $('#condition').html('');
       $('#condition').html('Заполните поля!');
       $('.save-cancel').remove();
       $('.save-complete').remove();
       $('#saveInDb').on('click',saveInDb);
    };}

//--3.1--Отмена сохранения
function cancelSave(){
    $('#img').val('');
    $('#model').val('');
    $('#cost').val('');
    $('#description').val('');
    $('#condition').html('');
    $('.save-cancel').remove();
    $('.save-complete').remove();
    $('#saveInDb').on('click',saveInDb);
}

//--3.2--Загрузка картинки в каталог сервера
$('#upload').on('click',downloadPicture);
function downloadPicture(){
    boolean.count = 1;
    var file_data = $('#sortpicture').prop('files')[0];
    var form_data = new FormData();
    form_data.append('file', file_data);
    $.ajax({
        url: 'controller/saveNewPicture.php',
        dataType: 'text',
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        type: 'post',
        success: function(php_script_response){
            boolean.count = 1;
            alert('Картинка успешно загружена в каталог сервера!');
            
        }
});
}
//--3.2. Подстановка имени картинки в поле для заполнения
// $('#upload').on('click',namePicture)
// function namePicture(){
//     var x =document.querySelector('input[type=file]').files
//     var namePicture = x[0].name;
//     console.log(typeof namePicture )
//     return namePicture;
// }

$('#upload').on('click',namePicture)
function namePicture(){
    var x =document.querySelector('input[type=file]').files
     try{
        var namePicture = x[0].name;
        return namePicture;
     }
     catch(e){
        $('#condition').html('Добавте картинку!');
        boolean.count = 0;
     }
     
}

     //--------------------------------Шаг 3 конец ------------------------------------
$('document').ready(function(){
    stepOneIphones();   
})