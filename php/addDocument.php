<?php
	/* Add the necessary HTTP headers */
	header("Access-Control-Allow-Origin: http://127.0.0.1/AlexandriaLibrary/");
	header("Content-Type: application/json; charset=UTF-8");
	header("Access-Control-Allow-Methods: POST");
	header("Access-Control-Max-Age: 3600");
	header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

	include_once($_SERVER["DOCUMENT_ROOT"]."/AlexandriaLibrary/php/config/Database.php");
	include_once($_SERVER["DOCUMENT_ROOT"]."/AlexandriaLibrary/php/classes/Document.php");
 
	/* get BD connection */
	$database = new Database();
	$db = $database->getConnection();
	/* get Document Class */
	$document = new Document($db);

	/* Retrieve DATA */
	$data = json_decode(file_get_contents("php://input"));
 
 	/* Return False for Error */
	$response = array("response" => false);

 	if ( isset($data->add_document_title) && !empty($data->add_document_title) && isset($data->add_document_placement) && !empty($data->add_document_placement) && isset($data->add_document_author) && !empty($data->add_document_author) && isset($data->add_document_type) && !empty($data->add_document_type) && isset($data->add_document_subject) && !empty($data->add_document_subject) )
 	{
 		$DOCUMENT_MAX_ID = $document->getLastId() + 1;

 		/* Affect Properties */
 		$document->DOCUMENT_ID = $DOCUMENT_MAX_ID;
		$document->DOCUMENT_TITLE = $data->add_document_title;
		$document->DOCUMENT_PLACEMENT = $data->add_document_placement;
		$document->DOCUMENT_DATA = ( isset($data->add_document_data) && !empty($data->add_document_data) ) ? $data->add_document_data : NULL;
		$document->DOCUMENT_COPIES = ( isset($data->add_document_copies) && !empty($data->add_document_copies) ) ? $data->add_document_copies : 0;
		$document->DOCUMENT_AUTHOR = $data->add_document_author;
		$document->DOCUMENT_TYPE = $data->add_document_type;
		$document->DOCUMENT_SUBJECT = $data->add_document_subject;
		$document->DOCUMENT_DESCRIPTION = ( isset($data->add_document_description) && !empty($data->add_document_description) ) ? $data->add_document_description : NULL;

		$coverDotPosition = strrpos($data->add_document_cover, ".");
		$coverLength = strlen($data->add_document_cover);
		$coverExtension = substr($data->add_document_cover, - ($coverLength - $coverDotPosition));
		$DOCUMENT_COVER = $DOCUMENT_MAX_ID.$coverExtension;
		$document->DOCUMENT_COVER = $DOCUMENT_COVER;

		if ( isset($data->add_document_data) && !empty($data->add_document_data) )
		{		
			$dataDotPosition = strrpos($data->add_document_data, ".");
			$dataLength = strlen($data->add_document_data);
			$dataExtension = substr($data->add_document_data, - ($coverLength - $coverDotPosition));
			$DOCUMENT_DATA = $DOCUMENT_MAX_ID.$dataExtension;
		}

		if (!$document->titleExists())
		{		
			if($document->createDocument())
			{
				/* Copy Cover Image */
				if(copy($database->getUploadPath().$data->add_document_cover, "../img/covers/".$DOCUMENT_COVER))
					$response["response"] = true;

				/* Copy File */
				if ( isset($data->add_document_data) && !empty($data->add_document_data) )
					if(copy($database->getUploadPath().$data->add_document_data, "../img/data/".$DOCUMENT_DATA))
						$response["response"] = true;
					else
						$response["response"] = false;
			}
		}
		else
			$response["response"] = "Title_Exists";
	}
	
	/* Encode to Json Format */
	$json = json_encode($response);
	/* Return as Json Format */
	echo $json;
	/* Close Connection */
	$database->closeConnection();
?>