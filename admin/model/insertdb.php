<?php
require_once('connect.php');

function checkgoodsdb($conn,$model){
$model = $_POST['model'];
$sql = "SELECT * FROM `mobilpro-goods` WHERE `model` = '$model'";  // Запрос на поиск модели из формы по базе данных
$result = mysqli_query($conn,$sql);  // Возвращает Обьект (Класс)
checkGoods($result,$model,$conn);   // Вызываем функцию checkGoods в контроллере
};

?>