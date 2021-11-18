<?php
require_once('../model/saveNewModel.php');


$img = $_POST['img'];
$model = $_POST['model'];
$cost = $_POST['cost'];
$description = $_POST['description'];
$action = $_POST['action'];
// Отправляем на БД
if($action =='saveindatabase'){
    savenewmodel($conn,$img,$model,$cost,$description);
}else{
    echo 'Неудача на сценарии Контроллера';
};
//Получаем из БД

function resultfunc(){
    echo 'Данные успешно сохранены';
};
?>