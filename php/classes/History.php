<?php
	include_once(__DIR__."/../config/Security.php");

	class History
	{
		/* Connection */
		private $CONNECTION;
		/* Table Name */
		private $TABLE_NAME = "History";

		/* Object Propertie */
		public $HISTORY_ACTION;
		public $HISTORY_USER;
		public $HISTORY_USER_TYPE;
		public $HISTORY_DATE;
		public $HISTORY_DETAILS;

		public function __construct($DB)
		{
			$this->CONNECTION = $DB;
		}

		public function createHistory()
		{
			/* id Details is Set */
			$detailsSetColumn = (isset($this->HISTORY_DETAILS) && !empty($this->HISTORY_DETAILS)) ? ", HISTORY_DETAILS" : "";
			$detailsSetValue = (isset($this->HISTORY_DETAILS) && !empty($this->HISTORY_DETAILS)) ? ", :DETAILS" : "";

			/* Preparing Request */
			$request = "INSERT INTO ".$this->TABLE_NAME." (HISTORY_ACTION, HISTORY_USER, HISTORY_USER_TYPE, HISTORY_DATE{$detailsSetColumn}) VALUES (:ACTION, :USER, :USER_TYPE, NOW(){$detailsSetValue});";
			/* Preparing Statement */
			$statement = $this->CONNECTION->prepare($request);
			/* Avoid any XSS or SQL Injection Function */
			$this->HISTORY_USER = Security($this->HISTORY_USER);
			/* Binding Parameter */
			$statement->bindParam(":ACTION", $this->HISTORY_ACTION, PDO::PARAM_INT);
			$statement->bindParam(":USER", $this->HISTORY_USER, PDO::PARAM_INT);
			$statement->bindParam(":USER_TYPE", $this->HISTORY_USER_TYPE, PDO::PARAM_STR, 1);
			if (isset($this->HISTORY_DETAILS) && !empty($this->HISTORY_DETAILS))
				$statement->bindParam(":DETAILS", $this->HISTORY_DETAILS, PDO::PARAM_STR, 255);
			/* Execute Query */
			if ($statement->execute())
				return true;
			return false;
		}
	}
?>