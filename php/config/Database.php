<?php
	class Database
	{
		/* Host IP or Name */
		private $HOST = "127.0.0.1";
		/* Database Name */
		private $DATABASE = "Alexandria"; // Alexandria
		/* User Name */
		private $USER = "root";
		/* User Password */
		private $PASSWORD = "";
		/* Options */
		private $OPTIONS = [PDO::ATTR_EMULATE_PREPARES => false, PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC];
		/* Connection */
		public $CONNECTION;

		public function getConnection()
		{
			/* Data Source Name */
			$DSN = "mysql:host=".$this->HOST."; dbname=".$this->DATABASE."; charset=utf8";
			$this->CONNECTION = NULL;

			try
			{
				$this->CONNECTION = new PDO($DSN, $this->USER, $this->PASSWORD, $this->OPTIONS);
			}
			catch (Exception $exception)
			{
				echo "<center><h1 style='margin-top: 20%; color: red;'><b>Connection Failed : ".$exception->getMessage()."</b></h1></center>";
			}

			return $this->CONNECTION;
		}

		public function closeConnection()
		{
			$this->CONNECTION = NULL;
		}
	}
?>