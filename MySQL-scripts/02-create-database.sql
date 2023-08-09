DROP DATABASE IF EXISTS `taskmanager`;
CREATE DATABASE IF NOT EXISTS `taskmanager`;
USE `taskmanager`;

DROP TABLE IF EXISTS `staff_list`;
CREATE TABLE `staff_list` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL,
  `surname` varchar(64) NOT NULL,
  `position` varchar(64) NOT NULL,
  PRIMARY KEY (`id`)
) AUTO_INCREMENT=1;

DROP TABLE IF EXISTS `tasks`;
CREATE TABLE `tasks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(512) NOT NULL,
  `staff_member_id` int NOT NULL,
  `status` varchar(32) NOT NULL,
  `status_of_completion` int NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`staff_member_id`) REFERENCES staff_list(`id`)
) AUTO_INCREMENT=1;

INSERT INTO `staff_list` VALUES
(0, 'Jan', 'Kowalski', 'Programista'),
(0, 'Tomasz', 'Nowak', 'Programista'),
(0, 'Julia', 'Nowacka', 'Analityk biznesowy'),
(0, 'Tomek', 'Kot', 'Informatyk'),
(0, 'Adam', 'Drzewo', 'Informatyk'),
(0, 'Alicja', 'Biała', 'Informatyk'),
(0, 'Wiktor', 'Krzesło', 'Informatyk');
    
INSERT INTO `tasks` VALUES
(0, 'Jan Kowalski Zadanie 1', 1, 'Nie rozpoczęte', 0),
(0, 'Jan Kowalski Zadanie 2', 1, 'W realizacji', 65),
(0, 'Jan Kowalski Zadanie 3', 1, 'Zakończone', 100),
(0, 'Tomasz Nowak Zadanie 1', 2, 'Zakończone', 100),
(0, 'Tomasz Nowak Zadanie 2', 2, 'Zakończone', 100),
(0, 'Tomasz Nowak Zadanie 3', 2, 'Zakończone', 100),
(0, 'Julia Nowacka Zadanie 1', 3, 'W realizacji', 55),
(0, 'Julia Nowacka Zadanie 1', 3, 'Zakończone', 100),
(0, 'Julia Nowacka Zadanie 1', 3, 'Zakończone', 100),
(0, 'Julia Nowacka Zadanie 1', 3, 'W realizacji', 20);