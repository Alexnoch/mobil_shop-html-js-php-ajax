<?php
require_once('../model/updateModel.php'); 
$model = $_POST['model'];
$img = $_POST['img'];
$cost = $_POST['cost'];
$desc = $_POST['description'];
$action = $_POST['UpdateModel'];

switch($action){
    case "UpdeteModel":
        updateModel($conn,$model);
    break;    
};

function updateResult($result,$model){
    echo "$model Успешно обновлена";
}

?>