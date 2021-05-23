<?php
	include_once(__DIR__."/../config/Security.php");

	class Librarian
	{
		/* Connection */
		private $CONNECTION;
		/* Table Name */
		private $TABLE_NAME = "Librarians";

		/* Object Propertie */
		public $LIBRARIAN_ID;
		public $LIBRARIAN_LOGIN;
		public $LIBRARIAN_PASSWORD;
		public $LIBRARIAN_FNAME;
		public $LIBRARIAN_LNAME;
		public $LIBRARIAN_EMAIL;

		public function __construct($DB)
		{
			$this->CONNECTION = $DB;
		}

		public function createLibrarian()
		{
			/* If Details is Set */
			$emailSetColumn = (isset($this->LIBRARIAN_EMAIL) && !empty($this->LIBRARIAN_EMAIL)) ? ", LIBRARIAN_EMAIL" : "";
			$emailSetValue = (isset($this->LIBRARIAN_EMAIL) && !empty($this->LIBRARIAN_EMAIL)) ? ", :EMAIL" : "";

			/* Preparing Request */
			$request = "INSERT INTO ".$this->TABLE_NAME." (LIBRARIAN_LOGIN, LIBRARIAN_PASSWORD, LIBRARIAN_FNAME, LIBRARIAN_LNAME{$emailSetColumn}) VALUES (:LOGIN, :PASSWORD, :FNAME, :LNAME{$emailSetValue});";
			/* Preparing Statement */
			$statement = $this->CONNECTION->prepare($request);
			/* Avoid any XSS or SQL Injection Function */
			$this->LIBRARIAN_LOGIN = Security($this->LIBRARIAN_LOGIN);
			$this->LIBRARIAN_PASSWORD = password_hash(Security($this->LIBRARIAN_PASSWORD), PASSWORD_BCRYPT);
			$this->LIBRARIAN_FNAME = ucwords(Security($this->LIBRARIAN_FNAME));
			$this->LIBRARIAN_LNAME = ucwords(Security($this->LIBRARIAN_LNAME));
			if (isset($this->LIBRARIAN_EMAIL) && !empty($this->LIBRARIAN_EMAIL))
				$this->LIBRARIAN_EMAIL = strtolower(Security($this->LIBRARIAN_EMAIL));
			/* Binding Parameter */
			$statement->bindParam(":LOGIN", $this->LIBRARIAN_LOGIN, PDO::PARAM_STR, 25);
			$statement->bindParam(":PASSWORD", $this->LIBRARIAN_PASSWORD, PDO::PARAM_STR, 255);
			$statement->bindParam(":FNAME", $this->LIBRARIAN_FNAME, PDO::PARAM_STR, 50);
			$statement->bindParam(":LNAME", $this->LIBRARIAN_LNAME, PDO::PARAM_STR, 50);
			if (isset($this->LIBRARIAN_EMAIL) && !empty($this->LIBRARIAN_EMAIL))
				$statement->bindParam(":EMAIL", $this->LIBRARIAN_EMAIL, PDO::PARAM_STR, 100);

			/* Execute Query */
			if ($statement->execute())
				return true;
			
			return false;
		}

		function deleteLibrarian()
		{
			/* Preparing Request */
			$request = "DELETE FROM ".$this->TABLE_NAME." WHERE LIBRARIAN_ID = :ID;";
			/* Preparing Statement */
			$statement = $this->CONNECTION->prepare($request);
			/* Avoid any XSS or SQL Injection Function */
			$this->LIBRARIAN_ID = Security($this->LIBRARIAN_ID);
			/* Binding Parameter */
			$statement->bindParam(":ID", $this->LIBRARIAN_ID, PDO::PARAM_INT);
			/* Execute Query */
			if ($statement->execute())
				return true;
			
			return false;
		}

		public function getId()
		{
			/* Preparing Request */
			$request = "SELECT LIBRARIAN_ID FROM ".$this->TABLE_NAME." WHERE LOWER(LIBRARIAN_LOGIN) = LOWER(:LOGIN) LIMIT 0, 1;";
			/* Preparing Statement */
			$statement = $this->CONNECTION->prepare($request);
			/* Avoid any XSS or SQL Injection Function */
			$this->LIBRARIAN_LOGIN = Security($this->LIBRARIAN_LOGIN);
			/* Binding Parameter */
			$statement->bindParam(":LOGIN", $this->LIBRARIAN_LOGIN, PDO::PARAM_STR, 25);
			/* Execute Query */
			$statement->execute();

			if ($statement->rowCount() > 0)
			{
				/* Retrieve Details */
				$row = $statement->fetch();
				return $row["LIBRARIAN_ID"];
			}

			return false;
		}

		public function getLogin()
		{
			/* Preparing Request */
			$request = "SELECT LIBRARIAN_LOGIN FROM ".$this->TABLE_NAME." WHERE LOWER(LIBRARIAN_ID) = LOWER(:ID) LIMIT 0, 1;";
			/* Preparing Statement */
			$statement = $this->CONNECTION->prepare($request);
			/* Avoid any XSS or SQL Injection Function */
			$this->LIBRARIAN_ID = Security($this->LIBRARIAN_ID);
			/* Binding Parameter */
			$statement->bindParam(":ID", $this->LIBRARIAN_ID, PDO::PARAM_INT);
			/* Execute Query */
			$statement->execute();

			if ($statement->rowCount() > 0)
			{
				/* Retrieve Details */
				$row = $statement->fetch();
				return $row["LIBRARIAN_LOGIN"];
			}

			return false;
		}

		public function getFirstName()
		{
			/* Preparing Request */
			$request = "SELECT LIBRARIAN_FNAME FROM ".$this->TABLE_NAME." WHERE LOWER(LIBRARIAN_LOGIN) = LOWER(:LOGIN) LIMIT 0, 1;";
			/* Preparing Statement */
			$statement = $this->CONNECTION->prepare($request);
			/* Avoid any XSS or SQL Injection Function */
			$this->LIBRARIAN_LOGIN = Security($this->LIBRARIAN_LOGIN);
			/* Binding Parameter */
			$statement->bindParam(":LOGIN", $this->LIBRARIAN_LOGIN, PDO::PARAM_STR, 25);
			/* Execute Query */
			$statement->execute();

			if ($statement->rowCount() > 0)
			{
				/* Retrieve Details */
				$row = $statement->fetch();
				return $row["LIBRARIAN_FNAME"];
			}

			return false;
		}

		public function getLastName()
		{
			/* Preparing Request */
			$request = "SELECT LIBRARIAN_LNAME FROM ".$this->TABLE_NAME." WHERE LOWER(LIBRARIAN_LOGIN) = LOWER(:LOGIN) LIMIT 0, 1;";
			/* Preparing Statement */
			$statement = $this->CONNECTION->prepare($request);
			/* Avoid any XSS or SQL Injection Function */
			$this->LIBRARIAN_LOGIN = Security($this->LIBRARIAN_LOGIN);
			/* Binding Parameter */
			$statement->bindParam(":LOGIN", $this->LIBRARIAN_LOGIN, PDO::PARAM_STR, 25);
			/* Execute Query */
			$statement->execute();

			if ($statement->rowCount() > 0)
			{
				/* Retrieve Details */
				$row = $statement->fetch();
				return $row["LIBRARIAN_LNAME"];
			}

			return false;
		}

		public function getPassword()
		{
			/* Preparing Request */
			$request = "SELECT LIBRARIAN_PASSWORD FROM ".$this->TABLE_NAME." WHERE LOWER(LIBRARIAN_LOGIN) = LOWER(:LOGIN) LIMIT 0, 1;";
			/* Preparing Statement */
			$statement = $this->CONNECTION->prepare($request);
			/* Avoid any XSS or SQL Injection Function */
			$this->LIBRARIAN_LOGIN = Security($this->LIBRARIAN_LOGIN);
			/* Binding Parameter */
			$statement->bindParam(":LOGIN", $this->LIBRARIAN_LOGIN, PDO::PARAM_STR, 25);
			/* Execute Query */
			$statement->execute();

			if ($statement->rowCount() > 0)
			{
				/* Retrieve Details */
				$row = $statement->fetch();
				return $row["LIBRARIAN_PASSWORD"];
			}

			return false;
		}

		public function loginExists()
		{
			/* Preparing Request */
			$request = "SELECT LIBRARIAN_LOGIN FROM ".$this->TABLE_NAME." WHERE LOWER(LIBRARIAN_LOGIN) = LOWER(:LOGIN) LIMIT 0, 1;";
			/* Preparing Statement */
			$statement = $this->CONNECTION->prepare($request);
			/* Avoid any XSS or SQL Injection Function */
			$this->LIBRARIAN_LOGIN = Security($this->LIBRARIAN_LOGIN);
			/* Binding Parameter */
			$statement->bindParam(":LOGIN", $this->LIBRARIAN_LOGIN, PDO::PARAM_STR, 25);
			/* Execute Query */
			$statement->execute();

			if ($statement->rowCount() > 0)
				return true;

			return false;
		}

		public function emailExists()
		{
			/* Preparing Request */
			$request = "SELECT LIBRARIAN_EMAIL FROM ".$this->TABLE_NAME." WHERE LOWER(LIBRARIAN_EMAIL) = LOWER(:EMAIL) LIMIT 0, 1;";
			/* Preparing Statement */
			$statement = $this->CONNECTION->prepare($request);
			/* Avoid any XSS or SQL Injection Function */
			$this->LIBRARIAN_EMAIL = Security($this->LIBRARIAN_EMAIL);
			/* Binding Parameter */
			$statement->bindParam(":EMAIL", $this->LIBRARIAN_EMAIL, PDO::PARAM_STR, 100);
			/* Execute Query */
			$statement->execute();

			if ($statement->rowCount() > 0)
				return true;

			return false;
		}

		public function getLibrarians()
		{
			/* Preparing Request */
			$request = "SELECT LIBRARIAN_ID AS ID, LIBRARIAN_LOGIN AS LOGIN, LIBRARIAN_PASSWORD AS PASSWORD, LIBRARIAN_FNAME AS FNAME, LIBRARIAN_LNAME AS LNAME, LIBRARIAN_EMAIL AS EMAIL FROM ".$this->TABLE_NAME." ORDER BY LIBRARIAN_FNAME, LIBRARIAN_LNAME;";
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