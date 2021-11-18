<?php
require_once('connect.php');

function savenewmodel($conn,$img,$model,$cost,$description){
$sql = "INSERT INTO `mobilpro-goods` (`id`, `image`, `model`, `cost`, `description`) VALUES (NULL, '$img', '$model', '$cost','$description')";
$result = mysqli_query($conn,$sql);
resultfunc();
};
?>