<?php
	/* Add the necessary HTTP headers */
	header("Access-Control-Allow-Origin: http://127.0.0.1/AlexandriaLibrary/");
	header("Content-Type: application/json; charset=UTF-8");
	header("Access-Control-Allow-Methods: POST");
	header("Access-Control-Max-Age: 3600");
	header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

	include_once($_SERVER["DOCUMENT_ROOT"]."/AlexandriaLibrary/php/config/Database.php");
	include_once($_SERVER["DOCUMENT_ROOT"]."/AlexandriaLibrary/php/classes/Admin.php");
	include_once($_SERVER["DOCUMENT_ROOT"]."/AlexandriaLibrary/php/classes/User.php");
	include_once($_SERVER["DOCUMENT_ROOT"]."/AlexandriaLibrary/php/classes/History.php");
 
	/* get BD connection */
	$database = new Database();
	$db = $database->getConnection();
	/* get Admin Class */
	$admin = new Admin($db);
	/* get User Class */
	$user = new User($db);
	/* get History Class */
	$history = new History($db);

	/* Retrieve DATA */
	$UserID = $_POST["UserID"];
	$UserLogin = $_POST["UserLogin"];
	$oldValue = $_POST["oldValue"];
	$newValue = $_POST["newValue"];

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

 	if ( isset($UserID) && !empty($UserID) )
 	{
 		/* Affect Properties */
 		$user->USER_ID = $UserID;
 		$user->USER_LOGIN = $UserLogin;
 		$user->USER_STATUS = $newValue;
 		$name = $user->getFirstName()." ".$user->getLastName();

		if($user->setStatus())
		{
			$response["response"] = true;

			try
			{
				/* get Admin ID */
				$decoded = JWT::decode($jwt_token, $key, array("HS256"));
				/* Affect Properties */
				$ADMIN_ID = $decoded->DATA->id;
													
				if ($ADMIN_ID)
				{
					/* Affect Properties */
					$history->HISTORY_ACTION = ($newValue == "USER") ? 12 : (($newValue == "PENDING") ? 13 : 14); /* Status */
					$history->HISTORY_USER = $ADMIN_ID;
					$history->HISTORY_USER_TYPE = "A";
					$history->HISTORY_DETAILS = $name.":".$oldValue.":".$newValue;
					/* Add to History */
					$history->createHistory();
				}
			}
			catch (Exception $e) { /* Act Normal, don't do anything, it's true anyway */ }
		}
	}
	
	/* Encode to Json Format */
	$json = json_encode($response);
	/* Return as Json Format */
	echo $json;
	/* Close Connection */
	$database->closeConnection();
?>