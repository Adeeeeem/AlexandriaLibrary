<?php
	include_once(__DIR__."/../config/Security.php");

	class Admin
	{
		/* Connection */
		private $CONNECTION;
		/* Table Name */
		private $TABLE_NAME = "Admins";

		/* Object Propertie */
		public $ADMIN_ID;
		public $ADMIN_LOGIN;
		public $ADMIN_PASSWORD;
		public $ADMIN_FNAME;
		public $ADMIN_LNAME;
		public $ADMIN_EMAIL;

		public function __construct($DB)
		{
			$this->CONNECTION = $DB;
		}

		public function getId()
		{
			/* Preparing Request */
			$request = "SELECT ADMIN_ID FROM ".$this->TABLE_NAME." WHERE LOWER(ADMIN_LOGIN) = LOWER(:LOGIN) LIMIT 0, 1;";
			/* Preparing Statement */
			$statement = $this->CONNECTION->prepare($request);
			/* Avoid any XSS or SQL Injection Function */
			$this->ADMIN_LOGIN = Security($this->ADMIN_LOGIN);
			/* Binding Parameter */
			$statement->bindParam(":LOGIN", $this->ADMIN_LOGIN, PDO::PARAM_STR, 25);
			/* Execute Query */
			$statement->execute();

			if ($statement->rowCount() > 0)
			{
				/* Retrieve Details */
				$row = $statement->fetch();
				return $row["ADMIN_ID"];
			}

			return false;
		}

		public function getFirstName()
		{
			/* Preparing Request */
			$request = "SELECT ADMIN_FNAME FROM ".$this->TABLE_NAME." WHERE LOWER(ADMIN_LOGIN) = LOWER(:LOGIN) LIMIT 0, 1;";
			/* Preparing Statement */
			$statement = $this->CONNECTION->prepare($request);
			/* Avoid any XSS or SQL Injection Function */
			$this->ADMIN_LOGIN = Security($this->ADMIN_LOGIN);
			/* Binding Parameter */
			$statement->bindParam(":LOGIN", $this->ADMIN_LOGIN, PDO::PARAM_STR, 25);
			/* Execute Query */
			$statement->execute();

			if ($statement->rowCount() > 0)
			{
				/* Retrieve Details */
				$row = $statement->fetch();
				return $row["ADMIN_FNAME"];
			}

			return false;
		}

		public function getLastName()
		{
			/* Preparing Request */
			$request = "SELECT ADMIN_LNAME FROM ".$this->TABLE_NAME." WHERE LOWER(ADMIN_LOGIN) = LOWER(:LOGIN) LIMIT 0, 1;";
			/* Preparing Statement */
			$statement = $this->CONNECTION->prepare($request);
			/* Avoid any XSS or SQL Injection Function */
			$this->ADMIN_LOGIN = Security($this->ADMIN_LOGIN);
			/* Binding Parameter */
			$statement->bindParam(":LOGIN", $this->ADMIN_LOGIN, PDO::PARAM_STR, 25);
			/* Execute Query */
			$statement->execute();

			if ($statement->rowCount() > 0)
			{
				/* Retrieve Details */
				$row = $statement->fetch();
				return $row["ADMIN_LNAME"];
			}

			return false;
		}

		public function getPassword()
		{
			/* Preparing Request */
			$request = "SELECT ADMIN_PASSWORD FROM ".$this->TABLE_NAME." WHERE LOWER(ADMIN_LOGIN) = LOWER(:LOGIN) LIMIT 0, 1;";
			/* Preparing Statement */
			$statement = $this->CONNECTION->prepare($request);
			/* Avoid any XSS or SQL Injection Function */
			$this->ADMIN_LOGIN = Security($this->ADMIN_LOGIN);
			/* Binding Parameter */
			$statement->bindParam(":LOGIN", $this->ADMIN_LOGIN, PDO::PARAM_STR, 25);
			/* Execute Query */
			$statement->execute();

			if ($statement->rowCount() > 0)
			{
				/* Retrieve Details */
				$row = $statement->fetch();
				return $row["ADMIN_PASSWORD"];
			}

			return false;
		}

		public function loginExists()
		{
			/* Preparing Request */
			$request = "SELECT ADMIN_LOGIN FROM ".$this->TABLE_NAME." WHERE LOWER(ADMIN_LOGIN) = LOWER(:LOGIN) LIMIT 0, 1;";
			/* Preparing Statement */
			$statement = $this->CONNECTION->prepare($request);
			/* Avoid any XSS or SQL Injection Function */
			$this->ADMIN_LOGIN = Security($this->ADMIN_LOGIN);
			/* Binding Parameter */
			$statement->bindParam(":LOGIN", $this->ADMIN_LOGIN, PDO::PARAM_STR, 25);
			/* Execute Query */
			$statement->execute();

			if ($statement->rowCount() > 0)
				return true;

			return false;
		}
	}
?>