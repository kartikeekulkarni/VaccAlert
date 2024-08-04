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
  `state` int DEFAULT NULL,
  `district` int DEFAULT NULL,
  `city` int DEFAULT NULL,
  `pincode` int DEFAULT NULL,
  PRIMARY KEY (`adid`),
  KEY `statefk_idx` (`state`),
  KEY `districtfk_idx` (`district`),
  KEY `cityfk_idx` (`city`),
  CONSTRAINT `cityfk` FOREIGN KEY (`city`) REFERENCES `cities` (`cityid`),
  CONSTRAINT `districtfk` FOREIGN KEY (`district`) REFERENCES `districts` (`did`),
  CONSTRAINT `statefk` FOREIGN KEY (`state`) REFERENCES `states` (`sid`)
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
  CONSTRAINT `cfkey` FOREIGN KEY (`cid`) REFERENCES `child` (`cid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `hfkey` FOREIGN KEY (`hid`) REFERENCES `hospital` (`hid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pfkey` FOREIGN KEY (`pid`) REFERENCES `parent` (`pid`) ON DELETE CASCADE ON UPDATE CASCADE
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
  CONSTRAINT `pidfkey` FOREIGN KEY (`pid`) REFERENCES `parent` (`pid`) ON DELETE CASCADE ON UPDATE CASCADE
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
-- Table structure for table `cities`
--

DROP TABLE IF EXISTS `cities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cities` (
  `cityid` int NOT NULL AUTO_INCREMENT,
  `cityname` varchar(255) DEFAULT NULL,
  `did` int DEFAULT NULL,
  PRIMARY KEY (`cityid`),
  KEY `districtfkey_idx` (`did`),
  CONSTRAINT `districtfkey` FOREIGN KEY (`did`) REFERENCES `districts` (`did`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cities`
--

LOCK TABLES `cities` WRITE;
/*!40000 ALTER TABLE `cities` DISABLE KEYS */;
INSERT INTO `cities` VALUES (1,'Pune',26),(2,'Pimpri-Chinchwad',26),(3,'Saswad',26),(4,'Baramati',26),(5,'Lonavala',26),(6,'Talegaon Dabhade',26),(7,'Junnar',26),(8,'Shirur',26),(9,'Indapur',26),(10,'Alandi',26),(11,'Bhor',26),(12,'Rajgurunagar (Khed)',26),(13,'Manchar',26),(14,'Daund',26),(15,'Chakan',26),(16,'Dehu',26),(17,'Dehuroad',26),(18,'Vadgaon',26),(19,'Wai',26),(20,'Mulshi',26),(21,'Paud',26),(22,'Ranjangaon',26),(23,'Jejuri',26),(24,'Sangvi',26),(25,'Hinjawadi',26),(26,'Wakad',26),(27,'Baner',26),(28,'Aundh',26),(29,'Kothrud',26),(30,'Shivajinagar',26),(31,'Hadapsar',26),(32,'Kharadi',26),(33,'Magarpatta',26),(34,'Viman Nagar',26),(35,'Yerwada',26),(36,'Koregaon Park',26),(37,'Wanowrie',26),(38,'Bibwewadi',26),(39,'Pashan',26);
/*!40000 ALTER TABLE `cities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `districts`
--

DROP TABLE IF EXISTS `districts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `districts` (
  `did` int NOT NULL AUTO_INCREMENT,
  `dname` varchar(255) DEFAULT NULL,
  `sid` int DEFAULT NULL,
  PRIMARY KEY (`did`),
  KEY `statefkey_idx` (`sid`),
  CONSTRAINT `statefkey` FOREIGN KEY (`sid`) REFERENCES `states` (`sid`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `districts`
--

LOCK TABLES `districts` WRITE;
/*!40000 ALTER TABLE `districts` DISABLE KEYS */;
INSERT INTO `districts` VALUES (1,'Ahmednagar',14),(2,'Akola',14),(3,'Amravati',14),(4,'Aurangabad',14),(5,'Beed',14),(6,'Bhandara',14),(7,'Buldhana',14),(8,'Chandrapur',14),(9,'Dhule',14),(10,'Gadchiroli',14),(11,'Gondia',14),(12,'Hingoli',14),(13,'Jalgaon',14),(14,'Jalna',14),(15,'Kolhapur',14),(16,'Latur',14),(17,'Mumbai City',14),(18,'Mumbai Suburban',14),(19,'Nagpur',14),(20,'Nanded',14),(21,'Nandurbar',14),(22,'Nashik',14),(23,'Osmanabad',14),(24,'Palghar',14),(25,'Parbhani',14),(26,'Pune',14),(27,'Raigad',14),(28,'Ratnagiri',14),(29,'Sangli',14),(30,'Satara',14),(31,'Sindhudurg',14),(32,'Solapur',14),(33,'Thane',14),(34,'Wardha',14),(35,'Washim',14),(36,'Yavatmal',14);
/*!40000 ALTER TABLE `districts` ENABLE KEYS */;
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
  `status` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`hid`),
  KEY `uid_idx` (`uid`),
  KEY `address_idx` (`hadress`),
  CONSTRAINT `haddress` FOREIGN KEY (`hadress`) REFERENCES `address` (`adid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `uidforeignkey` FOREIGN KEY (`uid`) REFERENCES `users` (`uid`)
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
  CONSTRAINT `address` FOREIGN KEY (`paddress`) REFERENCES `address` (`adid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `uid` FOREIGN KEY (`uid`) REFERENCES `users` (`uid`) ON DELETE CASCADE ON UPDATE CASCADE
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'admin'),(2,'hospital'),(3,'parent');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `states`
--

