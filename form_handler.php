<?php
$name = htmlspecialchars($_REQUEST['name'], ENT_QUOTES);
$phone = htmlspecialchars($_REQUEST['phone'], ENT_QUOTES);
$email = htmlspecialchars($_REQUEST['email'], ENT_QUOTES);
$city = htmlspecialchars($_REQUEST['city'], ENT_QUOTES);
$block = htmlspecialchars($_REQUEST['block'], ENT_QUOTES);



if (!$errors) {
    $to = 'kovarnyi48@gmail.com';
    $header = 'MIME-Version: 1.0'."\r\n";
    $header .= 'Content-type: text/html; charset=utf-8'."\r\n";
    $header .= 'From: =?utf-8?b?'.base64_encode("Рай Лендинг: Заявка от [$email]").'?= <no-reply@'.$_SERVER['HTTP_HOST'].'>'."\r\n";
    $header .= 'Subject: Рай лендинг ['.$email.']';

    $subject = 'Рай Лендинг Заявка от ['.$email.']\r\n';


    $msg = '<html>'."\n";
    $msg .= ' <head>'."\n";
    $msg .= ' <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />'."\n";
    $msg .= ' </head>'."\n";
    $msg .= ' <body>'."\n";
    $msg .= ' <h2>Вам письмо</h2>'."\n";
    $msg .= ' <table cellpadding="5" cellspacing="0">'."\n";
    $msg .= ' <tr><td><strong>Имя:</strong></td><td>'.$name.' </td></tr>'."\n";
    $msg .= ' <tr><td><strong>Телефон:</strong></td><td>'.$phone.'</td></tr>'."\n";
    $msg .= ' <tr><td><strong>Почта:</strong></td><td>'.$email.'</td></tr>'."\n";
    $msg .= ' <tr><td><strong>Почта:</strong></td><td>'.$city.'</td></tr>'."\n";
    $msg .= ' <tr><td><strong>блок:</strong></td><td>'.$block.'</td></tr>'."\n";
    $msg .= ' </table>'."\n";
    $msg .= ' </body>'."\n";
    $msg .= '</html>'."\n";

    if (mail($to, $subject, $msg, $header, '-fno-reply@'.$_SERVER['HTTP_HOST'])) {
        $output .= '<p class="text-center gr"><strong>Спасибо, '.$name.'! Ваша заявка принята!</strong><br>В ближайшее время с вами свяжется специалист.</p>';
    } else {
        $output = '<p>Произошла ошибка, пожалуйста повторите попытку позже.</p>';
    }
}

print $output;
