<?php
require_once('model/insertAllGoods.php');

$action = $_POST['action'];

switch($action){
    case "givemeallgoods":
        givemeallgoods($conn);
};

function result($query){
    $allgoodsarray =[];
    while($row = mysqli_fetch_assoc($query)){
        array_push($allgoodsarray, $row);
    };
    
    
    echo json_encode($allgoodsarray);
};
?>