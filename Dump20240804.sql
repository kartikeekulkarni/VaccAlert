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
  `area` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`adid`),
  KEY `statefk_idx` (`state`),
  KEY `districtfk_idx` (`district`),
  KEY `cityfk_idx` (`city`),
  CONSTRAINT `cityfk` FOREIGN KEY (`city`) REFERENCES `cities` (`cityid`),
  CONSTRAINT `districtfk` FOREIGN KEY (`district`) REFERENCES `districts` (`did`),
  CONSTRAINT `statefk` FOREIGN KEY (`state`) REFERENCES `states` (`sid`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `address`
--

LOCK TABLES `address` WRITE;
/*!40000 ALTER TABLE `address` DISABLE KEYS */;
INSERT INTO `address` VALUES (1,14,26,15,425400,NULL),(2,14,26,19,120036,NULL),(3,14,26,22,450036,NULL),(4,14,26,15,425400,NULL),(8,14,26,15,425400,NULL),(9,14,26,15,254654,NULL),(10,14,26,14,425406,NULL),(11,14,26,17,425406,NULL),(12,14,26,14,5458,NULL),(13,14,26,22,450036,NULL),(14,14,26,3,888888,NULL),(15,14,26,15,444444,NULL),(16,14,26,17,425406,NULL),(17,14,26,14,5441245,NULL),(18,14,26,12,888888,NULL),(19,14,26,17,222222,NULL),(20,14,26,19,111111,NULL),(21,14,26,19,111111,NULL),(22,14,26,17,222222,NULL),(23,14,26,17,222222,NULL),(24,14,26,19,111111,NULL),(25,14,26,16,333333,NULL),(26,14,26,18,777777,NULL),(27,14,26,18,777777,NULL),(28,14,26,18,777777,NULL),(29,14,26,16,425406,NULL),(30,14,26,18,88888,NULL),(31,14,26,4,555555,'Rase fata'),(32,14,26,2,777777,'spine road'),(33,14,26,2,444444,'nashik fhata'),(34,14,26,15,777777,'nrs kjskjgjkjj'),(35,14,26,15,777777,'bnnnnnnnnn'),(36,14,26,14,888888,'aaaaaaaaaaaaa'),(37,14,26,12,431517,'Tempor debitis natus');
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
  `status` varchar(255) DEFAULT 'Pending',
  PRIMARY KEY (`bkid`),
  KEY `hfkey_idx` (`hid`),
  KEY `pfkey_idx` (`pid`),
  KEY `cfkey_idx` (`cid`),
  KEY `vaccinefkey_idx` (`vid`),
  KEY `vaccfkey_idx` (`vid`) /*!80000 INVISIBLE */,
  CONSTRAINT `cfkey` FOREIGN KEY (`cid`) REFERENCES `child` (`cid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `hfkey` FOREIGN KEY (`hid`) REFERENCES `hospital` (`hid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pfkey` FOREIGN KEY (`pid`) REFERENCES `parent` (`pid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `vaccfkey` FOREIGN KEY (`vid`) REFERENCES `vaccine` (`vid`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `booking`
--

LOCK TABLES `booking` WRITE;
/*!40000 ALTER TABLE `booking` DISABLE KEYS */;
INSERT INTO `booking` VALUES (1,'2024-07-01','2024-07-05',1,1,1,1,'Confirmed'),(2,'2024-07-02','2024-07-07',2,2,2,2,'Confirmed'),(3,'2024-07-03','2024-07-10',3,3,3,3,'Pending'),(4,'2024-07-04','2024-07-12',4,4,4,4,'Cancelled'),(5,'2024-07-05','2024-07-15',5,5,5,5,'Pending'),(6,'2024-07-06','2024-07-18',1,1,6,6,'Confirmed'),(7,'2024-07-07','2024-07-20',2,2,7,7,'Confirmed'),(8,'2024-07-08','2024-07-22',3,3,8,8,'Confirmed'),(9,'2024-07-09','2024-07-25',4,4,9,9,'Pending'),(10,'2024-07-10','2024-07-28',5,5,10,10,'Cancelled');
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
  `cname` varchar(255) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `blood_group` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`cid`),
  KEY `pidfkey_idx` (`pid`),
  CONSTRAINT `pidfkey` FOREIGN KEY (`pid`) REFERENCES `parent` (`pid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `child`
--

LOCK TABLES `child` WRITE;
/*!40000 ALTER TABLE `child` DISABLE KEYS */;
INSERT INTO `child` VALUES (1,1,'Aarav Kumar','2020-03-15','Male','A+'),(2,2,'Anaya Sharma','2019-11-22','Female','O+'),(3,3,'Vihaan Singh','2018-07-30','Male','B+'),(4,4,'Aditi Patel','2021-05-10','Female','AB-'),(5,5,'Aryan Joshi','2017-01-12','Male','A-'),(6,1,'Ishika Kumar','2022-08-18','Female','O+'),(7,2,'Vivaan Sharma','2016-02-05','Male','B+'),(8,3,'Aanya Singh','2018-12-19','Female','A+'),(9,4,'Kavya Patel','2021-04-25','Female','AB+'),(10,5,'Arjun Joshi','2019-09-07','Male','O-');
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
  `hname` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `hadress` int DEFAULT NULL,
  `contact` varchar(255) DEFAULT NULL,
  `status` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`hid`),
  KEY `uid_idx` (`uid`),
  KEY `address_idx` (`hadress`),
  CONSTRAINT `haddress` FOREIGN KEY (`hadress`) REFERENCES `address` (`adid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `uidforeignkey` FOREIGN KEY (`uid`) REFERENCES `users` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hospital`
--

LOCK TABLES `hospital` WRITE;
/*!40000 ALTER TABLE `hospital` DISABLE KEYS */;
INSERT INTO `hospital` VALUES (1,7,'JaiHind Hospital','jaihindhospital@gmail.com','http://jaihindhospital.com',2,'1234567890',1),(2,8,'Sankalp Hospital','sankalphospital@gmail.com','http://sankalphospital.com',3,'9234567890',0),(3,20,'Sample Hospital','Sample@gmail.com','http://sankalphospital.com',13,'9234567890',0),(4,21,'Eknath Hospital','eknath@gmail.com','http//jkhhbbjjkhr',14,'4874548854',0),(5,22,'Patil Hospital','rrrrrr@gmail.com','ghjklhgyukm',15,'4874548854',0),(6,23,'Eknath Hospital','ghfhj@gmail.com','Madhala wada',16,'8358983878',0),(7,25,'fffff','ffff@gmail.com','irejfkds',18,'4874548854',0),(8,26,'yyyyyyyyyyyy','hhhhhhh@gmail.com','djskhhhhhhhh',19,'4874548854',0),(9,27,'Patil Hospital','uuh@gmail.com','gdhshdbhj',20,'1500000000',0),(10,28,'Patil Hospital','uh@gmail.com','gdhshdbhj',21,'1500000000',0),(11,29,'yyyyyyyyyyyy','hhhhhh@gmail.com','djskhhh',22,'4874548854',0),(12,30,'yyyyyyyyyyyy','hhhhh@gmail.com','djskhhh',23,'4874548854',0),(13,31,'Patil Hospital','uht@gmail.com','gdhshdbhj',24,'1500000000',0),(14,32,'dgfdhjs','jhjk@gmail.com','uuhejk',25,'8358983878',0),(15,39,'qqqqqqq','qqqqq@gmail.com','eeeeeeeeee',32,'8358983878',0),(16,41,'wwwwwwwwwww','kerjkl@gmail.com','hgdjkkljkl',34,'4877454444',0),(17,42,'ghjjjjjjj','gdgjhjh@gmail.com','jkjjjjjjjjjj',35,'4874548854',0),(18,43,'vaccalertTrigger','fghj@gmail.com','httpjcccc',36,'4874548854',1);
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
  `fname` varchar(255) DEFAULT NULL,
  `lname` varchar(255) DEFAULT NULL,
  `contact` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `paddress` int DEFAULT NULL,
  PRIMARY KEY (`pid`),
  KEY `uid_idx` (`uid`),
  KEY `address_idx` (`paddress`),
  CONSTRAINT `address` FOREIGN KEY (`paddress`) REFERENCES `address` (`adid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `uid` FOREIGN KEY (`uid`) REFERENCES `users` (`uid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parent`
--

LOCK TABLES `parent` WRITE;
/*!40000 ALTER TABLE `parent` DISABLE KEYS */;
INSERT INTO `parent` VALUES (1,6,'Shubham','Patil','7588734855','shubham@gmail.com',1),(2,9,'Sample','Sample','7588734855','shuam@gmail.com',4),(3,13,'Sample','Sample','9881423412','sam@gmail.com',8),(4,14,'as','AS','8746767874','as@gmail.com',9),(5,15,'QW','QW','123','yashdpatil2001@gmail.com',10),(6,16,'chaman','chaman','8746767874','chaman@gmail.com',11),(7,17,'abc','abc','1234678','abc@gmail.com',12),(8,19,NULL,NULL,'9234567890','sankalphospital@gmail.com',NULL),(9,24,'rrrrrrrr','rrrrrrrrrr','5857431541','jjhdujh@gmail.com',17),(10,33,'rrrrrrrr','rrrrrrrrr','9881426724','rrrrrrrr@gmail.com',26),(11,34,'rrrrrrrr','rrrrrrrrr','9881426724','rrrrrrr@gmail.com',27),(12,35,'rrrrrrrr','rrrrrrrrr','9881426724','rrrrrr@gmail.com',28),(13,36,'Yashkumar','Patil','8888888888','yasdpatil2001@gmail.com',29),(14,37,'vbn','vbnn','7895555578','fghj@gmail.com',30),(15,38,'Sachin','Patil','77777777','sachin@gmail.com',31),(16,40,'eeeeeeee','eeeeeeeee','2222222222','eeeeeeeee@gmail.com',33),(17,44,'Clark','Reed','8888888888','lusozilin@mailinator.com',37);
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
  `rname` varchar(255) DEFAULT NULL,
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
  `sname` varchar(255) DEFAULT NULL,
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
  `uname` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `rid` int DEFAULT NULL,
  PRIMARY KEY (`uid`),
  UNIQUE KEY `uname_UNIQUE` (`uname`),
  KEY `rid_idx` (`rid`),
  CONSTRAINT `rid` FOREIGN KEY (`rid`) REFERENCES `role` (`rid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','Admin@123',1),(2,'aniket','aniket@123',3),(3,'saihospital','hospital@123',2),(4,'siddheshwarhospital','hosPital@123',2),(5,'yash','qwerT@123',3),(6,'shubham','$2a$11$x.OsGvwB8iF6tfOJlSixwOqVVhcULkfIYIGM5MvaEkTlOHum60yjy',3),(7,'jaihind','$2a$11$Ir/fW1rQHARTVRtwMl2EeuuN3FBCZQbkVMm0/i0DNewPm.8qt6nw6',2),(8,'sankalp','$2a$11$gKK6y527dXr0Rffjh5Q6Zu6BJSqikzDukBGLESL28Ld.PXkgf05we',2),(9,'sample','$2a$11$U5Kt2aUCDTs5DaNxE7Xz1uXrlnka7KWlbYKDstyzqANxppC4kIcBS',3),(13,'test','$2a$11$GkzvK3F4Iz5Gtuzx3H5DD.aqY7z/.FTKYA2uhQYABlWLBfaTSvtuW',3),(14,'as@gmail.com','$2a$11$8XyS.LIdaHQgnS5JAmuaM.C5Rf91rZobeJVGV9Dr6oSR/oKhwfkVi',3),(15,'ASD@GMIAL.COM','$2a$11$L3ryyLtSCYkJfNosksn4UOPKD806EmPIgBkt/s4s20mULFP6vyfr2',NULL),(16,'chamanc','$2a$11$wGJ62C0Be2rVfru3NIYfEehqSEYLTEyr1mtikhKyBmvQRChHjuSGu',3),(17,'abc','$2a$11$SljIjOXxkDxEBsdJaDalOu/KW19vIe8s564UHLlBnVTsUmuk0uJyC',3),(19,'pqr','$2a$11$b/xADhCAps7NyFcsElkcDOxvsgbSeoYSZGY8UX.Fqo.nZCzTy/ZyC',2),(20,'qwert','$2a$11$hQZTXDS52b12S82kQEuLq.mFLunruH5XGCadNvgm8G10hw.2Z56.2',2),(21,'eknath','$2a$11$QUqPIoXXP.PnwJXQ5uiAaer1kCJhVQSCBrcPwB0wyvkjNvIvN2rr2',2),(22,'patil','$2a$11$gCU4AxFb.7XyPgLW00Q5De88qjPr6h8YMhqUise3j36gWOXbPSnKO',2),(23,'aaaa','$2a$11$1O1766Av7KLGldO6Kn5yUucsvYTVD6wxgPBygpGSGhP6f4Xu6kw.u',2),(24,'jgjnn','$2a$11$rA289EA7WIkDKrQaOMd9TOU6okHvQSImJpTRZuIVuLmV/GMQD3tuS',3),(25,'qwerty','$2a$11$xSonH2JtHiy/DF3iXtMpE.BWUqh628Cs7OJv03F70wHskrSbIeKRq',2),(26,'sss','$2a$11$/dToV1oS/OGor0qIO5UMe.6gGRRFNHuI0VDGPXlm6jQtAN0dvZyA.',2),(27,'rrrrrrrrr','$2a$11$aaTYs9YpBjuvx9luxRBI5OsfwApt8EwJh4G1LSaMCUFEz7bBI0LMC',2),(28,'rrrrrrr','$2a$11$9xnEu.j.BFUy5SYOn34.lukd9ESmGqKD32FXRB5/4aRHjsckq/X26',2),(29,'eeee','$2a$11$dQ8CugHVG38K7JsRjQ8tpe9GVISKpqsnk4lWRToq7Tee8zGqB43t.',2),(30,'eteee','$2a$11$Iji4/P0fQTYgthuhy0Uo8eLRl6tz.OU24xS6yM8KxKnMkkRxgpGka',2),(31,'rrrrrr','$2a$11$paIntcHzvlBz1D/47eXrYuUvpQ3dD1lqKCfgh9HPp9OkOuwGd0pZq',2),(32,'ttttt','$2a$11$emk9.100d9jPGejrq9WJpef/VjsBYIcIPsaKstcs10TMp2DFE1lIa',2),(33,'yashpatil','$2a$11$RUAcfsLCh/R.eDzFtJjSNO6RQICjG1IPoY3snQydLBb2aWK6i479i',3),(34,'yashpati','$2a$11$nvM6URvZlCHnaBd/yAwEAO1ArJeNcqADRkVGZBYvRcjncWpNapYdm',3),(35,'yashpai','$2a$11$kuX8TQPR6AiFz.SrlaktTO3Fs9OxBPjJaaUSuYOYxEaYNU8V2pENS',3),(36,'anike','$2a$11$N8qaQDwv35U6BAjkFS.qHekgGQbA9U8f3GhL6JOgpYbu5yV9Pn6ym',3),(37,'tushar','$2a$11$ucFLEygxZjhewkq2mvzWXeOwJ8oXzE508Mpm7mf3F59zGh1XUrK7S',3),(38,'sachin','$2a$11$pD4yuGMI3O0fHSFjRMF9YOLNmB77frVOP7NbLxEeV2qkm/5z4PnAK',3),(39,'ggggg','$2a$11$zDRx4L6r5gQWoL7dHa0tFuv8wwYN33PZUde1KreBhflTcQ78Q4ZtO',2),(40,'tusharr','$2a$11$B7G5OhFyPxDclHbTtED7DOzrkRzSoBDmdX13arrQzfhQIO3F8guje',3),(41,'uiuu','$2a$11$O5d1OvRHtWudmleG2IA3euZk9P0qgxzBbk8TNnlqQIxe75hzfusye',2),(42,'qwerte','$2a$11$hb5eN2fmdxhBA7oXahZjI.dYy25VjwPJm7xOV1N9.j32DqU5BnvMe',2),(43,'trigger','$2a$11$8iwKigXS6NgGjLjFjgD3huksLjqPLSSAM.U92ekjdjCWovBH8Pfh6',2),(44,'abcd','$2a$11$5lcskKF5RGhp97FkzbZlAOmftVxiNB/qrWexdZc8WnbhnXCOZ2qW.',3);
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
  `weeks` int DEFAULT NULL,
  PRIMARY KEY (`vid`)
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vaccine`
--

LOCK TABLES `vaccine` WRITE;
/*!40000 ALTER TABLE `vaccine` DISABLE KEYS */;
INSERT INTO `vaccine` VALUES (1,'BCG','Bacillus Calmette-Guérin vaccine for tuberculosis. Given immediately after birth.','0.05 ml','Intradermal','Left upper arm','At birth',0),(2,'Hepatitis B','Hepatitis B vaccine to prevent Hepatitis B infection. Given immediately after birth.','0.5 ml','Intramuscular','Thigh','At birth',0),(3,'OPV','Oral Polio Vaccine for poliovirus. Given immediately after birth.','2 drops','Oral','Mouth','At birth',0),(4,'DTP','Diphtheria, Tetanus, and Pertussis vaccine. Given at 6, 10, and 14 weeks after birth.','0.5 ml','Intramuscular','Thigh','At 6, 10, and 14 weeks of age',6),(5,'Hib','Haemophilus influenzae type B vaccine. Given at 6, 10, and 14 weeks after birth.','0.5 ml','Intramuscular','Thigh','At 6, 10, and 14 weeks of age',6),(6,'Rotavirus','Vaccine to prevent rotavirus infections. Given at 6, 10, and 14 weeks after birth.','1.5 ml','Oral','Mouth','At 6, 10, and 14 weeks of age',6),(7,'Pneumococcal','Vaccine to prevent pneumococcal diseases. Given at 6, 10, and 14 weeks after birth.','0.5 ml','Intramuscular','Thigh','At 6, 10, and 14 weeks of age',6),(8,'Hepatitis B (2nd dose)','Second dose of Hepatitis B vaccine. Given at 6 weeks after birth.','0.5 ml','Intramuscular','Thigh','At 6 weeks of age',6),(9,'DTP (2nd dose)','Diphtheria, Tetanus, and Pertussis vaccine. Given at 6, 10, and 14 weeks after birth.','0.5 ml','Intramuscular','Thigh','At 6, 10, and 14 weeks of age',10),(10,'Hib (2nd dose)','Haemophilus influenzae type B vaccine. Given at 6, 10, and 14 weeks after birth.','0.5 ml','Intramuscular','Thigh','At 6, 10, and 14 weeks of age',10),(11,'Rotavirus (2nd dose)','Vaccine to prevent rotavirus infections. Given at 6, 10, and 14 weeks after birth.','1.5 ml','Oral','Mouth','At 6, 10, and 14 weeks of age',10),(12,'Pneumococcal (2nd dose)','Vaccine to prevent pneumococcal diseases. Given at 6, 10, and 14 weeks after birth.','0.5 ml','Intramuscular','Thigh','At 6, 10, and 14 weeks of age',10),(13,'DTP (3rd dose)','Diphtheria, Tetanus, and Pertussis vaccine. Given at 6, 10, and 14 weeks after birth.','0.5 ml','Intramuscular','Thigh','At 6, 10, and 14 weeks of age',14),(14,'Hib (3rd dose)','Haemophilus influenzae type B vaccine. Given at 6, 10, and 14 weeks after birth.','0.5 ml','Intramuscular','Thigh','At 6, 10, and 14 weeks of age',14),(15,'Rotavirus (3rd dose)','Vaccine to prevent rotavirus infections. Given at 6, 10, and 14 weeks after birth.','1.5 ml','Oral','Mouth','At 6, 10, and 14 weeks of age',14),(16,'Pneumococcal (3rd dose)','Vaccine to prevent pneumococcal diseases. Given at 6, 10, and 14 weeks after birth.','0.5 ml','Intramuscular','Thigh','At 6, 10, and 14 weeks of age',14),(17,'Measles','Vaccine to prevent measles. Given at 9 months of age.','0.5 ml','Subcutaneous','Right upper arm','At 9 months of age',36),(18,'OPV (Booster)','Booster dose of Oral Polio Vaccine. Given at 9 months of age.','2 drops','Oral','Mouth','At 9 months of age',36),(19,'MMR','Measles, Mumps, and Rubella vaccine. Given at 15 months of age.','0.5 ml','Subcutaneous','Right upper arm','At 15 months of age',60),(20,'Varicella','Vaccine to prevent chickenpox. Given at 15 months of age.','0.5 ml','Subcutaneous','Right upper arm','At 15 months of age',60),(21,'Hepatitis A','Vaccine to prevent Hepatitis A infection. Given at 12 months of age.','0.5 ml','Intramuscular','Thigh','At 12 months of age',48),(22,'DTP (Booster)','Booster dose of Diphtheria, Tetanus, and Pertussis vaccine. Given at 18 months of age.','0.5 ml','Intramuscular','Thigh','At 18 months of age',72),(23,'Hib (Booster)','Booster dose of Haemophilus influenzae type B vaccine. Given at 18 months of age.','0.5 ml','Intramuscular','Thigh','At 18 months of age',72),(24,'OPV (Booster)','Booster dose of Oral Polio Vaccine. Given at 18 months of age.','2 drops','Oral','Mouth','At 18 months of age',72),(25,'Pneumococcal (Booster)','Booster dose of Pneumococcal vaccine. Given at 18 months of age.','0.5 ml','Intramuscular','Thigh','At 18 months of age',72),(26,'DTP (2nd Booster)','Second booster dose of Diphtheria, Tetanus, and Pertussis vaccine. Given between 4 and 6 years of age.','0.5 ml','Intramuscular','Thigh','Between 4 and 6 years of age',208),(27,'MMR (2nd Dose)','Second dose of Measles, Mumps, and Rubella vaccine. Given between 4 and 6 years of age.','0.5 ml','Subcutaneous','Right upper arm','Between 4 and 6 years of age',208),(28,'Varicella (2nd Dose)','Second dose of Varicella vaccine. Given between 4 and 6 years of age.','0.5 ml','Subcutaneous','Right upper arm','Between 4 and 6 years of age',208);
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
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vaccine_stock`
--

LOCK TABLES `vaccine_stock` WRITE;
/*!40000 ALTER TABLE `vaccine_stock` DISABLE KEYS */;
INSERT INTO `vaccine_stock` VALUES (1,1,1,150),(2,1,2,200),(3,2,3,50),(4,2,4,100),(5,3,5,300),(6,3,6,80),(7,4,7,120),(8,4,8,180),(9,5,9,90),(10,5,10,160),(11,18,1,55),(12,18,2,70),(13,18,3,0),(14,18,4,0),(15,18,5,0),(16,18,6,15),(17,18,7,0),(18,18,8,0),(19,18,9,0),(20,18,10,0),(21,18,11,0),(22,18,12,0),(23,18,13,0),(24,18,14,0),(25,18,15,0),(26,18,16,0),(27,18,17,0),(28,18,18,0),(29,18,19,0),(30,18,20,0),(31,18,21,0),(32,18,22,0),(33,18,23,8),(34,18,24,0),(35,18,25,0),(36,18,26,0),(37,18,27,0),(38,18,28,0);
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

-- Dump completed on 2024-08-14 12:30:07
