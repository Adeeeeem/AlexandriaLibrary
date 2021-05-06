<?php
	/* Show error reports */
	error_reporting(E_ALL);
 
	/* Configure time zone */
	date_default_timezone_set("Africa/Tunis");
 
	/* JWT variables */
	$key = "alexandria";
	$iss = "http://AlexandriaLibrary.tn.com";

	/* Avoid any XSS or SQL Injection Function */
	function Security($value)
	{
		$value = trim($value);
		$value = stripslashes($value);
		$value = htmlspecialchars($value, ENT_HTML401 | ENT_QUOTES | ENT_HTML5, "UTF-8");
		$value = strip_tags($value);

		return $value;
	}
?>