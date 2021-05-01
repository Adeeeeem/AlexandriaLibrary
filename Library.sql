-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Server version: 10.4.8-MariaDB
-- PHP Version: 7.3.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `Library`
--
CREATE DATABASE IF NOT EXISTS `Library` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `Library`;

-- --------------------------------------------------------

--
-- Table structure for table `Actions`
--

DROP TABLE IF EXISTS `Actions`;
CREATE TABLE IF NOT EXISTS `Actions` (
  `ACTION_ID` INT(2) NOT NULL AUTO_INCREMENT,
  `ACTION_NAME` VARCHAR(25) NOT NULL,
  PRIMARY KEY (`ACTION_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `Admins`
--

DROP TABLE IF EXISTS `Admins`;
CREATE TABLE IF NOT EXISTS `Admins` (
  `ADMIN_ID` INT(1) NOT NULL AUTO_INCREMENT,
  `ADMIN_LOGIN` VARCHAR(25) NOT NULL,
  `ADMIN_PASSWORD` VARCHAR(30) NOT NULL,
  `ADMIN_FNAME` VARCHAR(50) DEFAULT NULL,
  `ADMIN_LNAME` VARCHAR(50) DEFAULT NULL,
  `ADMIN_EMAIL` VARCHAR(100) DEFAULT NULL,
  PRIMARY KEY (`ADMIN_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `Authors`
--

DROP TABLE IF EXISTS `Authors`;
CREATE TABLE IF NOT EXISTS `Authors` (
  `AUTHOR_ID` INT(6) NOT NULL AUTO_INCREMENT,
  `AUTHOR_NAME` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`AUTHOR_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `Bookings`
--

DROP TABLE IF EXISTS `Bookings`;
CREATE TABLE IF NOT EXISTS `Bookings` (
  `BOOKING_ID` INT(10) NOT NULL AUTO_INCREMENT,
  `BOOKING_USER` INT(6) NOT NULL,
  `BOOKING_SEAT` INT(2) NOT NULL,
  `BOOKING_START_DATE` DATETIME NOT NULL,
  `BOOKING_END_DATE` DATETIME NOT NULL,
  PRIMARY KEY (`BOOKING_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `Categories`
--

DROP TABLE IF EXISTS `Categories`;
CREATE TABLE IF NOT EXISTS `Categories` (
  `CATEGORY_ID` INT(6) NOT NULL AUTO_INCREMENT,
  `CATEGORY_NAME` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`CATEGORY_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `Documents`
--

DROP TABLE IF EXISTS `Documents`;
CREATE TABLE IF NOT EXISTS `Documents` (
  `DOCUMENT_ID` INT(10) NOT NULL AUTO_INCREMENT,
  `DOCUMENT_TITLE` VARCHAR(255) NOT NULL,
  `DOCUMENT_COVER` longblob DEFAULT NULL,
  `DOCUMENT_COPIES` INT(2) NOT NULL DEFAULT 0,
  `DOCUMENT_AUTHOR` INT(6) NOT NULL,
  `DOCUMENT_TYPE` INT(2) NOT NULL,
  `DOCUMENT_CATEGORY` INT(2) NOT NULL,
  PRIMARY KEY (`DOCUMENT_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `History`
--

DROP TABLE IF EXISTS `History`;
CREATE TABLE IF NOT EXISTS `History` (
  `HISTORY_ID` INT(100) NOT NULL AUTO_INCREMENT,
  `HISTORY_ACTION` INT(2) NOT NULL,
  `HISTORY_USER` INT(6) DEFAULT NULL,
  `HISTORY_USER_TYPE` enum('A','L','U') NOT NULL,
  `HISTORY_DATE` DATETIME NOT NULL,
  `HISTORY_DETAILS` VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY (`HISTORY_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `Librarians`
--

DROP TABLE IF EXISTS `Librarians`;
CREATE TABLE IF NOT EXISTS `Librarians` (
  `LIBRARIAN_ID` INT(2) NOT NULL AUTO_INCREMENT,
  `LIBRARIAN_LOGIN` VARCHAR(25) NOT NULL,
  `LIBRARIAN_PASSWORD` VARCHAR(30) NOT NULL,
  `LIBRARIAN_FNAME` VARCHAR(50) DEFAULT NULL,
  `LIBRARIAN_LNAME` VARCHAR(50) DEFAULT NULL,
  `LIBRARIAN_EMAIL` VARCHAR(100) DEFAULT NULL,
  PRIMARY KEY (`LIBRARIAN_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `Loans`
--

DROP TABLE IF EXISTS `Loans`;
CREATE TABLE IF NOT EXISTS `Loans` (
  `LOAN_ID` INT(10) NOT NULL AUTO_INCREMENT,
  `LOAN_USER` INT(6) NOT NULL,
  `LOAN_DOCUMENT` INT(10) NOT NULL,
  `LOAN_FROM_DATE` DATE NOT NULL,
  `LOAN_UNTIL_DATE` DATE NOT NULL,
  `LOAN_RETURNED_DATE` DATE DEFAULT NULL,
  PRIMARY KEY (`LOAN_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `Seats`
--

DROP TABLE IF EXISTS `Seats`;
CREATE TABLE IF NOT EXISTS `Seats` (
  `SEAT_ID` INT(2) NOT NULL AUTO_INCREMENT,
  `SEAT_FLOOR` INT(2) NOT NULL,
  `SEAT_ROOM` INT(2) NOT NULL,
  `SEAT_X` INT(2) NOT NULL,
  `SEAT_Y` INT(2) NOT NULL,
  `SEAT_AVAILABILITY` TINYINT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`SEAT_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `Types`
--

DROP TABLE IF EXISTS `Types`;
CREATE TABLE IF NOT EXISTS `Types` (
  `TYPE_ID` INT(6) NOT NULL AUTO_INCREMENT,
  `TYPE_NAME` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`TYPE_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
CREATE TABLE IF NOT EXISTS `Users` (
  `USER_ID` INT(6) NOT NULL AUTO_INCREMENT,
  `USER_STATUS` enum('USER','PENDING','BLOCKED') NOT NULL DEFAULT 'PENDING',
  `USER_LOGIN` VARCHAR(25) NOT NULL,
  `USER_PASSWORD` VARCHAR(30) NOT NULL,
  `USER_FNAME` VARCHAR(50) DEFAULT NULL,
  `USER_LNAME` VARCHAR(50) DEFAULT NULL,
  `USER_DIC` VARCHAR(20) NOT NULL,
  `USER_EMAIL` VARCHAR(100) DEFAULT NULL,
  PRIMARY KEY (`USER_ID`),
  UNIQUE KEY `USER_DIC` (`USER_DIC`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Bookings`
--
ALTER TABLE `Bookings`
  ADD CONSTRAINT `FK_BOOKING_SEAT` FOREIGN KEY (`BOOKING_SEAT`) REFERENCES `Seats` (`SEAT_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_BOOKING_USER` FOREIGN KEY (`BOOKING_USER`) REFERENCES `Users` (`USER_ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Documents`
--
ALTER TABLE `Documents`
  ADD CONSTRAINT `FK_DOCUMENT_AUTHOR` FOREIGN KEY (`DOCUMENT_AUTHOR`) REFERENCES `Authors` (`AUTHOR_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_DOCUMENT_CATEGORY` FOREIGN KEY (`DOCUMENT_CATEGORY`) REFERENCES `Categories` (`CATEGORY_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_DOCUMENT_TYPE` FOREIGN KEY (`DOCUMENT_TYPE`) REFERENCES `Types` (`TYPE_ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `History`
--
ALTER TABLE `History`
  ADD CONSTRAINT `FK_HISTORY_ACTION` FOREIGN KEY (`HISTORY_ACTION`) REFERENCES `Actions` (`ACTION_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_HISTORY_USER` FOREIGN KEY (`HISTORY_USER`) REFERENCES `Users` (`USER_ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Loans`
--
ALTER TABLE `Loans`
  ADD CONSTRAINT `FK_LOAN_DOCUMENT` FOREIGN KEY (`LOAN_DOCUMENT`) REFERENCES `Documents` (`DOCUMENT_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_LOAN_USER` FOREIGN KEY (`LOAN_USER`) REFERENCES `Users` (`USER_ID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
