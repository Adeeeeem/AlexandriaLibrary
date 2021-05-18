<?php
	/* Add the necessary HTTP headers */
	header("Access-Control-Allow-Origin: http://127.0.0.1/AlexandriaLibrary/");
	header("Content-Type: application/json; charset=UTF-8");
	header("Access-Control-Allow-Methods: POST");
	header("Access-Control-Max-Age: 3600");
	header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

	include_once($_SERVER["DOCUMENT_ROOT"]."/AlexandriaLibrary/php/config/Database.php");
	include_once($_SERVER["DOCUMENT_ROOT"]."/AlexandriaLibrary/php/classes/Admin.php");
	include_once($_SERVER["DOCUMENT_ROOT"]."/AlexandriaLibrary/php/classes/History.php");

	/* get BD connection */
	$database = new Database();
	$db = $database->getConnection();
	/* get Admin Class */
	$admin = new Admin($db);
	/* get History Class */
	$history = new History($db);

	/* Generate Web Json Token */
	include_once($_SERVER["DOCUMENT_ROOT"]."/AlexandriaLibrary/php/config/core.php");
	include_once($_SERVER["DOCUMENT_ROOT"]."/AlexandriaLibrary/php/libs/php-jwt-master/src/BeforeValidException.php");
	include_once($_SERVER["DOCUMENT_ROOT"]."/AlexandriaLibrary/php/libs/php-jwt-master/src/ExpiredException.php");
	include_once($_SERVER["DOCUMENT_ROOT"]."/AlexandriaLibrary/php/libs/php-jwt-master/src/SignatureInvalidException.php");
	include_once($_SERVER["DOCUMENT_ROOT"]."/AlexandriaLibrary/php/libs/php-jwt-master/src/JWT.php");
	use \Firebase\JWT\JWT;

	/* Start Session */
	session_start();

	/* Get Token */
	$jwt_token = ( isset($_SESSION["jwt_token"]) && !empty($_SESSION["jwt_token"]) ) ? $_SESSION["jwt_token"] : "";

	/* Return False for Error */
	$response = array("response" => false);

	if ($jwt_token)
	{
		$response["response"] = true;

		$decoded = JWT::decode($jwt_token, $key, array("HS256"));
		/* Affect Properties */
		$admin->ADMIN_LOGIN = $decoded->DATA->login;

		try
		{
			/* get Admin ID */
			$ADMIN_ID = $admin->getId();
									
			if ($ADMIN_ID)
			{
				/* Affect Properties */
				$history->HISTORY_ACTION = 2; /* LOGOUT */
				$history->HISTORY_USER = $ADMIN_ID;
				$history->HISTORY_USER_TYPE = "A";
				/* Add to History */
				$history->createHistory();
			}
		}
		catch (Exception $e) { /* Act Normal, don't do anything, it's true anyway */ }
	}

	/* Remove Session */
	$_SESSION["jwt_token"] = "";
	/* Remove All Session Variables */
	session_unset();
	/* Destroy Session */
	session_destroy();
	/* Encode to Json Format */
	$json = json_encode($response);
	/* Return as Json Format */
	echo $json;
?>