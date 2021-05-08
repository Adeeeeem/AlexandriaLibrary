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
 
 	/* Return False for Error */
	$response = array("response" => false);

 	if ( isset($data->signup_login) && !empty($data->signup_login) && isset($data->signup_password) && !empty($data->signup_password) && isset($data->signup_first_name) && !empty($data->signup_first_name) && isset($data->signup_last_name) && !empty($data->signup_last_name) && isset($data->signup_user_card) && !empty($data->signup_user_card) && isset($data->signup_email) && !empty($data->signup_email) )
 	{
 		/* Affect Properties */
		$user->USER_LOGIN = $data->signup_login;
		$user->USER_PASSWORD = $data->signup_password;
		$user->USER_FNAME = $data->signup_first_name;
		$user->USER_LNAME = $data->signup_last_name;
		$user->USER_DIC = $data->signup_user_card;
		$user->USER_EMAIL = $data->signup_email;

		if ($user->loginExists())
			$response["response"] = "Login_Exists";
		else
			if ($user->emailExists())
				$response["response"] = "Email_Exists";
			else
				if ($user->cardExists())
					$response["response"] = "Card_Exists";
				else
					if($user->createUser())
					{
						$response["response"] = true;

						try
						{
							/* get User ID */
							$USER_ID = $user->getId();

							if ($USER_ID)
							{
								/* Affect Properties */
								$history->HISTORY_ACTION = 9; /* CREATE_PROFILE */
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