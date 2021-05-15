<?php
	include_once(__DIR__."/../config/Security.php");

	class Document
	{
		/* Connection */
		private $CONNECTION;
		/* Table Name */
		private $TABLE_NAME = "Documents";

		/* Object Propertie */
		public $DOCUMENT_ID;
		public $DOCUMENT_TITLE;
		public $DOCUMENT_COVER;
		public $DOCUMENT_PLACEMENT;
		public $DOCUMENT_DATA;
		public $DOCUMENT_COPIES;
		public $DOCUMENT_AUTHOR;
		public $DOCUMENT_TYPE;
		public $DOCUMENT_SUBJECT;
		public $DOCUMENT_DESCRIPTION;

		public function __construct($DB)
		{
			$this->CONNECTION = $DB;
		}

		public function createDocument()
		{
			/* If Details is Set */
			$dataSetColumn = (isset($this->DOCUMENT_DATA) && !empty($this->DOCUMENT_DATA)) ? ", DOCUMENT_DATA" : "";
			$dataSetValue = (isset($this->DOCUMENT_DATA) && !empty($this->DOCUMENT_DATA)) ? ", :DATA" : "";
			/* If Description is Set */
			$descriptionSetColumn = (isset($this->DOCUMENT_DESCRIPTION) && !empty($this->DOCUMENT_DESCRIPTION)) ? ", DOCUMENT_DESCRIPTION" : "";
			$descriptionSetValue = (isset($this->DOCUMENT_DESCRIPTION) && !empty($this->DOCUMENT_DESCRIPTION)) ? ", :DESCRIPTION" : "";

			/* Preparing Request */
			$request = "INSERT INTO ".$this->TABLE_NAME." (DOCUMENT_ID, DOCUMENT_TITLE, DOCUMENT_COVER, DOCUMENT_PLACEMENT{$dataSetColumn}, DOCUMENT_COPIES, DOCUMENT_AUTHOR, DOCUMENT_TYPE, DOCUMENT_SUBJECT{$descriptionSetColumn}) VALUES (:ID, :TITLE, :COVER, :PLACEMENT{$dataSetValue}, :COPIES, :AUTHOR, :TYPE, :SUBJECT{$descriptionSetValue});";
			/* Preparing Statement */
			$statement = $this->CONNECTION->prepare($request);
			/* Avoid any XSS or SQL Injection Function */
			$this->DOCUMENT_ID = Security($this->DOCUMENT_ID);
			$this->DOCUMENT_TITLE = ucwords(Security($this->DOCUMENT_TITLE));
			$this->DOCUMENT_COVER = Security($this->DOCUMENT_COVER);
			$this->DOCUMENT_PLACEMENT = Security($this->DOCUMENT_PLACEMENT);
			if (isset($this->DOCUMENT_DATA) && !empty($this->DOCUMENT_DATA))
				$this->DOCUMENT_DATA = Security($this->DOCUMENT_DATA);
			$this->DOCUMENT_COPIES = Security($this->DOCUMENT_COPIES);
			$this->DOCUMENT_AUTHOR = Security($this->DOCUMENT_AUTHOR);
			$this->DOCUMENT_TYPE = Security($this->DOCUMENT_TYPE);
			$this->DOCUMENT_SUBJECT = Security($this->DOCUMENT_SUBJECT);
			if (isset($this->DOCUMENT_DESCRIPTION) && !empty($this->DOCUMENT_DESCRIPTION))
				$this->DOCUMENT_DESCRIPTION = Security($this->DOCUMENT_DESCRIPTION);
			/* Binding Parameter */
			$statement->bindParam(":ID", $this->DOCUMENT_ID, PDO::PARAM_INT);
			$statement->bindParam(":TITLE", $this->DOCUMENT_TITLE, PDO::PARAM_STR, 255);
			$statement->bindParam(":COVER", $this->DOCUMENT_COVER, PDO::PARAM_INT);
			$statement->bindParam(":PLACEMENT", $this->DOCUMENT_PLACEMENT, PDO::PARAM_STR, 1);
			if (isset($this->DOCUMENT_DATA) && !empty($this->DOCUMENT_DATA))
				$statement->bindParam(":DATA", $this->DOCUMENT_DATA, PDO::PARAM_STR, 255);
			$statement->bindParam(":COPIES", $this->DOCUMENT_COPIES, PDO::PARAM_INT);
			$statement->bindParam(":AUTHOR", $this->DOCUMENT_AUTHOR, PDO::PARAM_INT);
			$statement->bindParam(":TYPE", $this->DOCUMENT_TYPE, PDO::PARAM_INT);
			$statement->bindParam(":SUBJECT", $this->DOCUMENT_SUBJECT, PDO::PARAM_INT);
			if (isset($this->DOCUMENT_DESCRIPTION) && !empty($this->DOCUMENT_DESCRIPTION))
				$statement->bindParam(":DESCRIPTION", $this->DOCUMENT_DESCRIPTION, PDO::PARAM_STR);
			/* Execute Query */
			if ($statement->execute())
				return true;
			
			return false;
		}

		public function getLastId()
		{
			/* Preparing Request */
			$request = "SELECT MAX(DOCUMENT_ID) AS MAX_ID FROM ".$this->TABLE_NAME.";";
			/* Preparing Statement */
			$statement = $this->CONNECTION->prepare($request);
			/* Execute Query */
			$statement->execute();

			if ($statement->rowCount() > 0)
			{
				/* Retrieve Details */
				$row = $statement->fetch();
				return $row["MAX_ID"];
			}

			return 0;
		}

		public function titleExists()
		{
			/* Preparing Request */
			$request = "SELECT DOCUMENT_TITLE FROM ".$this->TABLE_NAME." WHERE LOWER(DOCUMENT_TITLE) = LOWER(:TITLE) LIMIT 0, 1;";
			/* Preparing Statement */
			$statement = $this->CONNECTION->prepare($request);
			/* Avoid any XSS or SQL Injection Function */
			$this->DOCUMENT_TITLE = Security($this->DOCUMENT_TITLE);
			/* Binding Parameter */
			$statement->bindParam(":TITLE", $this->DOCUMENT_TITLE, PDO::PARAM_STR, 255);
			/* Execute Query */
			$statement->execute();

			if ($statement->rowCount() > 0)
				return true;

			return false;
		}
	}
?>