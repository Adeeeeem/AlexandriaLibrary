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
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4;

--
-- Truncate table before insert `Actions`
--

TRUNCATE TABLE `Actions`;
--
-- Dumping data for table `Actions`
--

INSERT INTO `Actions` (`ACTION_ID`, `ACTION_NAME`) VALUES
(1, 'LOGIN'),
(2, 'LOGOUT'),
(3, 'ADD_LIBRARIAN'),
(4, 'EDIT_LIBRARIAN'),
(5, 'DELETE_LIBRARIAN'),
(6, 'ADD_DOCUMENT'),
(7, 'EDIT_DOCUMENT'),
(8, 'DELETE_DOCUMENT'),
(9, 'CREATE_PROFILE'),
(10, 'EDIT_PROFILE'),
(11, 'DELETE_PROFILE'),
(12, 'APPROVE_USER'),
(13, 'BLOCK_USER'),
(14, 'LOAN_BOOK'),
(15, 'RETURN_BOOK'),
(16, 'RESERVE_SEAT'),
(17, 'ADD_AUTHOR'),
(18, 'EDIT_AUTHOR'),
(19, 'DELETE_AUTHOR'),
(20, 'ADD_TYPE'),
(21, 'EDIT_TYPE'),
(22, 'DELETE_TYPE'),
(23, 'ADD_CATEGORY'),
(24, 'EDIT_CATEGORY'),
(25, 'DELETE_CATEGORY'),
(26, 'ADD_SUBJECT'),
(27, 'EDIT_SUBJECT'),
(28, 'DELETE_SUBJECT'),
(29, 'ADD_SEAT'),
(30, 'EDIT_SEAT'),
(31, 'DELETE_SEAT'),
(32, 'ADD_FLOOR'),
(33, 'EDIT_FLOOR'),
(34, 'DELETE_FLOOR'),
(35, 'ADD_ROOM'),
(36, 'EDIT_ROOM'),
(37, 'DELETE_ROOM');

-- --------------------------------------------------------

--
-- Table structure for table `Admins`
--

