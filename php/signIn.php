<?php
	/* Add the necessary HTTP headers */
	header("Access-Control-Allow-Origin: http://127.0.0.1/AlexandriaLibrary/");
	header("Content-Type: application/json; charset=UTF-8");
	header("Access-Control-Allow-Methods: POST");
	header("Access-Control-Max-Age: 3600");
	header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

	include_once($_SERVER["DOCUMENT_ROOT"]."/AlexandriaLibrary/php/config/Database.php");
	include_once($_SERVER["DOCUMENT_ROOT"]."/AlexandriaLibrary/php/classes/User.php");
	include_once($_SERVER["DOCUMENT_ROOT"]."/AlexandriaLibrary/php/classes/History.php");
 
	/* get BD connection */
	$database = new Database();
	$db = $database->getConnection();
	/* get User Class */
	$user = new User($db);
	/* get History Class */
	$history = new History($db);

	/* Retrieve DATA */
	$data = json_decode(file_get_contents("php://input"));
 
	/* Affect Properties */
	$user->USER_LOGIN = $data->signin_login;

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
		if (!$user->loginExists())
			$response["response"] = "Wrong_Username";
		else
			if (!password_verify($data->signin_password, $user->getPassword()))
				$response["response"] = "Wrong_Password";
			else
				if ($user->getStatus() == 'PENDING')
					$response["response"] = "PENDING";
				else
					if ($user->getStatus() == 'BLOCKED')
						$response["response"] = "BLOCKED";
					else
					{
						$token = array(
									"iat" => $issued_at,
									"exp" => $expiration_time,
									"iss" => $issuer,
									"DATA" => array(
												"login" => $user->USER_LOGIN,
												"first_name" => $user->getFirstName(),
												"last_name" => $user->getLastName()));

						$jwt_token = JWT::encode($token, $key);
						$response["response"] = true;
						$response["jwt_token"] = $jwt_token;

						try
						{
							/* get User ID */
							$USER_ID = $user->getId();
							
							if ($USER_ID)
							{
								/* Affect Properties */
								$history->HISTORY_ACTION = 1; /* LOGIN */
								$history->HISTORY_USER = $USER_ID;
								$history->HISTORY_USER_TYPE = "U";
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