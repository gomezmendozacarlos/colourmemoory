<?php
$user = $_REQUEST['user'];
$email = $_REQUEST['email'];

mysql_connect("localhost","root", "") or die(mysql_error());	
mysql_select_db("users") or die(mysql_error());

$result = mysql_query("SELECT username, email, id FROM users WHERE username = '$user'");

?>