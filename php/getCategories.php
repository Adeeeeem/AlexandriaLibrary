<?php
	include_once(__DIR__."/config/Database.php");
	include_once(__DIR__."/classes/Category.php");

	header("Content-Type: application/json");

	/* get BD connection */
	$database = new Database();
	$db = $database->getConnection();
	/* get Category Class */
	$category = new Category($db);
	/* Encode to Json Format */
	$json = json_encode($category->getCategories());
	/* Return as Json Format */
	echo $json;
	/* Close Connection */
	$database->closeConnection();
?>