<?php
	class Author
	{
		/* Connection */
		private $CONNECTION;
		/* Table Name */
		private $TABLE_NAME = "Authors";

		/* Object Propertie */
		public $AUTHOR_ID;
		public $AUTHOR_NAME;

		public function __construct($DB)
		{
			$this->CONNECTION = $DB;
		}

		public function getAuthors()
		{
			/* Preparing Request */
			$request = "SELECT AUTHOR_ID AS ID, AUTHOR_NAME AS NAME FROM ".$this->TABLE_NAME." ORDER BY AUTHOR_NAME ASC;";
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