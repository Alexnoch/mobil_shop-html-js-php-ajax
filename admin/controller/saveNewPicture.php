<?php


if ( 0 < $_FILES['file']['error'] ) {
    echo 'Error: ' . $_FILES['file']['error'] . '<br>';
}
else {
    move_uploaded_file($_FILES['file']['tmp_name'], '../../img/jpeg/' . $_FILES['file']['name']);
}



?>