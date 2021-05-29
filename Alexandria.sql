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
-- Database: `Alexandria`
--
CREATE DATABASE IF NOT EXISTS `Alexandria` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `Alexandria`;

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
(13, 'PEND_USER'),
(14, 'BLOCK_USER'),
(15, 'LOAN_BOOK'),
(16, 'RETURN_BOOK'),
(17, 'RESERVE_SEAT'),
(18, 'ADD_AUTHOR'),
(19, 'EDIT_AUTHOR'),
(20, 'DELETE_AUTHOR'),
(21, 'ADD_TYPE'),
(22, 'EDIT_TYPE'),
(23, 'DELETE_TYPE'),
(24, 'ADD_CATEGORY'),
(25, 'EDIT_CATEGORY'),
(26, 'DELETE_CATEGORY'),
(27, 'ADD_SUBJECT'),
(28, 'EDIT_SUBJECT'),
(29, 'DELETE_SUBJECT'),
(30, 'ADD_SEAT'),
(31, 'EDIT_SEAT'),
(32, 'DELETE_SEAT'),
(33, 'ADD_FLOOR'),
(34, 'EDIT_FLOOR'),
(35, 'DELETE_FLOOR'),
(36, 'ADD_ROOM'),
(37, 'EDIT_ROOM'),
(38, 'DELETE_ROOM');

-- --------------------------------------------------------

--
-- Table structure for table `Admins`
--

