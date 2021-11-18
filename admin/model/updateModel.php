<?php
require_once('../controller/step3Edit.php');

function updateModel($conn,$model,$img,$cost,$desc){
    $model = $_POST['model'];
    $sql = "UPDATE `mobilpro-goods` SET `image` = '$img', `model` = '$model', `cost` = '$cost', `description` = '$desc' WHERE `mobilpro-goods`.`model` = '$model'";  // Запрос на поиск модели из формы по базе данных
    $result = mysqli_query($conn,$sql);  // Возвращает Обьект (Класс)
    };

?>