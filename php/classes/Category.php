<?php
	class Category
	{
		/* Connection */
		private $CONNECTION;
		/* Table Name */
		private $TABLE_NAME = "Categories";

		/* Object Propertie */
		public $CATEGORY_ID;
		public $CATEGORY_NAME;

		public function __construct($DB)
		{
			$this->CONNECTION = $DB;
		}

		public function getCategories()
		{
			/* Preparing Request */
			$request = "SELECT CATEGORY_ID AS ID, CATEGORY_NAME AS NAME, COUNT(DOCUMENT_ID) AS DOCUMENTS FROM ".$this->TABLE_NAME." LEFT JOIN Documents ON Categories.CATEGORY_ID = Documents.DOCUMENT_SUBJECT GROUP BY CATEGORY_ID;";
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