<?php

	$first_num		= trim($_POST['first_num']);
	$second_num		= trim($_POST['second_num']);
	$operation		= trim($_POST['operation']);
	$answer			= trim($_POST['answer']);
	$date 			= date('Y-m-d H:i:s');

	if($first_num != '' || $second_num != '' || $answer != ''){
		file_put_contents('calc_archive.txt', "$date    ---    $first_num $operation $second_num = $answer \n", FILE_APPEND);
	}

