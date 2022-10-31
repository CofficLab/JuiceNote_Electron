<?php

// 数组大小不知道
$arr = [];

for ($i = 1; $i <= 10; $i++) {
    for ($j = 1; $j <= 5; $j++) {
        $arr[$i][$j] = $i * $j;
    }
}

var_export($arr);
