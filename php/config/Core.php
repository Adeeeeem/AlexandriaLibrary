<?php
	/* Show error reports */
	error_reporting(E_ALL);
 
	/* Configure time zone */
	date_default_timezone_set("Africa/Tunis");
 
	/* JWT variables */
	$key = "alexandria";
	$issued_at = time();
	$expiration_time = $issued_at + (60 * 60);
	$issuer = "http://AlexandriaLibrary.tn.com";
?>