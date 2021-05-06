<?php
	/* Add the necessary HTTP headers */
	header("Access-Control-Allow-Origin: http://127.0.0.1/AlexandriaLibrary/");
	header("Content-Type: application/json; charset=UTF-8");
	header("Access-Control-Allow-Methods: POST");
	header("Access-Control-Max-Age: 3600");
	header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

	include_once("config/Database.php");
	include_once("classes/User.php");
 
	/* get BD connection */
	$database = new Database();
	$db = $database->getConnection();
	/* get User Class */
	$user = new User($db);

	/* Retrieve DATA */
	$data = json_decode(file_get_contents("php://input"));
 
 	/* Affect Properties */
	$user->USER_LOGIN = $data->signup_login;
	$user->USER_PASSWORD = $data->signup_password;
	$user->USER_FNAME = $data->signup_first_name;
	$user->USER_LNAME = $data->signup_last_name;
	$user->USER_DIC = $data->signup_user_card;
	$user->USER_EMAIL = $data->signup_email;

	if($user->createUser())
	{
		http_response_code(200);
		/* Encode to Json Format */
		$json = json_encode(true);
	}
	else
	{
		http_response_code(400);
		/* Encode to Json Format */
		$json = json_encode(false);
	}

	
	/* Return as Json Format */
	echo $json;
	/* Close Connection */
	$database->closeConnection();
?>