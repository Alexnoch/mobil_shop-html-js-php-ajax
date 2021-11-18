<?php
require_once('../model/loadstep1.php'); // ШАГ 1 Загрузка моделей

// ---------------------------ШАГ 1 Подгрузка из БД моделей-------------
$loadstepone = $_POST['loadiphones'];

switch($loadstepone){
    case "loadiphones":
        loadiphones($conn);
    break;
};

function loadiphonesPage($result){
    $test = [];
    while($row = mysqli_fetch_assoc($result)){
        array_push($test, $row);
    };

    echo json_encode($test);
};
?>
