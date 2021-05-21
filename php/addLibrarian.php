<?php
	/* Add the necessary HTTP headers */
	header("Access-Control-Allow-Origin: http://127.0.0.1/AlexandriaLibrary/");
	header("Content-Type: application/json; charset=UTF-8");
	header("Access-Control-Allow-Methods: POST");
	header("Access-Control-Max-Age: 3600");
	header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

	include_once($_SERVER["DOCUMENT_ROOT"]."/AlexandriaLibrary/php/config/Database.php");
	include_once($_SERVER["DOCUMENT_ROOT"]."/AlexandriaLibrary/php/classes/Admin.php");
	include_once($_SERVER["DOCUMENT_ROOT"]."/AlexandriaLibrary/php/classes/Librarian.php");
	include_once($_SERVER["DOCUMENT_ROOT"]."/AlexandriaLibrary/php/classes/History.php");
 
	/* get BD connection */
	$database = new Database();
	$db = $database->getConnection();
	/* get Admin Class */
	$admin = new Librarian($db);
	/* get Librarian Class */
	$librarian = new Librarian($db);
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

	/* Start Session */
	session_start();

	/* Get Token */
	$jwt_token = ( isset($_SESSION["jwt_token"]) && !empty($_SESSION["jwt_token"]) ) ? $_SESSION["jwt_token"] : "";

 	/* Return False for Error */
	$response = array("response" => false);

 	if ( isset($data) && !empty($data) )
 	{
 		/* Affect Properties */
		$librarian->LIBRARIAN_LOGIN = $data->add_librarian_login;
		$librarian->LIBRARIAN_PASSWORD = $data->add_librarian_password;
		$librarian->LIBRARIAN_FNAME = $data->add_librarian_fname;
		$librarian->LIBRARIAN_LNAME = $data->add_librarian_lname;
		$librarian->LIBRARIAN_EMAIL = ( isset($data->add_librarian_email) && !empty($data->add_librarian_email) ) ? $data->add_librarian_email : "";

		if ($librarian->loginExists())
			$response["response"] = "Login_Exists";
		else
			if (isset($data->add_librarian_email) && !empty($data->add_librarian_email) && $librarian->emailExists())
				$response["response"] = "Email_Exists";
			else
				if($librarian->createLibrarian())
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
							$history->HISTORY_ACTION = 3; /* Add Librarian */
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