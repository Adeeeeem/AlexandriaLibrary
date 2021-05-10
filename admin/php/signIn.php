<?php
	/* Add the necessary HTTP headers */
	header("Access-Control-Allow-Origin: http://127.0.0.1/AlexandriaLibrary/");
	header("Content-Type: application/json; charset=UTF-8");
	header("Access-Control-Allow-Methods: POST");
	header("Access-Control-Max-Age: 3600");
	header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

	include_once($_SERVER["DOCUMENT_ROOT"]."/AlexandriaLibrary/php/config/Database.php");
	include_once($_SERVER["DOCUMENT_ROOT"]."/AlexandriaLibrary/php/classes/Admin.php");
 
	/* get BD connection */
	$database = new Database();
	$db = $database->getConnection();
	/* get Admin Class */
	$admin = new Admin($db);

	/* Retrieve DATA */
	$data = json_decode(file_get_contents("php://input"));
 
	/* Affect Properties */
	$admin->ADMIN_LOGIN = $data->signin_login;

	/* Generate Web Json Token */
	include_once($_SERVER["DOCUMENT_ROOT"]."/AlexandriaLibrary/php/config/core.php");
	include_once($_SERVER["DOCUMENT_ROOT"]."/AlexandriaLibrary/php/libs/php-jwt-master/src/BeforeValidException.php");
	include_once($_SERVER["DOCUMENT_ROOT"]."/AlexandriaLibrary/php/libs/php-jwt-master/src/ExpiredException.php");
	include_once($_SERVER["DOCUMENT_ROOT"]."/AlexandriaLibrary/php/libs/php-jwt-master/src/SignatureInvalidException.php");
	include_once($_SERVER["DOCUMENT_ROOT"]."/AlexandriaLibrary/php/libs/php-jwt-master/src/JWT.php");
	use \Firebase\JWT\JWT;

	/* Return False for Error */
	$response = array("response" => false);

	if ( isset($data->signin_login) && !empty($data->signin_login) && isset($data->signin_password) && !empty($data->signin_password) )
	{
		/* Checking if Username exists and password is correct */
		if (!$admin->loginExists())
			$response["response"] = "Wrong_Username";
		else
			if (!password_verify($data->signin_password, $admin->getPassword()))
				$response["response"] = "Wrong_Password";
			else
			{
				$token = array(
							"iat" => $issued_at,
							"exp" => $expiration_time,
							"iss" => $issuer,
							"DATA" => array(
										"login" => $admin->ADMIN_LOGIN,
										"first_name" => $admin->getFirstName(),
										"last_name" => $admin->getLastName(),
										"type" => "ADMIN"));

				$jwt_token = JWT::encode($token, $key);
				$response["response"] = true;
				$response["jwt_token"] = $jwt_token;

				/* Start Session */
				session_start();
				/* Set Session */
				$_SESSION["jwt_token"] = $jwt_token;
			}
	}

	/* Encode to Json Format */
	$json = json_encode($response);
	/* Return as Json Format */
	echo $json;
	/* Close Connection */
	$database->closeConnection();
?>