<?php
require_once('../model/connect.php');
require_once('../model/insertdb.php');   // Проверка ШАГ 3
require_once('../model/updateModel.php'); 
$model = $_POST['model'];
$action = $_POST['action'];


$img = $_POST['img'];
$cost = $_POST['cost'];
$desc = $_POST['description'];





//-------------Определяем какую функцию запустить в зависимости от AJAX запроса с JS--------
switch($action){
    case "checkGoods":
        checkgoodsdb($conn,$model);      
};
//-----------------------------------------Проверка товара в БД-------------------------------------------------
function checkGoods($result,$model,$conn){
    if($row = mysqli_fetch_assoc($result)){   // Парсит класс результата---Возвращает ассоциативный массив PHP или false
        foreach($row as $key => $value){        // Проверяем, если в массиве есть модель со значением из Формы, то сохр её в переменную и выводим сообщение
            if($value == $model){               // Единственный цикл который перебирает ассоциативный массив 1) Сам обьект 2) Ключи 3) Значения
                $modeldb = $value;
                updateModel($conn,$_POST['model'],$_POST['img'],$cost = $_POST['cost'],$_POST['description']);
                $condition[0] = 'Модель: '.$modeldb.' найдена в Базе Данных и Успешно обновлена!';
                $condition[1] = false;
                
                echo json_encode($condition);
        };
    };
    }else{
        $condition[0] = 'Такой модели нет. Хотите создать новую?';
        $condition[1] = true;
        echo json_encode($condition);
    };
};

?>