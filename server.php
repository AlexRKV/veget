<?php
$_POST = json_decode(file_get_contents("php://input"), true);  // включать при POST ajhvfn JSON
echo var_dump($_POST);