-- MySQL dump 10.13  Distrib 8.0.20, for Win64 (x86_64)
--
-- Host: localhost    Database: groupomania
-- ------------------------------------------------------
-- Server version	8.0.20

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` smallint unsigned NOT NULL AUTO_INCREMENT,
  `content` text NOT NULL,
  `MessageId` smallint NOT NULL,
  `UserId` smallint unsigned NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fkidmessage` (`MessageId`),
  KEY `fkidusers` (`UserId`),
  CONSTRAINT `fkidmessage` FOREIGN KEY (`MessageId`) REFERENCES `messages` (`id`),
  CONSTRAINT `fkidusers` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (4,'Oo c\'est génial !!',114,29,'2020-12-27 10:25:39','2020-12-27'),(6,'Essayons',111,29,'2020-12-27 15:14:30','2020-12-27'),(7,'test de modif',114,30,'2020-12-27 22:00:00','2020-12-27'),(21,'COol ça',122,33,'2021-01-01 12:45:03','2021-01-01'),(22,'Bienvenu',122,30,'2021-01-01 12:45:27','2021-01-01'),(23,'Il est trop Beau',123,33,'2021-01-01 12:46:57','2021-01-01');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messages` (
  `id` smallint NOT NULL AUTO_INCREMENT,
  `content` text NOT NULL,
  `attachment` varchar(120) DEFAULT NULL,
  `updatedAt` date NOT NULL,
  `UserId` smallint NOT NULL,
  `createdAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=124 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (111,'Bonjour à tous, Bienvenue sur notre super réseau social','http://localhost:3000/images/téléchargement_(2).jpg1609063934132.jpg','2020-12-27',29,'2020-12-23 08:12:55'),(114,'Super contente d\'avoir un si bel outil pour échanger !!',NULL,'2020-12-23',30,'2020-12-23 08:47:17'),(122,'Bonjourt tout le monde',NULL,'2021-01-01',33,'2021-01-01 12:44:56'),(123,'Suis trop content','http://localhost:3000/images/petitchat.jpg1609505206855.jpg','2021-01-01',33,'2021-01-01 12:46:46');
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sequelizemeta`
--

DROP TABLE IF EXISTS `sequelizemeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sequelizemeta`
--

LOCK TABLES `sequelizemeta` WRITE;
/*!40000 ALTER TABLE `sequelizemeta` DISABLE KEYS */;
INSERT INTO `sequelizemeta` VALUES ('20200718043639-create-user.js'),('20200718043942-create-message.js'),('20201223150425-create-comments.js');
/*!40000 ALTER TABLE `sequelizemeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` smallint unsigned NOT NULL AUTO_INCREMENT,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `job` varchar(50) NOT NULL,
  `isAdmin` tinyint NOT NULL DEFAULT '0',
  `createdAt` date NOT NULL,
  `updatedAt` date NOT NULL,
  `attachment` varchar(120) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (29,'Jacques','Garcia','jg@groupomania.fr','$2b$10$AhrdhWO2zBLFQAsMRsXvJOYMVWbRXiX3bCQMPG9nfr2zEk69Way/e','Administrateur',1,'2020-12-23','2020-12-23','http://localhost:3000/images/téléchargement.jpg1608711202779.jpg'),(30,'Marjorie','Thibaudeau','mt@groupomania.fr','$2b$10$0FUlkjcUOy/qFl0vUiz6UOq6wuz1yzq0HA35el3LnKFdl8y0lNftG','Gestionnaire',0,'2020-12-23','2020-12-23','http://localhost:3000/images/Phenomene-LE-RETOUR-DES-WONDER-WOMEN.jpg1608713251310.jpg'),(33,'Noah','Garcia','ng@groupomania.fr','$2b$10$/3LPLdrF9ErJBJYU5TEH6.UTlEOKRFfzBX7eykaijh8zUYp6txf0m','Dev',0,'2020-12-30','2020-12-30','http://localhost:3000/images/thanos-bebe-marvel.jpg1609336596499.jpg');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-01-01 14:55:47
