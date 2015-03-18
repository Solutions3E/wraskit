<?php
$file_path = "img/pro_pic/";

    if(isset($_FILES['uploaded_file'])) {
        if($_FILES['uploaded_file']['name'] != ""){
            $file_path = $file_path . basename( $_FILES['uploaded_file']['name']);
            if(move_uploaded_file($_FILES['uploaded_file']['tmp_name'], $file_path)) {
                $filename = $_FILES['uploaded_file']['name'];
            }
        }
    }


    /*if(isset($_FILES['uploaded_file1']))
        {
            if($_FILES['uploaded_file1']['name'] != ""){
                $file_path = $file_path . basename( $_FILES['uploaded_file1']['name']);
                if(move_uploaded_file($_FILES['uploaded_file1']['tmp_name'], $file_path)) {
                    $filename = $_FILES['uploaded_file1']['name'];
                } else{
                //echo "fail";
               }
           }
    }*/

    $user_id = $_POST['current_uesr_id'];

    $dbname      = "wraskit";
    $db_username = "root";
    $db_password = "root";

	//$con = MYSQL_CONNECT ('demo1.host3e.com', $db_username, $db_password) or DIE ("Unable to connect to Database Server");
    $con = MYSQL_CONNECT ('localhost', $db_username, $db_password) or DIE ("Unable to connect to Database Server");
 
    MYSQL_SELECT_DB ($dbname, $con) OR DIE ("Could not select database");

    if($filename){
        mysql_query("update tbl_profiles set profilePic = '".$filename."' where user_id = '".$user_id."'");
    }

    $actual_link = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
    $actual_link = str_replace("upload.php", "#/myprofile", $actual_link);

    header('location: '.$actual_link);
?>