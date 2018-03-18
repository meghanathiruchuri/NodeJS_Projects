CREATE DATABASE nodemysql;
USE nodemysql;
CREATE TABLE `code_capture` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `url_scanned` varchar(300) DEFAULT NULL,
 `code_snippet` varchar(1000) DEFAULT NULL,
 `last_updated_dt` datetime DEFAULT NULL,
 PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=latin1;