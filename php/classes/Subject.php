<?php
	include_once(__DIR__."/../config/Security.php");

	class Subject
	{
		/* Connection */
		private $CONNECTION;
		/* Table Name */
		private $TABLE_NAME = "Subjects";

		/* Object Propertie */
		public $SUBJECT_ID;
		public $SUBJECT_NAME;
		public $SUBJECT_CATEGORY;

		public function __construct($DB)
		{
			$this->CONNECTION = $DB;
		}

		public function getSubjects()
		{
			/* Preparing Request */
			$request = "SELECT SUBJECT_ID AS ID, SUBJECT_NAME AS NAME FROM ".$this->TABLE_NAME." WHERE SUBJECT_CATEGORY = :CATEGORY ORDER BY SUBJECT_NAME;";
			/* Preparing Statement */
			$statement = $this->CONNECTION->prepare($request);
			/* Avoid any XSS or SQL Injection Function */
			$this->SUBJECT_CATEGORY = Security($this->SUBJECT_CATEGORY);
			/* Binding Parameter */
			$statement->bindParam(":CATEGORY", $this->SUBJECT_CATEGORY, PDO::PARAM_INT);
			/* Execute Query */
			if ($statement->execute())
				return $statement->fetchAll();
			else
				return [];
		}
	}
?>