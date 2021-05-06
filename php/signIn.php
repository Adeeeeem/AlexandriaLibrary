<?php
	/* This will redirect to Home Page in case trying to direct access this page */
	if( !isset($_SERVER["HTTP_REFERER"]) && empty($_SERVER["HTTP_REFERER"]) )
	{
		header("Location: ../");
		exit();
	}

	/* Add the necessary HTTP headers */
	header("Access-Control-Allow-Origin: http://127.0.0.1/AlexandriaLibrary/");
	header("Content-Type: application/json; charset=UTF-8");
	header("Access-Control-Allow-Methods: POST");
	header("Access-Control-Max-Age: 3600");
	header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


	/* The required files to connect to the DB */
	include_once "Database.php";
 
	/* get BD connection */
	$database = new Database();
	$db = $database->getConnection();

	/* Retrieve DATA */
	$data = json_decode(file_get_contents("php://input"));
 
	
?>