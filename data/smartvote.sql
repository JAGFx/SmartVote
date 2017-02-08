SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

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

CREATE TABLE `answers` (
  `id`   INT(11)      NOT NULL,
  `text` VARCHAR(255) NOT NULL
)
  ENGINE = MyISAM
  DEFAULT CHARSET = utf8;

-- --------------------------------------------------------

--
-- Table structure for table `question`
--

CREATE TABLE `question` (
  `id`   int(11) NOT NULL,
  `text` TEXT    NOT NULL,
  `tags` JSON DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `question_answer`
--

CREATE TABLE `question_answer` (
  `question_id` INT(11)     NOT NULL,
  `answer_id`   INT(11)     NOT NULL,
  `value`       VARCHAR(50) NOT NULL
)
  ENGINE = MyISAM
  DEFAULT CHARSET = utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `answers`
--
ALTER TABLE `answers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `question`
--
ALTER TABLE `question`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `question_answer`
--
ALTER TABLE `question_answer`
  ADD KEY `question_answer_question_id_fk` (`question_id`),
  ADD KEY `question_answer_answers_id_fk` (`answer_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `answers`
--
ALTER TABLE `answers`
  MODIFY `id` INT(11) NOT NULL AUTO_INCREMENT,
  AUTO_INCREMENT = 4;
--
-- AUTO_INCREMENT for table `question`
--
ALTER TABLE `question`
  MODIFY `id` INT(11) NOT NULL AUTO_INCREMENT,
  AUTO_INCREMENT = 7;
