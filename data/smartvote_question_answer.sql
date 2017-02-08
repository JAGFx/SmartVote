-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 08, 2017 at 03:40 PM
-- Server version: 5.7.14
-- PHP Version: 5.6.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `smartvote`
--

-- --------------------------------------------------------

--
-- Table structure for table `question_answer`
--

CREATE TABLE `question_answer` (
  `question_id` int(11) NOT NULL,
  `answer_id` int(11) NOT NULL,
  `value` varchar(50) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `question_answer`
--

INSERT INTO `question_answer` (`question_id`, `answer_id`, `value`) VALUES
(4, 1, '0'),
(4, 2, '0'),
(4, 3, '1'),
(5, 1, '0'),
(5, 2, '1'),
(6, 1, '1'),
(6, 2, '0');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `question_answer`
--
ALTER TABLE `question_answer`
  ADD KEY `question_answer_question_id_fk` (`question_id`),
  ADD KEY `question_answer_answers_id_fk` (`answer_id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
