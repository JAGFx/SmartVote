-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 14, 2017 at 07:11 PM
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
CREATE DATABASE IF NOT EXISTS `smartvote`
  DEFAULT CHARACTER SET utf8
  COLLATE utf8_general_ci;
USE `smartvote`;

-- --------------------------------------------------------

--
-- Table structure for table `answers`
--

CREATE TABLE IF NOT EXISTS `answers` (
  `id`   INT(11)      NOT NULL AUTO_INCREMENT,
  `text` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

-- --------------------------------------------------------

--
-- Table structure for table `question`
--

CREATE TABLE IF NOT EXISTS `question` (
  `id`   INT(11) NOT NULL AUTO_INCREMENT,
  `text` TEXT    NOT NULL,
  `tags` JSON             DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `question_answer`
--

CREATE TABLE IF NOT EXISTS `question_answer` (
  `question_id` INT(11)     NOT NULL,
  `answer_id`   INT(11)     NOT NULL,
  `value`       VARCHAR(50) NOT NULL,
  KEY `question_answer_question_id_fk` (`question_id`),
  KEY `question_answer_answers_id_fk` (`answer_id`)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
