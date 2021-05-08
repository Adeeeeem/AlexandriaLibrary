<?php
	include_once(__DIR__."/../config/Security.php");

	class User
	{
		/* Connection */
		private $CONNECTION;
		/* Table Name */
		private $TABLE_NAME = "Users";

		/* Object Propertie */
		public $USER_LOGIN;
		public $USER_PASSWORD;
		public $USER_FNAME;
		public $USER_LNAME;
		public $USER_DIC;
		public $USER_EMAIL;

		public function __construct($DB)
		{
			$this->CONNECTION = $DB;
		}

		public function createUser()
		{
			/* Preparing Request */
			$request = "INSERT INTO ".$this->TABLE_NAME." (USER_STATUS, USER_LOGIN, USER_PASSWORD, USER_FNAME, USER_LNAME, USER_DIC, USER_EMAIL) VALUES ('PENDING', :LOGIN, :PASSWORD, :FNAME, :LNAME, :DIC, :EMAIL);";
			/* Preparing Statement */
			$statement = $this->CONNECTION->prepare($request);
			/* Avoid any XSS or SQL Injection Function */
			$this->USER_LOGIN = Security($this->USER_LOGIN);
			$this->USER_PASSWORD = password_hash(Security($this->USER_PASSWORD), PASSWORD_BCRYPT);
			$this->USER_FNAME = ucwords(Security($this->USER_FNAME));
			$this->USER_LNAME = ucwords(Security($this->USER_LNAME));
			$this->USER_DIC = Security($this->USER_DIC);
			$this->USER_EMAIL = strtolower(Security($this->USER_EMAIL));
			/* Binding Parameter */
			$statement->bindParam(":LOGIN", $this->USER_LOGIN, PDO::PARAM_STR, 25);
			$statement->bindParam(":PASSWORD", $this->USER_PASSWORD, PDO::PARAM_STR, 255);
			$statement->bindParam(":FNAME", $this->USER_FNAME, PDO::PARAM_STR, 50);
			$statement->bindParam(":LNAME", $this->USER_LNAME, PDO::PARAM_STR, 50);
			$statement->bindParam(":DIC", $this->USER_DIC, PDO::PARAM_STR, 20);
			$statement->bindParam(":EMAIL", $this->USER_EMAIL, PDO::PARAM_STR, 100);
			/* Execute Query */
			if ($statement->execute())
				return true;
			
			return false;
		}

		public function getId()
		{
			/* Preparing Request */
			$request = "SELECT USER_ID FROM ".$this->TABLE_NAME." WHERE LOWER(USER_LOGIN) = LOWER(:LOGIN) LIMIT 0, 1;";
			/* Preparing Statement */
			$statement = $this->CONNECTION->prepare($request);
			/* Avoid any XSS or SQL Injection Function */
			$this->USER_LOGIN = Security($this->USER_LOGIN);
			/* Binding Parameter */
			$statement->bindParam(":LOGIN", $this->USER_LOGIN, PDO::PARAM_STR, 25);
			/* Execute Query */
			$statement->execute();

			if ($statement->rowCount() > 0)
			{
				/* Retrieve Details */
				$row = $statement->fetch();
				return $row["USER_ID"];
			}

			return false;
		}

		public function getStatus()
		{
			/* Preparing Request */
			$request = "SELECT USER_STATUS FROM ".$this->TABLE_NAME." WHERE LOWER(USER_LOGIN) = LOWER(:LOGIN) LIMIT 0, 1;";
			/* Preparing Statement */
			$statement = $this->CONNECTION->prepare($request);
			/* Avoid any XSS or SQL Injection Function */
			$this->USER_LOGIN = Security($this->USER_LOGIN);
			/* Binding Parameter */
			$statement->bindParam(":LOGIN", $this->USER_LOGIN, PDO::PARAM_STR, 25);
			/* Execute Query */
			$statement->execute();

			if ($statement->rowCount() > 0)
			{
				/* Retrieve Details */
				$row = $statement->fetch();
				return $row["USER_STATUS"];
			}

			return false;
		}

		public function getFirstName()
		{
			/* Preparing Request */
			$request = "SELECT USER_FNAME FROM ".$this->TABLE_NAME." WHERE LOWER(USER_LOGIN) = LOWER(:LOGIN) LIMIT 0, 1;";
			/* Preparing Statement */
			$statement = $this->CONNECTION->prepare($request);
			/* Avoid any XSS or SQL Injection Function */
			$this->USER_LOGIN = Security($this->USER_LOGIN);
			/* Binding Parameter */
			$statement->bindParam(":LOGIN", $this->USER_LOGIN, PDO::PARAM_STR, 25);
			/* Execute Query */
			$statement->execute();

			if ($statement->rowCount() > 0)
			{
				/* Retrieve Details */
				$row = $statement->fetch();
				return $row["USER_FNAME"];
			}

			return false;
		}

		public function getLastName()
		{
			/* Preparing Request */
			$request = "SELECT USER_LNAME FROM ".$this->TABLE_NAME." WHERE LOWER(USER_LOGIN) = LOWER(:LOGIN) LIMIT 0, 1;";
			/* Preparing Statement */
			$statement = $this->CONNECTION->prepare($request);
			/* Avoid any XSS or SQL Injection Function */
			$this->USER_LOGIN = Security($this->USER_LOGIN);
			/* Binding Parameter */
			$statement->bindParam(":LOGIN", $this->USER_LOGIN, PDO::PARAM_STR, 25);
			/* Execute Query */
			$statement->execute();

			if ($statement->rowCount() > 0)
			{
				/* Retrieve Details */
				$row = $statement->fetch();
				return $row["USER_LNAME"];
			}

			return false;
		}

		public function getPassword()
		{
			/* Preparing Request */
			$request = "SELECT USER_PASSWORD FROM ".$this->TABLE_NAME." WHERE LOWER(USER_LOGIN) = LOWER(:LOGIN) LIMIT 0, 1;";
			/* Preparing Statement */
			$statement = $this->CONNECTION->prepare($request);
			/* Avoid any XSS or SQL Injection Function */
			$this->USER_LOGIN = Security($this->USER_LOGIN);
			/* Binding Parameter */
			$statement->bindParam(":LOGIN", $this->USER_LOGIN, PDO::PARAM_STR, 25);
			/* Execute Query */
			$statement->execute();

			if ($statement->rowCount() > 0)
			{
				/* Retrieve Details */
				$row = $statement->fetch();
				return $row["USER_PASSWORD"];
			}

			return false;
		}

		public function loginExists()
		{
			/* Preparing Request */
			$request = "SELECT USER_LOGIN FROM ".$this->TABLE_NAME." WHERE LOWER(USER_LOGIN) = LOWER(:LOGIN) LIMIT 0, 1;";
			/* Preparing Statement */
			$statement = $this->CONNECTION->prepare($request);
			/* Avoid any XSS or SQL Injection Function */
			$this->USER_LOGIN = Security($this->USER_LOGIN);
			/* Binding Parameter */
			$statement->bindParam(":LOGIN", $this->USER_LOGIN, PDO::PARAM_STR, 25);
			/* Execute Query */
			$statement->execute();

			if ($statement->rowCount() > 0)
				return true;

			return false;
		}

		public function cardExists()
		{
			/* Preparing Request */
			$request = "SELECT USER_DIC FROM ".$this->TABLE_NAME." WHERE LOWER(USER_DIC) = LOWER(:CARD) LIMIT 0, 1;";
			/* Preparing Statement */
			$statement = $this->CONNECTION->prepare($request);
			/* Avoid any XSS or SQL Injection Function */
			$this->USER_DIC = Security($this->USER_DIC);
			/* Binding Parameter */
			$statement->bindParam(":CARD", $this->USER_DIC, PDO::PARAM_STR, 20);
			/* Execute Query */
			$statement->execute();

			if ($statement->rowCount() > 0)
				return true;

			return false;
		}

		public function emailExists()
		{
			/* Preparing Request */
			$request = "SELECT USER_EMAIL FROM ".$this->TABLE_NAME." WHERE USER_EMAIL = LOWER(:EMAIL) LIMIT 0, 1;";
			/* Preparing Statement */
			$statement = $this->CONNECTION->prepare($request);
			/* Avoid any XSS or SQL Injection Function */
			$this->USER_EMAIL = Security($this->USER_EMAIL);
			/* Binding Parameter */
			$statement->bindParam(":EMAIL", $this->USER_EMAIL, PDO::PARAM_STR, 100);
			/* Execute Query */
			$statement->execute();

			if ($statement->rowCount() > 0)
				return true;

			return false;
		}
	}
?>