DROP TABLE IF EXISTS `states`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `states` (
  `sid` int NOT NULL AUTO_INCREMENT,
  `sname` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`sid`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `states`
--

LOCK TABLES `states` WRITE;
/*!40000 ALTER TABLE `states` DISABLE KEYS */;
INSERT INTO `states` VALUES (1,'Andhra Pradesh'),(2,'Arunachal Pradesh'),(3,'Assam'),(4,'Bihar'),(5,'Chhattisgarh'),(6,'Goa'),(7,'Gujarat'),(8,'Haryana'),(9,'Himachal Pradesh'),(10,'Jharkhand'),(11,'Karnataka'),(12,'Kerala'),(13,'Madhya Pradesh'),(14,'Maharashtra'),(15,'Manipur'),(16,'Meghalaya'),(17,'Mizoram'),(18,'Nagaland'),(19,'Odisha'),(20,'Punjab'),(21,'Rajasthan'),(22,'Sikkim'),(23,'Tamil Nadu'),(24,'Telangana'),(25,'Tripura'),(26,'Uttar Pradesh'),(27,'Uttarakhand'),(28,'West Bengal'),(29,'Andaman and Nicobar Islands'),(30,'Chandigarh'),(31,'Dadra and Nagar Haveli and Daman and Diu'),(32,'Lakshadweep'),(33,'Delhi'),(34,'Puducherry'),(35,'Ladakh'),(36,'Jammu and Kashmir');
/*!40000 ALTER TABLE `states` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `uid` int NOT NULL AUTO_INCREMENT,
  `uname` varchar(205) DEFAULT NULL,
  `password` varchar(200) DEFAULT NULL,
  `rid` int DEFAULT NULL,
  PRIMARY KEY (`uid`),
  KEY `rid_idx` (`rid`),
  CONSTRAINT `rid` FOREIGN KEY (`rid`) REFERENCES `role` (`rid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','admin@123',1),(2,'aniket','aniket@123',3),(3,'saihospital','hospital@123',2),(4,'siddheshwarhospital','hosPital@123',2),(5,'yash','qwerT@123',3);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
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
  CONSTRAINT `hospitalfkey` FOREIGN KEY (`hid`) REFERENCES `hospital` (`hid`) ON DELETE CASCADE ON UPDATE CASCADE,
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

-- Dump completed on 2024-08-04 11:38:56
