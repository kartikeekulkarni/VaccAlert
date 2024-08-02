-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: vaccalert
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `address`
--

DROP TABLE IF EXISTS `address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `address` (
  `adid` int NOT NULL AUTO_INCREMENT,
  `state` varchar(100) DEFAULT NULL,
  `district` varchar(205) DEFAULT NULL,
  `city` varchar(205) DEFAULT NULL,
  `pincode` int DEFAULT NULL,
  PRIMARY KEY (`adid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `address`
--

LOCK TABLES `address` WRITE;
/*!40000 ALTER TABLE `address` DISABLE KEYS */;
/*!40000 ALTER TABLE `address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `booking`
--

DROP TABLE IF EXISTS `booking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `booking` (
  `bkid` int NOT NULL AUTO_INCREMENT,
  `bk_date` date DEFAULT NULL,
  `apt_date` date DEFAULT NULL,
  `hid` int DEFAULT NULL,
  `pid` int DEFAULT NULL,
  `cid` int DEFAULT NULL,
  `vid` int DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`bkid`),
  KEY `hfkey_idx` (`hid`),
  KEY `pfkey_idx` (`pid`),
  KEY `cfkey_idx` (`cid`),
  CONSTRAINT `cfkey` FOREIGN KEY (`cid`) REFERENCES `child` (`cid`),
  CONSTRAINT `hfkey` FOREIGN KEY (`hid`) REFERENCES `hospital` (`hid`),
  CONSTRAINT `pfkey` FOREIGN KEY (`pid`) REFERENCES `parent` (`pid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `booking`
--

LOCK TABLES `booking` WRITE;
/*!40000 ALTER TABLE `booking` DISABLE KEYS */;
/*!40000 ALTER TABLE `booking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `child`
--

DROP TABLE IF EXISTS `child`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `child` (
  `cid` int NOT NULL AUTO_INCREMENT,
  `pid` int DEFAULT NULL,
  `cname` varchar(205) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `gender` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`cid`),
  KEY `pidfkey_idx` (`pid`),
  CONSTRAINT `pidfkey` FOREIGN KEY (`pid`) REFERENCES `parent` (`pid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `child`
--

LOCK TABLES `child` WRITE;
/*!40000 ALTER TABLE `child` DISABLE KEYS */;
/*!40000 ALTER TABLE `child` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hospital`
--

DROP TABLE IF EXISTS `hospital`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hospital` (
  `hid` int NOT NULL AUTO_INCREMENT,
  `uid` int DEFAULT NULL,
  `hname` varchar(205) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `url` varchar(100) DEFAULT NULL,
  `hadress` int DEFAULT NULL,
  `contact` varchar(15) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`hid`),
  KEY `uid_idx` (`uid`),
  KEY `address_idx` (`hadress`),
  CONSTRAINT `haddress` FOREIGN KEY (`hadress`) REFERENCES `address` (`adid`),
  CONSTRAINT `uidforeignkey` FOREIGN KEY (`uid`) REFERENCES `user` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hospital`
--

LOCK TABLES `hospital` WRITE;
/*!40000 ALTER TABLE `hospital` DISABLE KEYS */;
/*!40000 ALTER TABLE `hospital` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parent`
--

DROP TABLE IF EXISTS `parent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `parent` (
  `pid` int NOT NULL AUTO_INCREMENT,
  `uid` int DEFAULT NULL,
  `fname` varchar(205) DEFAULT NULL,
  `lname` varchar(205) DEFAULT NULL,
  `contact` varchar(205) DEFAULT NULL,
  `email` varchar(205) DEFAULT NULL,
  `paddress` int DEFAULT NULL,
  PRIMARY KEY (`pid`),
  KEY `uid_idx` (`uid`),
  KEY `address_idx` (`paddress`),
  CONSTRAINT `address` FOREIGN KEY (`paddress`) REFERENCES `address` (`adid`),
  CONSTRAINT `uid` FOREIGN KEY (`uid`) REFERENCES `user` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parent`
--

LOCK TABLES `parent` WRITE;
/*!40000 ALTER TABLE `parent` DISABLE KEYS */;
/*!40000 ALTER TABLE `parent` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `rid` int NOT NULL AUTO_INCREMENT,
  `rname` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`rid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `uid` int NOT NULL AUTO_INCREMENT,
  `uname` varchar(205) DEFAULT NULL,
  `password` varchar(200) DEFAULT NULL,
  `rid` int DEFAULT NULL,
  PRIMARY KEY (`uid`),
  KEY `rid_idx` (`rid`),
  CONSTRAINT `rid` FOREIGN KEY (`rid`) REFERENCES `role` (`rid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vaccine`
--

DROP TABLE IF EXISTS `vaccine`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vaccine` (
  `vid` int NOT NULL AUTO_INCREMENT,
  `vaccine_name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `dose` varchar(255) DEFAULT NULL,
  `route` varchar(255) DEFAULT NULL,
  `site` varchar(255) DEFAULT NULL,
  `whentogive` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`vid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vaccine`
--

LOCK TABLES `vaccine` WRITE;
/*!40000 ALTER TABLE `vaccine` DISABLE KEYS */;
/*!40000 ALTER TABLE `vaccine` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vaccine_stock`
--

DROP TABLE IF EXISTS `vaccine_stock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vaccine_stock` (
  `vsid` int NOT NULL AUTO_INCREMENT,
  `hid` int DEFAULT NULL,
  `vid` int DEFAULT NULL,
  `stock` int DEFAULT NULL,
  PRIMARY KEY (`vsid`),
  KEY `hfkey_idx` (`hid`),
  KEY `vfkey_idx` (`vid`),
  CONSTRAINT `hospitalfkey` FOREIGN KEY (`hid`) REFERENCES `hospital` (`hid`),
  CONSTRAINT `vaccinefkey` FOREIGN KEY (`vid`) REFERENCES `vaccine` (`vid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vaccine_stock`
--

LOCK TABLES `vaccine_stock` WRITE;
/*!40000 ALTER TABLE `vaccine_stock` DISABLE KEYS */;
/*!40000 ALTER TABLE `vaccine_stock` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-03  0:00:33
