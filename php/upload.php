<?php

if (
    !isset($_FILES["pdf"]) ||
    !isset($_POST["id"])
) {
    exit("error");
}

$id = preg_replace(
    '/[^a-zA-Z0-9\-]/',
    '',
    $_POST["id"]
);

$filePath =
    "../PDF/" . $id . ".pdf";

/*
    念のため重複チェック
*/
if (file_exists($filePath)) {
    exit("duplicate");
}

/*
    保存
*/
if (
    move_uploaded_file(
        $_FILES["pdf"]["tmp_name"],
        $filePath
    )
) {
    exit("success");
}

exit("error");