DROP TABLE IF EXISTS `Admins`;
CREATE TABLE IF NOT EXISTS `Admins` (
	`ADMIN_ID` INT(1) NOT NULL AUTO_INCREMENT,
	`ADMIN_LOGIN` VARCHAR(25) NOT NULL,
	`ADMIN_PASSWORD` VARCHAR(255) NOT NULL,
	`ADMIN_FNAME` VARCHAR(50) NOT NULL,
	`ADMIN_LNAME` VARCHAR(50) NOT NULL,
	`ADMIN_EMAIL` VARCHAR(100) DEFAULT NULL,
	PRIMARY KEY (`ADMIN_ID`),
	UNIQUE KEY `ADMIN_LOGIN` (`ADMIN_LOGIN`),
	UNIQUE KEY `ADMIN_EMAIL` (`ADMIN_EMAIL`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Truncate table before insert `Admins`
--

TRUNCATE TABLE `Admins`;
--
-- Dumping data for table `Admins`
--

INSERT INTO `Admins` (`ADMIN_ID`, `ADMIN_LOGIN`, `ADMIN_PASSWORD`, `ADMIN_FNAME`, `ADMIN_LNAME`, `ADMIN_EMAIL`) VALUES
(1, 'admin', '$2y$10$bPWIla0u1r1nNmrQ6UsqEOknDIEukzTOI8sxC6Xn/zYn6Qpc3ShiC', 'Mohamed Adem', 'Ben Moussa', 'MohamedAdemBenMoussa@Gmail.com');

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

--
-- Dumping data for table `Authors`
--

INSERT INTO `Authors` (`AUTHOR_ID`, `AUTHOR_NAME`) VALUES
(1, 'Aldous Huxley'),
(2, 'Paul Klee'),
(3, 'H. G. Wells'),
(4, 'Sarah R. Labensky'),
(5, 'Tobias Smollett'),
(6, 'Robert Louis Stevenson'),
(7, 'Sir Walter Scott'),
(8, 'William Paley');
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
(1, 'Art'),
(2, 'Science Fiction'),
(3, 'Fantasy'),
(4, 'Biographies'),
(5, 'Recipes'),
(6, 'Romance'),
(7, 'Textbooks'),
(8, 'Children'),
(9, 'History'),
(10, 'Medicine'),
(11, 'Religion'),
(12, 'Mysteries'),
(13, 'Plays'),
(14, 'Music'),
(15, 'Science');

-- --------------------------------------------------------

--
-- Table structure for table `Documents`
--

DROP TABLE IF EXISTS `Documents`;
CREATE TABLE IF NOT EXISTS `Documents` (
	`DOCUMENT_ID` INT(10) NOT NULL AUTO_INCREMENT,
	`DOCUMENT_TITLE` VARCHAR(255) NOT NULL,
	`DOCUMENT_COVER` VARCHAR(255) NOT NULL,
	`DOCUMENT_PLACEMENT` ENUM ('L','O','T','LO', 'TO') NOT NULL,
	`DOCUMENT_DATA` VARCHAR(255) DEFAULT NULL,
	`DOCUMENT_COPIES` INT(2) NOT NULL DEFAULT 0,
	`DOCUMENT_AUTHOR` INT(6) NOT NULL,
	`DOCUMENT_TYPE` INT(2) NOT NULL,
	`DOCUMENT_SUBJECT` INT(2) NOT NULL,
	`DOCUMENT_DESCRIPTION` TEXT DEFAULT NULL,
	PRIMARY KEY (`DOCUMENT_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Truncate table before insert `Documents`
--

TRUNCATE TABLE `Documents`;
--
-- Dumping data for table `Documents`
--

INSERT INTO `Documents` (`DOCUMENT_ID`, `DOCUMENT_TITLE`, `DOCUMENT_COVER`, `DOCUMENT_PLACEMENT`, `DOCUMENT_DATA`, `DOCUMENT_COPIES`, `DOCUMENT_AUTHOR`, `DOCUMENT_TYPE`, `DOCUMENT_SUBJECT`, `DOCUMENT_DESCRIPTION`) VALUES
(1, 'Brave New World', '1.jpg', 'L', NULL, 1, 1, 2, 26, 'Originally published in 1932, this outstanding work of literature is more crucial and relevant today than ever before. Cloning, feel-good drugs, antiaging programs, and total social control through politics, programming, and media -- has Aldous Huxley accurately predicted our future? With a storyteller&apos;s genius, he weaves these ethical controversies in a compelling narrative that dawns in the year 632 AF (After Ford, the deity). When Lenina and Bernard visit a savage reservation, we experience how Utopia can destroy humanity. A powerful work of speculative fiction that has enthralled and terrified readers for generations, Brave New World is both a warning to be heeded and thought-provoking yet satisfying entertainment.'),
(2, 'Paul Klee.', '2.jpg', 'L', NULL, 1, 2, 2, 4, NULL),
(3, 'The Time Machine', '3.jpg', 'LO', '3.pdf', 1, 3, 2, 22, 'The Time Traveller, a dreamer obsessed with traveling through time, builds himself a time machine and, much to his surprise, travels over 800,000 years into the future. He lands in the year 802701: the world has been transformed by a society living in apparent harmony and bliss, but as the Traveler stays in the future he discovers a hidden barbaric and depraved subterranean class. Wells&apos;s transparent commentary on the capitalist society was an instant bestseller and launched the time-travel genre.'),
(4, 'On Cooking', '4.jpg', 'L', NULL, 1, 4, 2, 51, NULL);

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
	`HISTORY_USER_TYPE` ENUM ('A','L','U') NOT NULL,
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
	`LIBRARIAN_FNAME` VARCHAR(50) NOT NULL,
	`LIBRARIAN_LNAME` VARCHAR(50) NOT NULL,
	`LIBRARIAN_EMAIL` VARCHAR(100) DEFAULT NULL,
	PRIMARY KEY (`LIBRARIAN_ID`),
	UNIQUE KEY `LIBRARIAN_LOGIN` (`LIBRARIAN_LOGIN`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Truncate table before insert `Librarians`
--

TRUNCATE TABLE `Librarians`;

--
-- Dumping data for table `Librarians`
--

INSERT INTO `Librarians` (`LIBRARIAN_ID`, `LIBRARIAN_LOGIN`, `LIBRARIAN_PASSWORD`, `LIBRARIAN_FNAME`, `LIBRARIAN_LNAME`, `LIBRARIAN_EMAIL`) VALUES
(1, 'Mariem', '$2y$10$/nQSVodl.3z2rifkXcZoXOwkUuSNtDFR6UsJExHAvbqSCR6kyk3UO', 'Mariem', 'Bouchaala', 'mariem.bouchaala@sesame.com.tn'),
(2, 'Insaf', '$2y$10$UrS7BiCw4k9xJXJ1Z1Ssl.kampSPFlH89GOp/ERhiGynMa5i1Xa9G', 'Insaf', 'Khemiri', 'insaf.khemiri@sesame.com.tn'),
(3, 'Kamel', '$2y$10$J1y5GIFj0CUvXIOUAPIkq.KbmbnmKov4ssRKhDf4kuii8A9B4Qyyq', 'Kamel', 'Ben Rhouma', 'kamel.benrhouma@sesame.com.tn'),
(4, 'Azza', '$2y$10$zAWIt/FjXMvmgfbHw1ChWuDg/LhoyXcovNZbSX2NqcCrKbY2SmZjy', 'Azza', 'Karoui', 'azza.karoui@sesame.com.tn'),
(5, 'Sonda', '$2y$10$Heo24WdWoeY0vHUlsZKaJOMM5wBKnJKrPc3qSIzsU5u0KUWHhpWb2', 'Sonda', 'Bousnina', 'sonda.bousnina@sesame.com.tn');

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
(1, 'Aesthetics', 1),
(2, 'Antiquities', 1),
(3, 'Architecture', 1),
(4, 'Art & Art Instruction', 1),
(5, 'Art Collections', 1),
(6, 'Artists', 1),
(7, 'Biography', 1),
(8, 'Catalogs', 1),
(9, 'Christian Art And Symboli', 1),
(10, 'History', 1),
(11, 'Individual Artist', 1),
(12, 'Individual Artists', 1),
(13, 'Modern Art', 1),
(14, 'Philosophy', 1),
(15, 'Private Collections', 1),
(16, 'Study And Teaching', 1),
(17, 'Adventure And Adventurers', 2),
(18, 'American Science Fiction', 2),
(19, 'Cartoons And Comics', 2),
(20, 'Children\'s Fiction', 2),
(21, 'Comic Books', 2),
(22, 'Extraterrestrial Beings', 2),
(23, 'Fantasy', 2),
(24, 'Fantasy Fiction', 2),
(25, 'Fiction', 2),
(26, 'Fiction - Science Fiction', 2),
(27, 'History And Criticism', 2),
(28, 'Juvenile Fiction', 2),
(29, 'Life On Other Planets', 2),
(30, 'Science Fiction', 2),
(49, 'Adventure And Adventurers', 3),
(50, 'Cartoons And Comics', 3),
(51, 'Children\'s Fiction', 3),
(52, 'Comic Books', 3),
(53, 'Comics & Graphic Novels', 3),
(54, 'Dragons', 3),
(55, 'Fairies', 3),
(56, 'Fantasy', 3),
(57, 'Fiction', 3),
(58, 'Good And Evil', 3),
(59, 'Juvenile Fiction', 3),
(60, 'Magic', 3),
(61, 'Romance', 3),
(62, 'Science Fiction', 3),
(63, 'Biography', 4),
(64, 'Dictionaries', 4),
(65, 'History', 4),
(66, 'History And Criticism', 4),
(67, 'Hommes Politiques', 4),
(68, 'Juvenile Literature', 4),
(69, 'Ouvrages Pour La Jeunesse', 4),
(70, 'Politics And Government', 4),
(71, 'Saints Chrétiens', 4),
(72, 'Women', 4),
(73, 'Cookery', 5),
(74, 'Cooking', 5),
(75, 'Desserts', 5),
(76, 'Diabetes', 5),
(77, 'Diet Therapy', 5),
(78, 'Diseases', 5),
(79, 'Gluten-free Diet', 5),
(80, 'Low-calorie Diet', 5),
(81, 'Low-carbohydrate Diet', 5),
(82, 'Low-cholesterol Diet', 5),
(83, 'Low-fat Diet', 5),
(84, 'Nutrition', 5),
(85, 'Nutritional Aspects', 5),
(86, 'Popular Works', 5),
(87, 'Reducing Diets', 5),
(88, 'Salt-free Diet', 5),
(89, 'Sugar-free Diet', 5),
(90, 'Weight Loss', 5),
(91, 'Contemporary', 6),
(92, 'Fiction', 6),
(93, 'Historical', 6),
(94, 'Historical Fiction', 6),
(95, 'Home & Family', 6),
(96, 'Inspirational', 6),
(97, 'Man-woman Relationships', 6),
(98, 'Novel', 6),
(99, 'Passion', 6),
(100, 'Romance', 6),
(101, 'Suspense', 6),
(102, 'Algebra', 7),
(103, 'Bible', 7),
(104, 'Business & Economics', 7),
(105, 'Education', 7),
(106, 'Education / Teaching', 7),
(107, 'Geography', 7),
(108, 'History', 7),
(109, 'Humanities', 7),
(110, 'Mathematics', 7),
(111, 'Psychology', 7),
(112, 'Science', 7),
(113, 'Study And Teaching', 7),
(114, 'Bibliography', 8),
(115, 'Biography', 8),
(116, 'Books And Reading', 8),
(117, 'Child Welfare', 8),
(118, 'Children\'s Literature', 8),
(119, 'Conduct Of Life', 8),
(120, 'Congresses', 8),
(121, 'Diseases', 8),
(122, 'Fiction', 8),
(123, 'Health And Hygiene', 8),
(124, 'History', 8),
(125, 'History And Criticism', 8),
(126, 'Juvenile Literature', 8),
(127, 'Language', 8),
(128, 'Laws', 8),
(129, 'Legal Status', 8),
(130, 'Nutrition', 8),
(131, 'Social Conditions', 8),
(132, 'Youth', 8),
(133, '1939-1945', 9),
(134, 'Bibliography', 9),
(135, 'Biography', 9),
(136, 'Catholic Church', 9),
(137, 'Church History', 9),
(138, 'Civilization', 9),
(139, 'Congresses', 9),
(140, 'Fiction', 9),
(141, 'Histoire', 9),
(142, 'History And Criticism', 9),
(143, 'Jews', 9),
(144, 'Juvenile Literature', 9),
(145, 'Philosophy', 9),
(146, 'Pictorial Works', 9),
(147, 'Politics And Government', 9),
(148, 'Social Conditions', 9),
(149, 'Social Life And Customs', 9),
(150, 'Sources', 9),
(151, 'World War', 9),
(152, 'Bibliography', 10),
(153, 'Biography', 10),
(154, 'Congresses', 10),
(155, 'Dictionaries', 10),
(156, 'Diseases', 10),
(157, 'Early Works To 1800', 10),
(158, 'Formulae', 10),
(159, 'History', 10),
(160, 'Medical Care', 10),
(161, 'Periodicals', 10),
(162, 'Philosophy', 10),
(163, 'Physicians', 10),
(164, 'Practice', 10),
(165, 'Prescriptions', 10),
(166, 'Public Health', 10),
(167, 'Receipts', 10),
(168, 'Research', 10),
(169, 'Study And Teaching', 10),
(170, 'Surgery', 10),
(171, 'Terminology', 10),
(172, 'Bible', 11),
(173, 'Biography', 11),
(174, 'Catholic Church', 11),
(175, 'Christian Life - General', 11),
(176, 'Christianity', 11),
(177, 'Church History', 11),
(178, 'Congresses', 11),
(179, 'History', 11),
(180, 'History And Criticism', 11),
(181, 'Islam', 11),
(182, 'Philosophy', 11),
(183, 'Religions', 11),
(184, 'Religious Aspects', 11),
(185, 'Religious Life And Custom', 11),
(186, 'Social Life And Customs', 11),
(187, 'Theology', 11),
(188, 'Adventure And Adventurers', 12),
(189, 'Brothers And Sisters', 12),
(190, 'Children\'s Fiction', 12),
(191, 'Christian Life', 12),
(192, 'Detective And Mystery Sto', 12),
(193, 'Dogs', 12),
(194, 'Fiction', 12),
(195, 'Friendship', 12),
(196, 'Ghosts', 12),
(197, 'History', 12),
(198, 'Humorous Stories', 12),
(199, 'Juvenile Fiction', 12),
(200, 'Murder', 12),
(201, 'Mystery Fiction', 12),
(202, 'Orphans', 12),
(203, 'Schools', 12),
(204, 'American', 13),
(205, 'Children\'s Plays', 13),
(206, 'Drama', 13),
(207, 'Drama Texts: From C 1900 ', 13),
(208, 'Dramatic Production', 13),
(209, 'English Drama', 13),
(210, 'English Literature', 13),
(211, 'English Young Adult Drama', 13),
(212, 'Fiction', 13),
(213, 'Juvenile Drama', 13),
(214, 'Juvenile Literature', 13),
(215, 'Performing Arts', 13),
(216, 'Plays / Drama', 13),
(217, 'Tragedy', 13),
(218, 'Vendetta', 13),
(219, 'Youth', 13),
(220, 'Bibliography', 14),
(221, 'Biography', 14),
(222, 'Catalogs', 14),
(223, 'Congresses', 14),
(224, 'Genres & Styles - Classic', 14),
(225, 'History', 14),
(226, 'History And Criticism', 14),
(227, 'Instruction And Study', 14),
(228, 'Manuscripts', 14),
(229, 'Music / songbooks', 14),
(230, 'Musical Instruments - Pia', 14),
(231, 'Musicians', 14),
(232, 'Philosophy And Aesthetics', 14),
(233, 'Social Aspects', 14),
(234, 'Songbooks - General', 14),
(235, 'Bibliography', 15),
(236, 'Congresses', 15),
(237, 'Experiments', 15),
(238, 'History', 15),
(239, 'Juvenile Literature', 15),
(240, 'Mathematics', 15),
(241, 'Methodology', 15),
(242, 'Nonfiction', 15),
(243, 'Philosophy', 15),
(244, 'Physics', 15),
(245, 'Research', 15),
(246, 'Science', 15),
(247, 'Science / Mathematics', 15),
(248, 'Social Aspects', 15),
(249, 'Study And Teaching', 15),
(250, 'Study And Teaching (Eleme', 15),
(251, 'Technology', 15);

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
(1, 'Dictionarie & Encyclopedia'),
(2, 'Book'),
(3, 'Journal And Journal Article'),
(4, 'Technical Report'),
(5, 'Patent'),
(6, 'Standard'),
(7, 'Dissertation And These');

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
CREATE TABLE IF NOT EXISTS `Users` (
	`USER_ID` INT(6) NOT NULL AUTO_INCREMENT,
	`USER_STATUS` ENUM ('USER','PENDING','BLOCKED') NOT NULL DEFAULT 'PENDING',
	`USER_LOGIN` VARCHAR(25) NOT NULL,
	`USER_PASSWORD` VARCHAR(255) NOT NULL,
	`USER_FNAME` VARCHAR(50) NOT NULL,
	`USER_LNAME` VARCHAR(50) NOT NULL,
	`USER_DIC` VARCHAR(20) NOT NULL,
	`USER_EMAIL` VARCHAR(100) NOT NULL,
	PRIMARY KEY (`USER_ID`),
	UNIQUE KEY `USER_LOGIN` (`USER_LOGIN`),
	UNIQUE KEY `USER_DIC` (`USER_DIC`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Truncate table before insert `Users`
--

TRUNCATE TABLE `Users`;
--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`USER_ID`, `USER_STATUS`, `USER_LOGIN`, `USER_PASSWORD`, `USER_FNAME`, `USER_LNAME`, `USER_DIC`, `USER_EMAIL`) VALUES
(1, 'USER', 'Adem', '$2y$10$M.MMdFCtU0I8GUojkl4Yuud6c7PVUI2W0mL9LK4FxN1i6KO2VB.wC', 'Mohamed Adem', 'Ben Moussa', '05246511', 'mohamedadem.benmoussa@sesame.com.tn'),
(2, 'USER', 'Najla', '$2y$10$0WMHZ.v75PxR8P92F5LLX.u7b6.OGcpV6/vreofHiaNwQy1X6GeXe', 'Najla', 'Abdelli', '13528535', 'najla.abdelli@sesame.com.tn'),
(3, 'PENDING', 'Yosra', '$2y$10$45mYOlag6WGEYYMSN40JmOR4Qqi2.ZP3eBJkC3/cvhAlAIVckj3iG', 'Yosra', 'Jbeli', '18771831', 'yosra.jbeli@sesame.com.tn'),
(4, 'PENDING', 'Adam', '$2y$10$enpgOe0g5PxzIWydwAAen.vkRx.chLCp/YXhHnQKz.K2hI0iwFIY.', 'Adam', 'Ferjani', '19911450', 'adam.ferjani@sesame.com.tn'),
(5, 'PENDING', 'Rim', '$2y$10$CA6L97b2drzgyMxgH8wDCuaM4ktADilPzlsuYgB6n2hb6g.ji5suW', 'Rim', 'Souissi', '10279192', 'rim.souissi@sesame.com.tn'),
(6, 'PENDING', 'Ayoub', '$2y$10$y69HC1mGa60nOXo.E7P8F.QOCEbRnrYcDw1mJui1VKM99iCf1nKVq', 'Ayoub', 'Besrour', '15974575', 'ayoub.besrour@sesame.com.tn'),
(7, 'PENDING', 'Farah', '$2y$10$RoioadGhUCas4UzlJK/JzeGl9hLJKLoldYnRuNwOKDGc7VIEtm.qa', 'Farah', 'Boudabous', '06732558', 'farah.boudabous@sesame.com.tn'),
(8, 'PENDING', 'Khaled', '$2y$10$CuAcrsyERF4MiZDNOKI.VeqLZqnMUx9SMDYRJz.jsamlpNg.Z.Lgq', 'Khaled', 'Mejbri', '17446092', 'khaled.mejbri@sesame.com.tn'),
(9, 'PENDING', 'Wafa', '$2y$10$DtuHp7jLu2pcB2qQndcYWu8CasT2FnCyAO3S0IQtktlSr.36HYeou', 'Wafa', 'Mekni', '09163007', 'wafa.mekni@sesame.com.tn'),
(10, 'PENDING', 'Youssef', '$2y$10$h1kGw/D2uO7o71m9HQRMUeW/m/Bs.1eM9OdfnfEXfgJRSKqBT0c.2', 'Youssef', 'Khiari', '14922697', 'youssef.khiari@sesame.com.tn'),
(11, 'PENDING', 'Rabeb', '$2y$10$3dGxeOAfXP63pQNO5HV4Aetgluh0rjgM2jbmqt2D7InzabpcV1x12', 'Rabeb', 'Mahmoudi', '00327527', 'rabeb.mahmoudi@sesame.com.tn'),
(12, 'PENDING', 'Ali', '$2y$10$dc.xlvso3r3Ut.BWHxMv..d0k/5qAvlce.PMquQ9/fPRX3HMvOtWW', 'Ali', 'Chaabane', '15990926', 'ali.chaabane@sesame.com.tn'),
(13, 'PENDING', 'Abir', '$2y$10$dU7b0CPTzCBHYIHq/y75re.85hyxToFN02xooFeshzYxzoe1UEklq', 'Abir', 'Hammami', '00956168', 'abir.hammami@sesame.com.tn'),
(14, 'PENDING', 'Moetez', '$2y$10$z9ZexCVSanpLlUl1wdLiTO9Pk2RcEVwj9K0OXF1AlNkyFxgcmvhye', 'Moetez', 'Mejri', '17826685', 'moetez.mejri@sesame.com.tn'),
(15, 'PENDING', 'Emna', '$2y$10$L2HVrXrcq51918to5dGVaeN6QHo8YBD0hdq7m2TONKMNHC6tlJTOa', 'Emna', 'Taboubi', '14400199', 'emna.taboubi@sesame.com.tn'),
(16, 'PENDING', 'Wassim', '$2y$10$amikpx0uM6zzmmq66B9HtOad06iVVkyDtEMHUff8ZL90Lw/zv7Q4K', 'Wassim', 'Benk Halifa', '05737153', 'wassim.benkhalifa@sesame.com.tn'),
(17, 'PENDING', 'Amira', '$2y$10$A3die8y/4QUkcdVHKA2oCeRlEILpInSugDmNMsrmhtoOZwBFn8BMu', 'Amira', 'Larafa', '15547953', 'amira.larafa@sesame.com.tn'),
(18, 'PENDING', 'Hamza', '$2y$10$8i5IlbOAk5KCIzGyTuwlXuawLbyDmi4Z1mJfpB7kuFRqQvtiF/VJ6', 'Hamza', 'Jouini', '17708875', 'hamza.jouini@sesame.com.tn'),
(19, 'PENDING', 'Ons', '$2y$10$BFk2K86lPA1zlQoj469PcuU6CknZSP2uc1wpOdCfoUAOXAD2Lf0oS', 'Ons', 'Khelil', '13082666', 'ons.khelil@sesame.com.tn'),
(20, 'PENDING', 'Mouldi', '$2y$10$Gz.PpprTP0GkdEHRLLTwfeS89tgOIom4BJpK/rl0So0IegEE2czM2', 'Mouldi', 'Bani', '16933258', 'mouldi.bani@sesame.com.tn'),
(21, 'PENDING', 'Sana', '$2y$10$n2cfCG.AlN6DZk2WzDfpv.0skFxY4pGGaKbnQCkQ8oSJTjM6SsUgS', 'Sana', 'Kochbati', '09152316', 'sana.kochbati@sesame.com.tn'),
(22, 'PENDING', 'Bilel', '$2y$10$oVsP5Zjd81AIrWX4WC2C0umgElAGECkUhTNzyCrphzgIcVbF5E6Ye', 'Bilel', 'Bradai', '04895025', 'bilel.bradai@sesame.com.tn'),
(23, 'PENDING', 'Samar', '$2y$10$/X3TZqNSalp22xCqliQmwOfjVNkMrXO266dEQe6euhozMaZW.z2.i', 'Samar', 'Sboui', '19114969', 'samar.sboui@sesame.com.tn'),
(24, 'PENDING', 'Tarek', '$2y$10$lnwGGN0m72jwLAOLhEFIE.OGbIeh3Gwt0pxhPHqTUr.YZ9IAGxd72', 'Tarek', 'Lounissi', '00446366', 'tarek.lounissi@sesame.com.tn'),
(25, 'PENDING', 'Dorsaf', '$2y$10$9GyysOcmBIKUII8ZiS2zfOv82hYTPC6c8ImqO2lrOIJrc2egS2y/G', 'Dorsaf', 'Gharsellaoui', '18334271', 'dorsaf.gharsellaoui@sesame.com.tn'),
(26, 'PENDING', 'Seif', '$2y$10$jLzgAeq07AnfW1cLbyQIeuJO8yS4u0xf8nptMqY.x7FSjFGTrGzrq', 'Seifeddine', 'Jlassi', '15171912', 'seifeddine.jlassi@sesame.com.tn'),
(27, 'PENDING', 'Takoua', '$2y$10$NgGFTix66/NPvhAaX9ngb.XB9B2i7qhNOR8fdqrg0kJ.oIRr6vMua', 'Takoua', 'Mohamed', '05532876', 'takoua.mohamed@sesame.com.tn'),
(28, 'PENDING', 'Dhia', '$2y$10$kb8InpRIioXySS7b4g6XQerlwN7UBEcyZqS3hLIi2axMMeYW.A6ri', 'Dhiaeddine', 'Saria', '08257120', 'dhiaeddine.saria@sesame.com.tn'),
(29, 'PENDING', 'Ala', '$2y$10$PU9FT1ZCTkswBO3V/96b9u1JFK8bOyBfPGG83ftmTiV0NhARISqzK', 'Ala', 'Mahmoudi', '12726925', 'ala.mahmoudi@sesame.com.tn'),
(30, 'PENDING', 'Ghaith', '$2y$10$6w.CXCve1fFvs5eu/eHVAujyb.UqV2geYuItdVyo29ze/GH2xl9/W', 'Ghaith', 'Troudi', '13092591', 'ghaith.troudi@sesame.com.tn'),
(31, 'PENDING', 'Ahmed', '$2y$10$b/DFqkxQD4HjwhWVhR.xpOb.gbVDWCjbA4NdPpC072ETeEhg3W1lu', 'Ahmed', 'Elmemmi', '04948679', 'ahmed.elmemmi@sesame.com.tn'),
(32, 'PENDING', 'Anouer', '$2y$10$J7QWHqm.Zb/7MYZ00UD7ou8XL1/ftTv9T3q0gcMEAfljlaWlF4HEm', 'Anouer', 'Elkallel', '15052779', 'anouer.elkallel@sesame.com.tn'),
(33, 'PENDING', 'Mohamed', '$2y$10$af3XHy6OcWhY0zmexkUjOO/g6Spcjzg0QIslPJoAMFmUbB/2Fe93G', 'Mohamed Amine', 'Rachdi', '18785849', 'mohamedamine.rachdi@sesame.com.tn'),
(34, 'PENDING', 'Alaa', '$2y$10$ubVqyCRMM6p4Be5zh6KgUO7ILatVvKH6LaOWo5ljuQ2GLVyYaIkY6', 'Alaa', 'Menjli', '11318535', 'alaa.menjli@sesame.com.tn'),
(35, 'PENDING', 'Amine', '$2y$10$UWTAj0d7SXCEomxnQSeMb.URSx6ZGUPyVPv.BNUMhyUHrWCuBuOLG', 'Amine', 'Ben Messaoud', '18517735', 'amine.benmessaoud@sesame.com.tn'),
(36, 'PENDING', 'MohamedAmine', '$2y$10$yj9oK8rtGnsX65nafrxbzu6mfKPPe1gNSaeNCtepuLoe1tevCtP.G', 'Mohamed Amine', 'Azzabi', '01444721', 'mohamedamine.azzabi@sesame.com.tn'),
(37, 'BLOCKED', 'Ahlem', '$2y$10$8oJE8c9ptBHINm0xTeOzG.uzo0bvdrfGsabOIfyAs3VbMu4QDb73O', 'Ahlem', 'Chebbi', '01166826', 'ahlem.chebbi@sesame.com.tn'),
(38, 'BLOCKED', 'Asma', '$2y$10$lLe269yLjJHt/E2W1ky3rejCvtSqI4C5x.13fCOZlHSaFok0t7Ym6', 'Asma', 'Achour', '09486808', 'asma.achour@sesame.com.tn');

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
