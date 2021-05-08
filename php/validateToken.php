<?php
	/* Add the necessary HTTP headers */
	header("Access-Control-Allow-Origin: http://127.0.0.1/AlexandriaLibrary/");
	header("Content-Type: application/json; charset=UTF-8");
	header("Access-Control-Allow-Methods: POST");
	header("Access-Control-Max-Age: 3600");
	header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

	/* Generate Web Json Token */
	include_once($_SERVER["DOCUMENT_ROOT"]."/AlexandriaLibrary/php/config/core.php");
	include_once($_SERVER["DOCUMENT_ROOT"]."/AlexandriaLibrary/php/libs/php-jwt-master/src/BeforeValidException.php");
	include_once($_SERVER["DOCUMENT_ROOT"]."/AlexandriaLibrary/php/libs/php-jwt-master/src/ExpiredException.php");
	include_once($_SERVER["DOCUMENT_ROOT"]."/AlexandriaLibrary/php/libs/php-jwt-master/src/SignatureInvalidException.php");
	include_once($_SERVER["DOCUMENT_ROOT"]."/AlexandriaLibrary/php/libs/php-jwt-master/src/JWT.php");
	use \Firebase\JWT\JWT;

	/* Retrieve DATA */
	$data = json_decode(file_get_contents("php://input"));
	/* Get Token */
	$jwt_token = ( isset($data->jwt_token) && !empty($data->jwt_token) ) ? $data->jwt_token : "";

	/* Return False for Error */
	$response = array("response" => "Access Denied.");

	if ($jwt_token)
	{
		try
		{
			$decoded = JWT::decode($jwt_token, $key, array("HS256"));
			$response["response"] = "Access Granted.";
			$response["data"] = $decoded->DATA;
		}
		catch (Exception $e)
		{
			$response["error"] = $e->getMessage();
		}
	}

	/* Encode to Json Format */
	$json = json_encode($response);
	/* Return as Json Format */
	echo $json;
?>