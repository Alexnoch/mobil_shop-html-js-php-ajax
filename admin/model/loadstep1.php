<?php
require_once('connect.php');

function loadiphones($conn){
    $sql = "SELECT * FROM `mobilpro-goods` WHERE `model` LIKE '%iphone%'";
    $result = mysqli_query($conn,$sql);
    loadiphonesPage($result);
};



?>