<?php 
define("LOCALHOST", "localhost");
define("USERNAME","root");
define("PASSWORD","");
define("DATABASE","mobilpro");

$conn = mysqli_connect(LOCALHOST,USERNAME,PASSWORD,DATABASE);
if(!$conn){
    die("Нет подключения к базе данных!");
}; 




?>