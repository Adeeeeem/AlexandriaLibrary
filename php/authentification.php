<?php
	/* This will redirect to Home Page in case trying to direct access this page */
	if( !isset($_SERVER["HTTP_REFERER"]) && empty($_SERVER["HTTP_REFERER"]) )
	{
		header("Location: ../");
		exit();
	}

	/* Add the necessary HTTP headers */
	header("Access-Control-Allow-Origin: http://127.0.0.1/AlexandriaLibrary/");
	header("Content-Type: application/json; charset=UTF-8");
	header("Access-Control-Allow-Methods: POST");
	header("Access-Control-Max-Age: 3600");
	header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


	/* The required files to connect to the DB */
	include_once "Database.php";
 
	/* get BD connection */
	$database = new Database();
	$db = $database->getConnection();

	/* Retrieve DATA */
	$data = json_decode(file_get_contents("php://input"));
 
	/* Affect properties */
	//$user->email = $data->email;
	//$email_exists = $user->emailExists();

	/* Generate a JSON web token */
	include_once "Core.php";
	include_once "libs/php-jwt-master/src/BeforeValidException.php";
	include_once "libs/php-jwt-master/src/ExpiredException.php";
	include_once "libs/php-jwt-master/src/SignatureInvalidException.php";
	include_once "libs/php-jwt-master/src/JWT.php";
	use \Firebase\JWT\JWT;
 
// verification si email existe et le mot de passe est correcte
if($email_exists && password_verify($data->password, $user->password)){
 
		$token = array(
			 "iss" => $iss,			 
			 "data" => array(
					 "id" => $user->id,
					 "firstname" => $user->firstname,
					 "lastname" => $user->lastname,
					 "email" => $user->email
			 )
		);
 
		// configuration de la reponse http
		http_response_code(200);
 
		// generation du jwt
		$jwt = JWT::encode($token, $key);
		echo json_encode(
						array(
								"message" => "Successful login.",
								"jwt" => $jwt
						)
				);
 
}

// autentification erronee
else{
 
		// configuration de la reponse http
		http_response_code(401);
 
		// informer l'utilisateur que l'authentification est erronee
		echo json_encode(array("message" => "Login failed."));
}
?>