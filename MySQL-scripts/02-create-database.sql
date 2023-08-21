DROP DATABASE IF EXISTS `taskmanager`;
CREATE DATABASE IF NOT EXISTS `taskmanager`;
USE `taskmanager`;

DROP TABLE IF EXISTS `staff_list`;
CREATE TABLE `staff_list` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `surname` varchar(50) NOT NULL,
  `position` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `tasks`;
CREATE TABLE `tasks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(500) NOT NULL,
  `staff_member_id` int NOT NULL,
  `status` varchar(50) NOT NULL,
  `status_of_completion` int NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`staff_member_id`) REFERENCES staff_list(`id`)
);

INSERT INTO `staff_list` VALUES
(0, 'Jan', 'Kowalski', 'Software Developer'),
(0, 'Tomasz', 'Nowak', 'Software Developer'),
(0, 'Julia', 'Nowacka', 'Business Analyst'),
(0, 'Mateusz', 'Kot', 'Full-Stack Developer');
    
INSERT INTO `tasks` VALUES
(0, 'Jan Kowalski Task 1', 1, 'Not started', 0),
(0, 'Jan Kowalski Task 2', 1, 'In progress', 65),
(0, 'Jan Kowalski Task 3', 1, 'Finished', 100),
(0, 'Tomasz Nowak Task 1', 2, 'Finished', 100),
(0, 'Tomasz Nowak Task 2', 2, 'Finished', 100),
(0, 'Tomasz Nowak Task 3', 2, 'Finished', 100),
(0, 'Julia Nowacka Task 1', 3, 'In progress', 55),
(0, 'Julia Nowacka Task 2', 3, 'Finished', 100),
(0, 'Julia Nowacka Task 3', 3, 'Finished', 100),
(0, 'Julia Nowacka Task 4', 3, 'In progress', 20);