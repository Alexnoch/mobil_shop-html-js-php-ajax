<?php 

    $name = $_POST['mailnames'];
    $mail = $_POST['mails'];
    $goods = $_POST['jsongoods'];
$result = '';
    foreach($goods as $id=>$count){
        $result .='_';
        $result .= "$id";
        $result .='_';

    };
    
    echo '<div><h4>Для оформления заказа, заглядите в почту!</h4>';
    echo '<p>Заказанные модели:'.$result.'</p>';
    echo '<p>Ваше имя : '.$name.'</p>';
    echo '<p> Почта на которое вам придёт письмо '.$mail.'<p>';
    echo '</div>';
    

?>