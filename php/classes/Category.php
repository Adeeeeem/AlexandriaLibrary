<?php
	include_once(__DIR__."/../config/Security.php");

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
			$request = "SELECT CATEGORY_ID AS ID, CATEGORY_NAME AS NAME, COUNT(DOCUMENT_ID) AS DOCUMENTS FROM ".$this->TABLE_NAME." LEFT JOIN Subjects ON Categories.CATEGORY_ID = Subjects.SUBJECT_CATEGORY LEFT JOIN Documents ON Subjects.SUBJECT_ID = Documents.DOCUMENT_SUBJECT GROUP BY CATEGORY_ID;";
			/* Preparing Statement */
			$statement = $this->CONNECTION->prepare($request);
			/* Execute Query */
			if ($statement->execute())
				return $statement->fetchAll();
			else
				return [];
		}

		public function getDocumentsByCategory()
		{
			/* Preparing Request */
			$request = "SELECT DOCUMENT_ID AS ID, DOCUMENT_TITLE AS TITLE, DOCUMENT_COVER AS COVER, DOCUMENT_PLACEMENT AS PLACEMENT, DOCUMENT_DATA AS DATA, DOCUMENT_COPIES AS COPIES, AUTHOR_NAME AS AUTHOR, TYPE_NAME AS TYPE, SUBJECT_NAME AS SUBJECT, DOCUMENT_DESCRIPTION AS DESCRIPTION FROM ".$this->TABLE_NAME." INNER JOIN Subjects ON Categories.CATEGORY_ID = Subjects.SUBJECT_CATEGORY INNER JOIN Documents ON Subjects.SUBJECT_ID = Documents.DOCUMENT_SUBJECT INNER JOIN Authors ON Documents.DOCUMENT_AUTHOR = Authors.AUTHOR_ID INNER JOIN Types ON Documents.DOCUMENT_TYPE = Types.TYPE_ID WHERE Categories.CATEGORY_ID = :ID;";
			/* Preparing Statement */
			$statement = $this->CONNECTION->prepare($request);
			/* Avoid any XSS or SQL Injection Function */
			$this->CATEGORY_ID = Security($this->CATEGORY_ID);
			/* Binding Parameter */
			$statement->bindParam(":ID", $this->CATEGORY_ID, PDO::PARAM_INT);
			/* Execute Query */
			if ($statement->execute())
				return $statement->fetchAll();
			else
				return [];
		}
	}
?>