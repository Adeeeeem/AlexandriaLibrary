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

	/* Retrieve DATA */
	$data = json_decode(file_get_contents("php://input"));

	/* Generate Web Json Token */
	include_once($_SERVER["DOCUMENT_ROOT"]."/AlexandriaLibrary/php/config/core.php");
	include_once($_SERVER["DOCUMENT_ROOT"]."/AlexandriaLibrary/php/libs/php-jwt-master/src/BeforeValidException.php");
	include_once($_SERVER["DOCUMENT_ROOT"]."/AlexandriaLibrary/php/libs/php-jwt-master/src/ExpiredException.php");
	include_once($_SERVER["DOCUMENT_ROOT"]."/AlexandriaLibrary/php/libs/php-jwt-master/src/SignatureInvalidException.php");
	include_once($_SERVER["DOCUMENT_ROOT"]."/AlexandriaLibrary/php/libs/php-jwt-master/src/JWT.php");
	use \Firebase\JWT\JWT;

	/* Return False for Error */
	$response = array("response" => false);

	if ( isset($data) && !empty($data) )
	{
		/* Affect Properties */
		$admin->ADMIN_LOGIN = $data->signin_login;

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

				try
				{
					/* get User ID */
					$ADMIN_ID = $admin->getId();
							
					if ($ADMIN_ID)
					{
						/* Affect Properties */
						$history->HISTORY_ACTION = 1; /* LOGIN */
						$history->HISTORY_USER = $ADMIN_ID;
						$history->HISTORY_USER_TYPE = "A";
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