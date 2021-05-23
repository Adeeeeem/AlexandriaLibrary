<?php
	/* Add the necessary HTTP headers */
	header("Access-Control-Allow-Origin: http://127.0.0.1/AlexandriaLibrary/");
	header("Content-Type: application/json; charset=UTF-8");
	header("Access-Control-Allow-Methods: POST");
	header("Access-Control-Max-Age: 3600");
	header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

	include_once($_SERVER["DOCUMENT_ROOT"]."/AlexandriaLibrary/php/config/Database.php");
	include_once($_SERVER["DOCUMENT_ROOT"]."/AlexandriaLibrary/php/classes/Admin.php");
	include_once($_SERVER["DOCUMENT_ROOT"]."/AlexandriaLibrary/php/classes/Document.php");
	include_once($_SERVER["DOCUMENT_ROOT"]."/AlexandriaLibrary/php/classes/History.php");
 
	/* get BD connection */
	$database = new Database();
	$db = $database->getConnection();
	/* get Admin Class */
	$admin = new Admin($db);
	/* get Document Class */
	$document = new Document($db);
	/* get History Class */
	$history = new History($db);

	/* Retrieve DATA */
	$DocumentID = $_POST["DocumentID"];

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

 	if ( isset($DocumentID) && !empty($DocumentID) )
 	{
 		/* Affect Properties */
 		$document->DOCUMENT_ID = $DocumentID;
 		$documentTitle = $document->getTitle();

		if($document->deleteDocument())
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
					$history->HISTORY_ACTION = 8; /* Delete Document */
					$history->HISTORY_USER = $ADMIN_ID;
					$history->HISTORY_USER_TYPE = "A";
					$history->HISTORY_DETAILS = $documentTitle;
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