<?php 
require_once('connect.php');

function givemeallgoods($conn){
$sql = "SELECT * FROM `mobilpro-goods` WHERE `model` LIKE '%iphone%' LIMIT 10";
$query = mysqli_query($conn,$sql);
result($query);
};
?>