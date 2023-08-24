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
  `progress` int NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`staff_member_id`) REFERENCES staff_list(`id`)
);

INSERT INTO `staff_list` VALUES
(1, 'John', 'Wilson', 'Software Developer'),
(2, 'Tom', 'Brown', 'Software Developer'),
(3, 'Jennifer', 'Taylor', 'Business Analyst'),
(4, 'Emma', 'Davies', 'Full-Stack Developer');
    
INSERT INTO `tasks` VALUES
(1, 'Task 1', 1, 0),
(2, 'Task 2', 1, 65),
(3, 'Task 3', 1, 100),
(4, 'Task 4', 2, 100),
(5, 'Task 5', 2, 100),
(6, 'Task 6', 2, 100),
(7, 'Task 7', 3, 55),
(8, 'Task 8', 3, 100),
(9, 'Task 9', 3, 100),
(10, 'Task 10', 3, 0);