<?php
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