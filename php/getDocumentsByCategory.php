<?php
	/* Add the necessary HTTP headers */
	header("Access-Control-Allow-Origin: http://127.0.0.1/AlexandriaLibrary/");
	header("Content-Type: application/json; charset=UTF-8");
	header("Access-Control-Allow-Methods: POST");
	header("Access-Control-Max-Age: 3600");
	header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

	include_once($_SERVER["DOCUMENT_ROOT"]."/AlexandriaLibrary/php/config/Database.php");
	include_once($_SERVER["DOCUMENT_ROOT"]."/AlexandriaLibrary/php/classes/Category.php");
 
	/* get BD connection */
	$database = new Database();
	$db = $database->getConnection();
	/* get Category Class */
	$category = new Category($db);

	/* Return False for Error */
	$response = array("response" => false);

	if ( isset($_POST["category_id"]) && !empty($_POST["category_id"]) )
	{
		/* Retrieve DATA */
		$category_id = $_POST["category_id"];
		/* Affect Properties */
		$category->CATEGORY_ID = $category_id;
		/* Encode to Json Format */
		$response = $category->getDocumentsByCategory();
	}

	/* Encode to Json Format */
	$json = json_encode($response);
	/* Return as Json Format */
	echo $json;
	/* Close Connection */
	$database->closeConnection();
?>