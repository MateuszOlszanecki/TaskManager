DROP USER if exists 'taskmanager'@'%';

CREATE USER 'taskmanager'@'%' IDENTIFIED BY 'taskmanager';

GRANT ALL PRIVILEGES ON * . * TO 'taskmanager'@'%';