DROP TABLE IF EXISTS `Admins`;
CREATE TABLE IF NOT EXISTS `Admins` (
  `ADMIN_ID` INT(1) NOT NULL AUTO_INCREMENT,
  `ADMIN_LOGIN` VARCHAR(25) NOT NULL,
  `ADMIN_PASSWORD` VARCHAR(255) NOT NULL,
  `ADMIN_FNAME` VARCHAR(50) DEFAULT NULL,
  `ADMIN_LNAME` VARCHAR(50) DEFAULT NULL,
  `ADMIN_EMAIL` VARCHAR(100) DEFAULT NULL,
  PRIMARY KEY (`ADMIN_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Truncate table before insert `Admins`
--

TRUNCATE TABLE `Admins`;
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

--
-- Truncate table before insert `Authors`
--

TRUNCATE TABLE `Authors`;
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

--
-- Truncate table before insert `Bookings`
--

TRUNCATE TABLE `Bookings`;
-- --------------------------------------------------------

--
-- Table structure for table `Categories`
--

DROP TABLE IF EXISTS `Categories`;
CREATE TABLE IF NOT EXISTS `Categories` (
  `CATEGORY_ID` INT(2) NOT NULL AUTO_INCREMENT,
  `CATEGORY_NAME` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`CATEGORY_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4;

--
-- Truncate table before insert `Categories`
--

TRUNCATE TABLE `Categories`;
--
-- Dumping data for table `Categories`
--

INSERT INTO `Categories` (`CATEGORY_ID`, `CATEGORY_NAME`) VALUES
(1, 'Business Industry And Finance'),
(2, 'Education'),
(3, 'Health And Medicine'),
(4, 'History'),
(5, 'Humanities And Social Sciences'),
(6, 'Interests And Hobbies'),
(7, 'Legal Studies'),
(8, 'Literature'),
(9, 'Science And Technology');

-- --------------------------------------------------------

--
-- Table structure for table `Documents`
--

DROP TABLE IF EXISTS `Documents`;
CREATE TABLE IF NOT EXISTS `Documents` (
  `DOCUMENT_ID` INT(10) NOT NULL AUTO_INCREMENT,
  `DOCUMENT_TITLE` VARCHAR(255) NOT NULL,
  `DOCUMENT_COVER` MEDIUMBLOB DEFAULT NULL,
  `DOCUMENT_PLACEMENT` ENUM'L','O','T') NOT NULL,
  `DOCUMENT_DATA` MEDIUMBLOB DEFAULT NULL,
  `DOCUMENT_COPIES` INT(2) NOT NULL DEFAULT 0,
  `DOCUMENT_AUTHOR` INT(6) NOT NULL,
  `DOCUMENT_TYPE` INT(2) NOT NULL,
  `DOCUMENT_SUBJECT` INT(2) NOT NULL,
  PRIMARY KEY (`DOCUMENT_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Truncate table before insert `Documents`
--

TRUNCATE TABLE `Documents`;
-- --------------------------------------------------------

--
-- Table structure for table `Floors`
--

DROP TABLE IF EXISTS `Floors`;
CREATE TABLE IF NOT EXISTS `Floors` (
  `FLOOR_ID` INT(2) NOT NULL AUTO_INCREMENT,
  `FLOOR_NAME` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`FLOOR_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Truncate table before insert `Floors`
--

TRUNCATE TABLE `Floors`;
-- --------------------------------------------------------

--
-- Table structure for table `History`
--

DROP TABLE IF EXISTS `History`;
CREATE TABLE IF NOT EXISTS `History` (
  `HISTORY_ID` INT(100) NOT NULL AUTO_INCREMENT,
  `HISTORY_ACTION` INT(2) NOT NULL,
  `HISTORY_USER` INT(6) DEFAULT NULL,
  `HISTORY_USER_TYPE` ENUM'A','L','U') NOT NULL,
  `HISTORY_DATE` DATETIME NOT NULL,
  `HISTORY_DETAILS` VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY (`HISTORY_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Truncate table before insert `History`
--

TRUNCATE TABLE `History`;
-- --------------------------------------------------------

--
-- Table structure for table `Librarians`
--

DROP TABLE IF EXISTS `Librarians`;
CREATE TABLE IF NOT EXISTS `Librarians` (
  `LIBRARIAN_ID` INT(2) NOT NULL AUTO_INCREMENT,
  `LIBRARIAN_LOGIN` VARCHAR(25) NOT NULL,
  `LIBRARIAN_PASSWORD` VARCHAR(255) NOT NULL,
  `LIBRARIAN_FNAME` VARCHAR(50) DEFAULT NULL,
  `LIBRARIAN_LNAME` VARCHAR(50) DEFAULT NULL,
  `LIBRARIAN_EMAIL` VARCHAR(100) DEFAULT NULL,
  PRIMARY KEY (`LIBRARIAN_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Truncate table before insert `Librarians`
--

TRUNCATE TABLE `Librarians`;
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

--
-- Truncate table before insert `Loans`
--

TRUNCATE TABLE `Loans`;
-- --------------------------------------------------------

--
-- Table structure for table `Rooms`
--

DROP TABLE IF EXISTS `Rooms`;
CREATE TABLE IF NOT EXISTS `Rooms` (
  `ROOM_ID` INT(2) NOT NULL AUTO_INCREMENT,
  `ROOM_NAME` VARCHAR(50) NOT NULL,
  `ROOM_FLOOR` INT(2) NOT NULL,
  PRIMARY KEY (`ROOM_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Truncate table before insert `Rooms`
--

TRUNCATE TABLE `Rooms`;
-- --------------------------------------------------------

--
-- Table structure for table `Seats`
--

DROP TABLE IF EXISTS `Seats`;
CREATE TABLE IF NOT EXISTS `Seats` (
  `SEAT_ID` INT(2) NOT NULL AUTO_INCREMENT,
  `SEAT_ROOM` INT(2) NOT NULL,
  `SEAT_X` INT(2) NOT NULL,
  `SEAT_Y` INT(2) NOT NULL,
  `SEAT_AVAILABILITY` TINYINT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`SEAT_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Truncate table before insert `Seats`
--

TRUNCATE TABLE `Seats`;
-- --------------------------------------------------------

--
-- Table structure for table `Subjects`
--
--

DROP TABLE IF EXISTS `Subjects`;
CREATE TABLE IF NOT EXISTS `Subjects` (
  `SUBJECT_ID` INT(2) NOT NULL AUTO_INCREMENT,
  `SUBJECT_NAME` VARCHAR(25) NOT NULL,
  `SUBJECT_CATEGORY` INT(2) NOT NULL,
  PRIMARY KEY (`SUBJECT_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=75 DEFAULT CHARSET=utf8mb4;

--
-- Truncate table before insert `Subjects`
--

TRUNCATE TABLE `Subjects`;
--
-- Dumping data for table `Subjects`
--

INSERT INTO `Subjects` (`SUBJECT_ID`, `SUBJECT_NAME`, `SUBJECT_CATEGORY`) VALUES
(1, 'Business', 1),
(2, 'Careers And Occupations', 1),
(3, 'Economics', 1),
(4, 'Finance', 1),
(5, 'Industries And Companies', 1),
(6, 'Management', 1),
(7, 'Marketing', 1),
(8, 'Educational Methods And I', 2),
(9, 'Higher Education', 2),
(10, 'Instructional Content', 2),
(11, 'Library And Information S', 2),
(12, 'Health Care', 3),
(13, 'Health Issues', 3),
(14, 'Human Anatomy', 3),
(15, 'Medical Conditions, Diagn', 3),
(16, 'Medical Science And Resea', 3),
(17, 'Nursing And Allied Health', 3),
(18, 'Wellness', 3),
(19, 'Biography', 4),
(20, 'Legal History', 4),
(21, 'Military History', 4),
(22, 'Women\'s History', 4),
(23, 'World History ', 4),
(24, 'Art And Music', 5),
(25, 'Communication Studies', 5),
(26, 'Criminal Justice', 5),
(27, 'Current Issues', 5),
(28, 'Demographics', 5),
(29, 'Environmental Studies', 5),
(30, 'Gender And Women\'s Studie', 5),
(31, 'Geography', 5),
(32, 'International Relations', 5),
(33, 'Language', 5),
(34, 'Multicultural And Regiona', 5),
(35, 'Philosophy', 5),
(36, 'Politics And Government', 5),
(37, 'Popular Culture', 5),
(38, 'Religion And Mythology', 5),
(39, 'Social Sciences', 5),
(40, 'Antiques', 6),
(41, 'Arts & Crafts', 6),
(42, 'Automotive Repair', 6),
(43, 'Culinary Arts', 6),
(44, 'Family', 6),
(45, 'Gardening & Horticulture', 6),
(46, 'Genealogy', 6),
(47, 'Home Improvement', 6),
(48, 'Photography', 6),
(49, 'Sports & Recreation', 6),
(50, 'Teen Interest & Issues', 6),
(51, 'Travel Guides ', 6),
(52, 'Criminal Justice', 7),
(53, 'Law', 7),
(54, 'Legal Issues', 7),
(55, 'Authors', 8),
(56, 'Bibliography', 8),
(57, 'British Literature', 8),
(58, 'Children\'s And Young Adul', 8),
(59, 'Fiction Works', 8),
(60, 'Literature Criticism', 8),
(61, 'World Literature', 8),
(62, 'Agriculture', 9),
(63, 'Astronomy', 9),
(64, 'Chemistry', 9),
(65, 'Computing And Information', 9),
(66, 'Earth Science', 9),
(67, 'Engineering', 9),
(68, 'Forensics', 9),
(69, 'General Science', 9),
(70, 'History Of Science And Te', 9),
(71, 'Life Sciences', 9),
(72, 'Mathematics', 9),
(73, 'Nanotechnology', 9),
(74, 'Physics', 9);

-- --------------------------------------------------------

--
-- Table structure for table `Types`
--

DROP TABLE IF EXISTS `Types`;
CREATE TABLE IF NOT EXISTS `Types` (
  `TYPE_ID` INT(6) NOT NULL AUTO_INCREMENT,
  `TYPE_NAME` VARCHAR(30) NOT NULL,
  PRIMARY KEY (`TYPE_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;

--
-- Truncate table before insert `Types`
--

TRUNCATE TABLE `Types`;
--
-- Dumping data for table `Types`
--

INSERT INTO `Types` (`TYPE_ID`, `TYPE_NAME`) VALUES
(1, 'Dictionaries & Encyclopedias'),
(2, 'Books'),
(3, 'Journals And Journal Articles'),
(4, 'Technical Reports'),
(5, 'Patents'),
(6, 'Standards'),
(7, 'Dissertations And Theses');

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
CREATE TABLE IF NOT EXISTS `Users` (
  `USER_ID` INT(6) NOT NULL AUTO_INCREMENT,
  `USER_STATUS` ENUM'USER','PENDING','BLOCKED') NOT NULL DEFAULT 'PENDING',
  `USER_LOGIN` VARCHAR(25) NOT NULL,
  `USER_PASSWORD` VARCHAR(255) NOT NULL,
  `USER_FNAME` VARCHAR(50) DEFAULT NULL,
  `USER_LNAME` VARCHAR(50) DEFAULT NULL,
  `USER_DIC` VARCHAR(20) NOT NULL,
  `USER_EMAIL` VARCHAR(100) DEFAULT NULL,
  PRIMARY KEY (`USER_ID`),
  UNIQUE KEY `USER_DIC` (`USER_DIC`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Truncate table before insert `Users`
--

TRUNCATE TABLE `Users`;
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
  ADD CONSTRAINT `FK_DOCUMENT_SUBJECT` FOREIGN KEY (`DOCUMENT_SUBJECT`) REFERENCES `Subjects` (`SUBJECT_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_DOCUMENT_TYPE` FOREIGN KEY (`DOCUMENT_TYPE`) REFERENCES `Types` (`TYPE_ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `History`
--
ALTER TABLE `History`
  ADD CONSTRAINT `FK_HISTORY_ACTION` FOREIGN KEY (`HISTORY_ACTION`) REFERENCES `Actions` (`ACTION_ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Loans`
--
ALTER TABLE `Loans`
  ADD CONSTRAINT `FK_LOAN_DOCUMENT` FOREIGN KEY (`LOAN_DOCUMENT`) REFERENCES `Documents` (`DOCUMENT_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_LOAN_USER` FOREIGN KEY (`LOAN_USER`) REFERENCES `Users` (`USER_ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Rooms`
--
ALTER TABLE `Rooms`
  ADD CONSTRAINT `FK_ROOM_FLOOR` FOREIGN KEY (`ROOM_FLOOR`) REFERENCES `Floors` (`FLOOR_ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Seats`
--
ALTER TABLE `Seats`
  ADD CONSTRAINT `FK_SEAT_ROOM` FOREIGN KEY (`SEAT_ROOM`) REFERENCES `Rooms` (`ROOM_ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Subjects`
--
ALTER TABLE `Subjects`
  ADD CONSTRAINT `FK_SUBJECT_CATEGORY` FOREIGN KEY (`SUBJECT_CATEGORY`) REFERENCES `Categories` (`CATEGORY_ID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- --------------------------------------------------------

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
