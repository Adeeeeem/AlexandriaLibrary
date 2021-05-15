<?php
	class Type
	{
		/* Connection */
		private $CONNECTION;
		/* Table Name */
		private $TABLE_NAME = "Types";

		/* Object Propertie */
		public $TYPE_ID;
		public $TYPE_NAME;

		public function __construct($DB)
		{
			$this->CONNECTION = $DB;
		}

		public function getTypes()
		{
			/* Preparing Request */
			$request = "SELECT TYPE_ID AS ID, TYPE_NAME AS NAME FROM ".$this->TABLE_NAME.";";
			/* Preparing Statement */
			$statement = $this->CONNECTION->prepare($request);
			/* Execute Query */
			if ($statement->execute())
				return $statement->fetchAll();
			else
				return [];
		}
	}
?>