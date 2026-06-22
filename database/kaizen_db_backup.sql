-- MySQL dump 10.13  Distrib 5.7.44, for Linux (x86_64)
--
-- Host: localhost    Database: kaizenophtha_db
-- ------------------------------------------------------
-- Server version	5.7.44

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `calendar_events`
--

DROP TABLE IF EXISTS `calendar_events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `calendar_events` (
  `id` varchar(255) NOT NULL,
  `title` varchar(50) NOT NULL,
  `allDay` tinyint(1) NOT NULL,
  `start` varchar(255) NOT NULL,
  `end` varchar(255) NOT NULL,
  `extendedProps` json DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `calendar_events`
--

LOCK TABLES `calendar_events` WRITE;
/*!40000 ALTER TABLE `calendar_events` DISABLE KEYS */;
INSERT INTO `calendar_events` VALUES ('0b3ce9c5-df63-4ee7-a099-1d2d7ed6bdcf','visita cliente',1,'2024-10-04T05:00:00.000Z','2024-10-04T05:00:00.000Z','{\"desc\": \"visita cliente\", \"label\": 1, \"component\": {\"id\": 16, \"type\": \"visits\", \"route\": \"/apps/visits/16\"}}','2024-10-03 17:19:00','2024-10-03 17:19:00',NULL),('17c9e149-db6f-4f4f-b994-8af24f703fa1','Visita # 2',1,'2024-04-24T15:00:00.000Z','2024-04-24T15:00:00.000Z','{\"desc\": \"Visita # 2\", \"label\": 1, \"component\": {\"id\": 5, \"type\": \"visits\", \"route\": \"/apps/visits/5\"}}','2024-05-20 15:08:53','2024-05-20 15:08:53',NULL),('20730bf8-b710-4201-a4db-a25813c98097','Prueba',1,'2026-03-13T05:00:00.000Z','2026-03-13T05:00:00.000Z','{\"desc\": \"Prueba\", \"label\": 1, \"component\": {\"id\": 18, \"type\": \"visits\", \"route\": \"/apps/visits/18\"}}','2026-03-12 13:55:32','2026-03-12 13:55:32',NULL),('25930d06-f336-4a9c-bec3-2d1633bede76','Prueba',1,'2024-05-20T15:00:00.000Z','2024-05-20T15:00:00.000Z','{\"desc\": \"Prueba\", \"label\": 1, \"component\": {\"id\": 7, \"type\": \"visits\", \"route\": \"/apps/visits/7\"}}','2024-05-20 15:10:24','2024-05-20 15:10:24',NULL),('3332e54d-ac32-4181-b70f-6dd01b928db2','Plan de trabajo',1,'2024-10-04T12:30:00.000Z','2024-10-04T23:00:00.000Z','{\"desc\": \"Plan de trabajo\", \"label\": 2, \"component\": {\"id\": 15, \"type\": \"workplans\", \"route\": \"/dashboards/workplans/15\"}}','2024-10-03 17:22:28','2024-10-03 17:22:28',NULL),('35d355e2-f501-4795-b4e8-88e6bce5e8ef','Plan febrero',0,'2026-02-08T05:00:00.000Z','2026-02-13T05:00:00.000Z','{\"desc\": \"Plan febrero\", \"label\": 2, \"component\": {\"id\": 18, \"type\": \"workplans\", \"route\": \"/dashboards/workplans/18\"}}','2026-03-17 00:14:54','2026-03-17 00:14:54',NULL),('3e778194-46bb-4783-8b48-c6ad6c7580c4','prueba',1,'2024-07-11T05:00:00.000Z','2024-07-11T05:00:00.000Z','{\"desc\": \"prueba\", \"label\": 1, \"component\": {\"id\": 13, \"type\": \"visits\", \"route\": \"/apps/visits/13\"}}','2024-07-11 12:46:10','2024-07-11 12:46:10',NULL),('4471f799-e039-4ec0-a360-c2a21baf24d1','Cesar ',1,'2024-08-28T05:00:00.000Z','2024-08-28T05:00:00.000Z','{\"desc\": \"Cesar \", \"label\": 2, \"component\": {\"id\": 12, \"type\": \"workplans\", \"route\": \"/dashboards/workplans/12\"}}','2024-08-28 03:08:55','2024-08-28 03:08:55',NULL),('454188c2-1af8-4caf-a6a8-cf0e876d28b3','cesa vaca',1,'2024-06-04T05:00:00.000Z','2024-06-04T05:00:00.000Z','{\"desc\": \"cesa vaca\", \"label\": 2, \"component\": {\"id\": 13, \"type\": \"workplans\", \"route\": \"/dashboards/workplans/13\"}}','2024-08-28 03:10:14','2024-08-28 03:10:14',NULL),('48a17949-0739-4811-90f7-a433fb9dea11','sdxfcvbnm,',1,'2024-03-31T05:00:00.000Z','2024-03-31T17:00:00.000Z','{\"desc\": \"sdxfcvbnm,\", \"label\": 2, \"component\": {\"id\": 6, \"type\": \"workplans\", \"route\": \"/apps/workplans/6\"}}','2024-03-20 12:39:19','2024-03-20 12:39:19',NULL),('4918db3c-735a-4511-8f2d-3c6812efea92','>Test prueba',1,'2024-04-18T13:30:00.000Z','2024-04-18T13:30:00.000Z','{\"desc\": \">Test prueba\", \"label\": 1, \"component\": {\"id\": 3, \"type\": \"visits\", \"route\": \"/apps/visits/3\"}}','2024-04-18 22:55:25','2024-04-18 22:55:25',NULL),('56b77cb3-a0e2-42b2-9235-1b1671462d41','Dra. XX',1,'2024-07-08T13:00:00.000Z','2024-07-08T05:00:00.000Z','{\"desc\": \"Dra. XX\", \"label\": 2, \"component\": {\"id\": 9, \"type\": \"workplans\", \"route\": \"/apps/workplans/9\"}}','2024-07-05 17:19:00','2024-07-05 17:19:00',NULL),('6bb64855-852d-44fe-830e-da82807285a3','prueba',1,'2024-07-05T05:00:00.000Z','2024-07-05T05:00:00.000Z','{\"desc\": \"prueba\", \"label\": 1, \"component\": {\"id\": 11, \"type\": \"visits\", \"route\": \"/apps/visits/11\"}}','2024-07-05 17:09:21','2024-07-05 17:09:21',NULL),('6f44e676-ba5a-4894-ac0e-7fdaa1526547','Visita almacen',1,'2024-03-20T11:30:00.000Z','2024-03-20T11:30:00.000Z','{\"desc\": \"Visita almacen\", \"label\": 1, \"component\": {\"id\": 1, \"type\": \"visits\", \"route\": \"/apps/visits/1\"}}','2024-03-20 14:35:53','2024-03-20 14:35:53',NULL),('72a3cad2-9367-4961-b3ad-c4a3525d5aa9','Antioquia',1,'2024-04-02T05:00:00.000Z','2024-04-02T17:00:00.000Z','{\"desc\": \"Antioquia\", \"label\": 2, \"component\": {\"id\": 3, \"type\": \"workplans\", \"route\": \"/apps/workplans/3\"}}','2024-03-20 12:23:16','2024-03-20 12:23:16',NULL),('7ab22085-a8de-47b3-8814-387b3c894547','prueba 11/06/2024',1,'2024-06-07T05:00:00.000Z','2024-06-07T05:00:00.000Z','{\"desc\": \"prueba 11/06/2024\", \"label\": 1, \"component\": {\"id\": 8, \"type\": \"visits\", \"route\": \"/apps/visits/8\"}}','2024-06-11 14:28:25','2024-06-11 14:28:25',NULL),('803840dd-bb8a-4dde-9077-c8540bbb3c8d','prueba',1,'2024-03-22T05:00:00.000Z','2024-03-22T17:30:00.000Z','{\"desc\": \"prueba\", \"label\": 2, \"component\": {\"id\": 8, \"type\": \"workplans\", \"route\": \"/apps/workplans/8\"}}','2024-03-20 13:34:15','2024-03-20 13:34:15',NULL),('8a1c8e09-384b-4fee-bba0-8686807a58d8','Prueba',1,'2024-05-09T15:00:00.000Z','2024-05-09T15:00:00.000Z','{\"desc\": \"Prueba\", \"label\": 1, \"component\": {\"id\": 6, \"type\": \"visits\", \"route\": \"/apps/visits/6\"}}','2024-05-20 15:09:48','2024-05-20 15:09:48',NULL),('8ebb6307-607f-40f3-86ae-a2d90117cc99','vacaciones ',1,'2024-03-20T11:00:00.000Z','2024-03-31T11:00:00.000Z','{\"desc\": \"vacaciones \", \"label\": 2, \"component\": {\"id\": 1, \"type\": \"workplans\", \"route\": \"/apps/workplans/1\"}}','2024-03-20 12:07:51','2024-03-20 12:07:51',NULL),('92773738-b201-45f3-b5df-9e76978fa3f9','Visita prueba',1,'2024-04-18T12:15:00.000Z','2024-04-18T12:15:00.000Z','{\"desc\": \"Visita prueba\", \"label\": 1, \"component\": {\"id\": 2, \"type\": \"visits\", \"route\": \"/apps/visits/2\"}}','2024-04-18 22:48:27','2024-04-18 22:48:27',NULL),('9b67a6d2-a4e4-4831-88e2-6f202a2ca217','DIA DE LA FAMILIA',1,'2024-07-03T12:00:00.000Z','2024-07-03T12:00:00.000Z','{\"desc\": \"DIA DE LA FAMILIA\", \"label\": 2, \"component\": {\"id\": 10, \"type\": \"workplans\", \"route\": \"/apps/workplans/10\"}}','2024-07-05 17:51:13','2024-07-05 17:51:13',NULL),('9beb05ad-9e29-4a72-831d-260b454ce770','Prueba 5 de julio',1,'2024-07-04T05:00:00.000Z','2024-07-04T05:00:00.000Z','{\"desc\": \"Prueba 5 de julio\", \"label\": 1, \"component\": {\"id\": 9, \"type\": \"visits\", \"route\": \"/apps/visits/9\"}}','2024-07-05 16:52:05','2024-07-05 16:52:05',NULL),('acc8017d-e6aa-404f-818c-f1bbf418ace7','prueba',1,'2024-03-31T05:00:00.000Z','2024-03-31T17:00:00.000Z','{\"desc\": \"prueba\", \"label\": 2, \"component\": {\"id\": 7, \"type\": \"workplans\", \"route\": \"/apps/workplans/7\"}}','2024-03-20 12:44:00','2024-03-20 12:44:00',NULL),('aec4dc73-04fa-4c9f-98b5-bbfe75a4a212','esgdh ',1,'2024-03-03T05:00:00.000Z','2024-03-03T05:00:00.000Z','{\"desc\": \"esgdh \", \"label\": 2, \"component\": {\"id\": 4, \"type\": \"workplans\", \"route\": \"/apps/workplans/4\"}}','2024-03-20 12:24:36','2024-03-20 12:24:36',NULL),('b9c4b960-8a10-42b7-ada5-14f00ecec3e2','dbdb',1,'2024-07-11T05:00:00.000Z','2024-07-11T05:00:00.000Z','{\"desc\": \"dbdb\", \"label\": 1, \"component\": {\"id\": 15, \"type\": \"visits\", \"route\": \"/apps/visits/15\"}}','2024-07-11 12:47:40','2024-07-11 12:47:40',NULL),('ba94caa5-9322-45cd-96ef-3d8aacf6d51c','Visita méduica',1,'2024-04-11T15:00:00.000Z','2024-04-11T15:00:00.000Z','{\"desc\": \"Visita méduica\", \"label\": 1, \"component\": {\"id\": 4, \"type\": \"visits\", \"route\": \"/apps/visits/4\"}}','2024-05-20 15:06:15','2024-05-20 15:06:15',NULL),('c9254262-c52c-423a-86b1-acb4b7a94924','venta',1,'2024-10-15T05:00:00.000Z','2024-10-15T05:00:00.000Z','{\"desc\": \"venta\", \"label\": 1, \"component\": {\"id\": 17, \"type\": \"visits\", \"route\": \"/apps/visits/17\"}}','2024-10-15 14:31:21','2024-10-15 14:31:21',NULL),('d52286f7-d17c-4071-ba0e-eb4eb52bf169','prueba',1,'2024-07-05T05:00:00.000Z','2024-07-05T05:00:00.000Z','{\"desc\": \"prueba\", \"label\": 1, \"component\": {\"id\": 12, \"type\": \"visits\", \"route\": \"/apps/visits/12\"}}','2024-07-05 17:14:43','2024-07-05 17:14:43',NULL),('e71eec8d-14b2-4efa-b96e-0f266764c6a7','Plan de Trabajo Febrero',0,'2026-02-22T05:00:00.000Z','2026-02-27T05:00:00.000Z','{\"desc\": \"Plan de Trabajo Febrero\", \"label\": 2, \"component\": {\"id\": 17, \"type\": \"workplans\", \"route\": \"/dashboards/workplans/17\"}}','2026-03-12 12:52:15','2026-03-12 12:52:15',NULL),('e8778332-8cb4-4269-9d1d-7e2d8c39368c','rxctvbnm',1,'2024-03-20T05:00:00.000Z','2024-03-20T17:00:00.000Z','{\"desc\": \"rxctvbnm\", \"label\": 2, \"component\": {\"id\": 5, \"type\": \"workplans\", \"route\": \"/apps/workplans/5\"}}','2024-03-20 12:35:48','2024-03-20 12:35:48',NULL),('e9bf0af8-aec0-4913-8e8a-9e206fe7b9ec','Plan Semana',0,'2026-03-13T05:00:00.000Z','2026-03-19T05:00:00.000Z','{\"desc\": \"Plan Semana\", \"label\": 2, \"component\": {\"id\": 16, \"type\": \"workplans\", \"route\": \"/dashboards/workplans/16\"}}','2026-03-12 05:50:10','2026-03-12 05:50:10',NULL),('eb125707-7f41-4aeb-9cca-c4259e071e40','trabajo completo \n',1,'2024-03-20T05:00:00.000Z','2024-03-20T17:00:00.000Z','{\"desc\": \"trabajo completo \\n\", \"label\": 2, \"component\": {\"id\": 2, \"type\": \"workplans\", \"route\": \"/apps/workplans/2\"}}','2024-03-20 12:08:39','2024-03-20 12:08:39',NULL),('eb6e6300-5962-4566-b31c-ca756f618ea1','Test Inasistencia',1,'2024-10-15T11:00:00.000Z','2024-10-18T11:00:00.000Z','{\"desc\": \"Test Inasistencia\", \"label\": 2, \"component\": {\"id\": 14, \"type\": \"workplans\", \"route\": \"/dashboards/workplans/14\"}}','2024-10-03 17:21:39','2024-10-03 17:21:39',NULL),('edc06617-563d-4712-ae2b-63174638a4fa','prueba',1,'2024-07-11T05:00:00.000Z','2024-07-11T05:00:00.000Z','{\"desc\": \"prueba\", \"label\": 1, \"component\": {\"id\": 14, \"type\": \"visits\", \"route\": \"/apps/visits/14\"}}','2024-07-11 12:46:49','2024-07-11 12:46:49',NULL),('f4fe6444-2f10-4b4d-8a0d-eb5fad813eab','prueba 5 de julio',1,'2024-07-05T05:00:00.000Z','2024-07-05T05:00:00.000Z','{\"desc\": \"prueba 5 de julio\", \"label\": 1, \"component\": {\"id\": 10, \"type\": \"visits\", \"route\": \"/apps/visits/10\"}}','2024-07-05 16:52:35','2024-07-05 16:52:35',NULL),('f8c6818f-844b-408e-8b05-f83785c3c459','test ina',1,'2024-08-06T05:00:00.000Z','2024-08-06T05:00:00.000Z','{\"desc\": \"test ina\", \"label\": 2, \"component\": {\"id\": 11, \"type\": \"workplans\", \"route\": \"/dashboards/workplans/11\"}}','2024-08-05 16:26:36','2024-08-05 16:26:36',NULL);
/*!40000 ALTER TABLE `calendar_events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `calendar_labels`
--

DROP TABLE IF EXISTS `calendar_labels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `calendar_labels` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  `color` varchar(10) NOT NULL,
  `type` varchar(6) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `calendar_labels`
--

LOCK TABLES `calendar_labels` WRITE;
/*!40000 ALTER TABLE `calendar_labels` DISABLE KEYS */;
INSERT INTO `calendar_labels` VALUES (1,'Visita','#13B013','system','2024-02-28 20:17:28','2024-02-28 20:17:28',NULL),(2,'Plan de trabajo','#D6C520','system','2024-02-28 20:17:47','2024-02-28 20:17:47',NULL),(3,'Cumpleaños','#2E7AE1','system','2024-03-10 22:24:36','2024-03-10 22:24:36',NULL);
/*!40000 ALTER TABLE `calendar_labels` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `configs`
--

DROP TABLE IF EXISTS `configs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `configs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `label` varchar(50) NOT NULL,
  `value` text NOT NULL,
  `type` enum('system','custom') NOT NULL DEFAULT 'system',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `configs`
--

LOCK TABLES `configs` WRITE;
/*!40000 ALTER TABLE `configs` DISABLE KEYS */;
INSERT INTO `configs` VALUES (1,'daily_hours','Horas díarias','9.2','system','2024-09-30 15:23:54','2024-09-30 15:23:54',NULL),(2,'holidays','Días Festivos','[\"25-12-2025\"]','custom','2025-12-16 20:39:26','2025-12-16 20:39:26',NULL);
/*!40000 ALTER TABLE `configs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `justifications`
--

DROP TABLE IF EXISTS `justifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `justifications` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `thirdId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `dateToJustify` datetime NOT NULL,
  `description` text NOT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `thirdId` (`thirdId`),
  KEY `userId` (`userId`),
  CONSTRAINT `justifications_ibfk_1` FOREIGN KEY (`thirdId`) REFERENCES `third` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `justifications_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `justifications`
--

LOCK TABLES `justifications` WRITE;
/*!40000 ALTER TABLE `justifications` DISABLE KEYS */;
INSERT INTO `justifications` VALUES (1,3,4,'2024-04-20 15:21:17','2024-04-20 15:21:17','prueba','active','2024-05-20 15:21:17','2024-05-20 15:21:17',NULL),(2,4,4,'2024-04-20 15:21:53','2024-04-20 15:21:53','prueba','active','2024-05-20 15:21:53','2024-05-20 15:21:53',NULL),(3,4,1,'2024-05-29 03:22:47','2024-05-29 03:22:47','Prueba FarmaTS','active','2024-06-29 03:22:47','2024-06-29 03:22:47',NULL),(4,2,2,'2024-05-29 03:26:06','2024-05-29 03:26:06','Prueba ','active','2024-06-29 03:26:06','2024-06-29 03:26:06',NULL),(5,3,2,'2024-05-29 03:27:04','2024-05-29 03:27:04','prueba','active','2024-06-29 03:27:04','2024-06-29 03:27:04',NULL),(6,6,6,'2024-06-05 17:21:11','2024-06-05 17:21:11','fdf prueba 23/07','active','2024-07-05 17:21:11','2024-07-23 16:37:25',NULL),(7,2,2,'2024-07-05 16:39:58','2024-07-05 16:39:58','hola prueba sas s','active','2024-08-05 16:39:58','2024-08-28 03:07:58',NULL),(8,3,2,'2024-07-05 16:42:10','2024-07-05 16:42:10','prueba 2 xxx s','active','2024-08-05 16:42:10','2024-08-28 03:07:15',NULL),(9,3,2,'2024-09-03 17:17:23','2024-09-03 17:17:23','Test Justificacion','active','2024-10-03 17:17:23','2024-10-03 17:17:23',NULL),(10,2,2,'2024-09-03 17:18:11','2024-09-03 17:18:11','test - justificaciones','active','2024-10-03 17:18:11','2024-10-03 17:18:11',NULL),(11,4,2,'2024-09-15 14:30:35','2024-09-15 14:30:35','no se pudo realizar por vacaciones ','active','2024-10-15 14:30:35','2024-10-15 14:30:35',NULL),(12,158,18,'2026-02-12 06:20:51','2026-02-12 06:20:51','Justi','active','2026-03-12 06:20:51','2026-03-12 06:20:51',NULL);
/*!40000 ALTER TABLE `justifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notifications` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `icon` varchar(50) DEFAULT NULL,
  `title` varchar(50) NOT NULL,
  `description` varchar(120) NOT NULL,
  `time` datetime NOT NULL,
  `read` tinyint(1) NOT NULL DEFAULT '0',
  `variant` enum('success','info','warning','error') NOT NULL DEFAULT 'info',
  `useRouter` tinyint(1) NOT NULL DEFAULT '0',
  `link` text,
  `image` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
INSERT INTO `notifications` VALUES (1,'material-solid:person_add_alt','¡Nuevo panel creado!','Se ha creado un nuevo panel','2024-10-15 14:27:04',1,'success',1,'/records/thirds/168',NULL,'2024-10-15 14:27:04','2026-03-17 14:33:02',NULL),(2,'','¡Nuevo panel por aprobar!','El representante Cesar  Mendoza tiene un panel por aprobar.','2024-10-15 14:27:04',1,'warning',1,'/records/users/2',NULL,'2024-10-15 14:27:04','2026-03-17 14:33:02',NULL),(3,'material-solid:person_add_alt','¡Nuevo panel asignado!','Se ha asignado un nuevo panel al representante','2025-10-07 20:38:20',1,'success',1,'/records/thirds/170',NULL,'2025-10-07 20:38:20','2026-03-17 14:33:02',NULL),(4,'','¡Nuevo panel por aprobar!','El representante Sistemas Ophtha tiene un panel por aprobar.','2025-10-07 20:38:20',1,'warning',1,'/records/users/7',NULL,'2025-10-07 20:38:20','2026-03-17 14:33:02',NULL),(5,'material-solid:person_add_alt','¡Nuevo panel asignado!','Se ha asignado un nuevo panel al representante','2025-10-08 19:03:19',1,'success',1,'/records/thirds/171',NULL,'2025-10-08 19:03:19','2026-03-17 14:33:02',NULL),(6,'','¡Nuevo panel por aprobar!','El representante Sistemas Ophtha tiene un panel por aprobar.','2025-10-08 19:03:19',1,'warning',1,'/records/users/7',NULL,'2025-10-08 19:03:19','2026-03-17 14:33:02',NULL),(11,'material-solid:person_add_alt','¡Nuevo panel creado!','Se ha creado un nuevo panel','2026-03-12 13:36:45',1,'success',1,'/records/thirds/178',NULL,'2026-03-12 13:36:45','2026-03-17 14:33:02',NULL),(12,'material-solid:person_add_alt','¡Nuevo panel creado!','Se ha creado un nuevo panel','2026-03-12 13:49:22',1,'success',1,'/records/thirds/179',NULL,'2026-03-12 13:49:22','2026-03-17 14:33:02',NULL),(13,'','¡Nuevo panel por aprobar!','El representante Juan Mesa tiene un panel por aprobar.','2026-03-17 00:39:19',1,'warning',1,'/records/users/19',NULL,'2026-03-17 00:39:19','2026-03-17 14:33:02',NULL);
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `portfolios`
--

DROP TABLE IF EXISTS `portfolios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `portfolios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(80) NOT NULL,
  `userId` int(11) NOT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `portfolios_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `portfolios`
--

LOCK TABLES `portfolios` WRITE;
/*!40000 ALTER TABLE `portfolios` DISABLE KEYS */;
INSERT INTO `portfolios` VALUES (1,'Portafolio #2',2,'active','2024-03-20 12:42:29','2024-03-20 12:42:29',NULL),(2,'Portafolio #3',3,'active','2024-03-20 14:35:18','2024-03-20 14:35:18',NULL),(3,'Portafolio #6',6,'active','2024-05-08 20:33:08','2024-05-08 20:33:08',NULL),(4,'Portafolio #12',12,'active','2024-10-15 14:29:16','2024-10-15 14:29:16',NULL),(5,'Portafolio #7',7,'active','2025-10-07 20:38:20','2025-10-07 20:38:20',NULL),(6,'Portafolio de Usuario #18',18,'active','2026-03-12 05:25:30','2026-03-12 05:25:30',NULL),(7,'Portafolio de Usuario #15',15,'active','2026-03-12 05:25:58','2026-03-12 05:25:58',NULL),(8,'Portafolio de Usuario #19',19,'active','2026-03-17 00:39:19','2026-03-17 00:39:19',NULL);
/*!40000 ALTER TABLE `portfolios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `region`
--

DROP TABLE IF EXISTS `region`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `region` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `region`
--

LOCK TABLES `region` WRITE;
/*!40000 ALTER TABLE `region` DISABLE KEYS */;
INSERT INTO `region` VALUES (1,'Antioquia','active','2024-02-08 04:26:28','2024-02-08 04:26:28',NULL),(2,'Bogotá','active','2024-02-11 04:34:40','2024-02-11 04:34:40',NULL),(3,'Boyacá','active','2024-03-12 03:45:04','2024-03-12 03:45:04',NULL),(4,'Cartagena','active','2024-03-12 03:45:04','2024-03-12 03:45:04',NULL),(5,'Choco','active','2024-03-12 03:45:04','2024-03-12 03:45:04',NULL),(6,'Costa','active','2024-03-12 03:45:04','2024-03-12 03:45:04',NULL),(7,'Eje Cafetero','active','2024-03-12 03:45:04','2024-03-12 03:45:04',NULL),(8,'Llanos Orientales','active','2024-03-12 03:45:04','2024-03-12 03:45:04',NULL),(9,'Monteria','active','2024-03-12 03:45:04','2024-03-12 03:45:04',NULL),(10,'Pasto','active','2024-03-12 03:45:04','2024-03-12 03:45:04',NULL),(11,'Santander','active','2024-03-12 03:45:04','2024-03-12 03:45:04',NULL),(12,'Sur','active','2024-03-12 03:45:04','2024-03-12 03:45:04',NULL),(13,'Tolima','active','2024-03-12 03:45:04','2024-03-12 03:45:04',NULL),(14,'Valle','active','2024-03-12 03:45:04','2024-03-12 03:45:04',NULL);
/*!40000 ALTER TABLE `region` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `third`
--

DROP TABLE IF EXISTS `third`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `third` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `typeIdentification` varchar(50) NOT NULL,
  `identification` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `additionalName` varchar(50) DEFAULT NULL,
  `address` varchar(50) NOT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `mobile` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `city` varchar(50) NOT NULL,
  `birthday` datetime NOT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `impact` int(3) NOT NULL,
  `supplied` varchar(50) DEFAULT NULL,
  `typeId` int(11) DEFAULT NULL,
  `classificationId` int(11) DEFAULT NULL,
  `specialtyId` int(11) DEFAULT NULL,
  `subSpecialtyId` int(11) DEFAULT NULL,
  `regionId` int(11) NOT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `typeId` (`typeId`),
  KEY `classificationId` (`classificationId`),
  KEY `specialtyId` (`specialtyId`),
  KEY `subSpecialtyId` (`subSpecialtyId`),
  KEY `regionId` (`regionId`),
  CONSTRAINT `third_ibfk_1` FOREIGN KEY (`typeId`) REFERENCES `third_type` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `third_ibfk_2` FOREIGN KEY (`classificationId`) REFERENCES `third_classification` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `third_ibfk_3` FOREIGN KEY (`specialtyId`) REFERENCES `third_specialty` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `third_ibfk_4` FOREIGN KEY (`subSpecialtyId`) REFERENCES `third_subspecialty` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `third_ibfk_5` FOREIGN KEY (`regionId`) REFERENCES `region` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=180 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `third`
--

LOCK TABLES `third` WRITE;
/*!40000 ALTER TABLE `third` DISABLE KEYS */;
INSERT INTO `third` VALUES (2,'CC','684532120320','Juan David ANDRES','Mejia','calle 2 79-35','+573106933247','+573044171706','juandavid.mejia@servitecssr.com.co','Medellin','2006-03-20 05:00:00','M',2,'',1,3,5,NULL,9,'active','2024-02-20 12:14:53','2024-05-21 18:43:57','2026-02-17 16:32:24'),(3,'CC','84565089','alexx','','medellin','+573016929387','+573016929387','cesar@gmail.com','medellin','1993-03-23 05:00:00',NULL,3,'',3,NULL,5,NULL,1,'active','2024-03-20 12:42:29','2024-03-20 12:42:29','2026-02-17 16:32:24'),(4,'NIT','46563234','FarmaTS','','Cra 1 B N 81 20','+573154979800','','farmats@gmail.vom','Medellin','2001-03-21 05:00:00',NULL,4,'',3,NULL,10,NULL,7,'active','2024-02-20 14:21:14','2024-03-20 14:21:14','2026-02-17 16:32:24'),(5,'NIT','23235986','CCMOD','Andres S.','Cra 1 B N 81 20','+573154979800','','mmod@gmail.vom','Medellin','2000-03-15 05:00:00',NULL,3,'Copservir (Rebaja)',2,NULL,6,NULL,6,'active','2024-03-20 14:35:18','2024-03-20 14:35:18',NULL),(6,'CC','1000575844','FELIPE ','PULIDO GRANADOS','CRA 12  11-65  INT 5','3174241797','3174241797','felop3020@gmail.com','SOGAMOSO','1969-03-31 00:00:00','M',2,'',1,1,2,NULL,3,'active','2024-05-08 20:33:08','2024-06-11 14:17:26','2026-02-17 16:32:24'),(7,'CC','1007442075','NATALIA CAMILA','GARCIA RUEDA','OPTISALUD TUNJA','3103115751','3103115751','nczunilagarciarueda@gmail.com','TUNJA','1980-01-18 00:00:00','F',2,'',1,3,2,NULL,3,'active','2024-05-20 15:14:15','2024-05-22 20:15:29',NULL),(8,'CC','1234565789','Prueba20','MEJIA','CALLE 2','3202032323','3202032323','sistemas@laboratorioophtha.com','MEDELLIN','1998-06-28 05:00:00','M',1,'',1,1,1,NULL,1,'active','2024-05-21 18:47:02','2024-05-21 18:47:02','2026-02-17 16:32:24'),(9,'CC','12345657899','Prueba20','MEJIA','CALLE 2','3202032323','3202032323','sistemas@laboratorioophtha.com','MEDELLIN','1998-06-28 05:00:00',NULL,1,'Colsubsidio',2,NULL,10,NULL,1,'active','2024-05-21 18:51:50','2024-05-21 18:51:50','2026-02-17 16:32:24'),(10,'CC','1010120827','DANNA ISABELLA','GARCIA','OPTISALUD TUNJA','3213447569','3213447569','isabellagarciaopto@hotmail.com','TUNJA','1970-11-08 05:00:00','F',2,'',1,3,2,NULL,3,'active','2024-05-22 20:14:35','2024-05-22 20:14:35','2026-02-17 16:32:24'),(11,'CC','1018409150','MARIO ISAAC ','LEON HIGUERA','TUNJA','3015843123','3015843123','marioleonhiguera@hotmail.com','TUNJA','1982-02-08 05:00:00','M',2,'',1,3,1,NULL,3,'active','2024-05-22 20:41:07','2024-05-22 20:41:07',NULL),(12,'CC','1020843118','JUAN JOSE ','DUARTE CONTRERAS','OPTISALUD SOGAMOSO','3212702400','3212702400','juanjoseducon@gmail.com','SOGAMOSO','1988-08-14 05:00:00','M',2,'',1,3,2,NULL,3,'active','2024-05-22 20:42:35','2024-05-22 20:42:35',NULL),(13,'CC','1026254318','DARLYN ADRIANA','RAMOS MARÍN','CRA 10  18-57','3102122386','3102122386','darlyn_86@hotmail.es','TUNJA','1977-06-04 05:00:00','F',2,'',1,3,2,NULL,3,'active','2024-05-22 20:44:14','2024-05-22 20:44:14',NULL),(14,'CC','1052392431','YURI ','CIFUENTES SUAREZ','DIAGONAL 13 #13-54','3133318728','3133318728','yucifuentes@hotmail.com','SOGAMOSO','1990-11-27 05:00:00','F',2,'',1,2,2,NULL,3,'active','2024-05-29 12:41:21','2024-05-29 12:41:21',NULL),(15,'CC','1020839411','PAULA XIMENA','VELA PEÑA','DIAGONAL 13 # 13-54','3188022221','3188022221','ximenavelap@gmail.com','TUNJA','1990-02-27 05:00:00','F',2,'',1,3,2,NULL,3,'active','2024-05-29 12:50:49','2024-05-29 12:50:49',NULL),(16,'CC','1052499212','DIANA SOFIA ','MORA SOLEDAD','CARRERA 3 ESTE # 47 A -38','3205201473','3205201473','dianasofia.mora77@gmail.com','DUITAMA','1990-12-12 05:00:00','F',2,'',1,1,2,NULL,3,'active','2024-05-29 14:06:00','2024-05-29 14:06:00',NULL),(17,'CC','10020839411','CRISTIAN ALEJANDRO ','CRUZ','OPTISALUD UNICENTRO','3103226750','3103226750','cacs_721@hotmail.com','TUNJA','1990-10-09 05:00:00','M',1,'',1,3,2,NULL,3,'active','2024-05-29 14:09:32','2024-05-29 14:09:32',NULL),(18,'CC','1007381625','ANGELA MARIA ','RINCÓN CELY','CREDIOPTICAS DUITAMA','3222616692','3222616692','angelarinconce@gmail.com','DUITAMA','1990-09-08 05:00:00','F',1,'',1,3,2,NULL,3,'active','2024-05-29 14:10:56','2024-05-29 14:10:56',NULL),(19,'CC','1010171354','OSCAR ALEXANDER','ZAMBRANO BADILLO','CALLE 11 # 17-38','3108600837','3108600837','alekz.694@gmail.com','SOGAMOSO','1990-03-15 05:00:00','M',2,'',1,3,2,NULL,3,'active','2024-05-29 14:18:44','2024-05-29 14:18:44',NULL),(20,'CC','1010166345','ROBERT ','ARIAS PEDRAZA','CARRERA 9A # 1A-17 DUITAMA','2104110','3006551448','robertp_30@hotmail.com','SOGAMOSO','1990-09-08 05:00:00','F',1,'',1,3,2,NULL,3,'active','2024-05-29 14:19:45','2024-05-29 14:19:45',NULL),(21,'CC','1013585205','TATIANA','MORENO MORALES','OPTISALUD TUNJA','3202683190','3202683190','moreta_2002@hotmail.com','TUNJA','1990-10-02 05:00:00','F',2,'',1,3,1,NULL,3,'active','2024-05-29 14:21:48','2024-05-29 14:21:48',NULL),(25,'CC','1013627329','JOHANA ','RINCON RODRIGUEZ','CARRERA 9 # 24-21','3126168357','3126168357','juaniod9108@gmail.com','TUNJA','1990-08-29 05:00:00','F',1,'',1,2,2,NULL,3,'active','2024-05-29 14:26:37','2024-05-29 14:26:37',NULL),(26,'CC','1018430354','ANA MARIA ','GUTIERREZ GONZALEZ','CALLE 10 # 11-15','3174350796','3174350796','colopticas@gmail.com','SOGAMOSO','1990-09-29 05:00:00','F',2,'',1,1,2,NULL,3,'active','2024-05-29 14:30:55','2024-05-29 14:30:55',NULL),(27,'CC','1018439339','ADRIANA PAOLA ','FUENTES TORRES','OPTISALUD DUITAMA','3118514112','3118514112','paolis.15@hotmail.com','DUITAMA','1990-10-09 05:00:00','F',2,'',1,2,2,NULL,3,'active','2024-05-29 14:32:53','2024-05-29 14:32:53',NULL),(28,'CC','1018441175','ANDREA CAROLINA ','MONTAÑA CARDOZA','OPTICA VELOZA','3118203395','3118203395','carolinamc6@gmail.com','TUNJA','1990-01-06 05:00:00','F',2,'',1,3,2,NULL,3,'active','2024-05-29 14:38:32','2024-05-29 14:38:32',NULL),(29,'CC','1019012097','DEISY CONSTANZA',' BAYONA MALDONADO','CARRERA 18 # 1-66','3118120209','3118120209','deisita86@hotmail.com','SOGAMOSO','1990-11-17 05:00:00','F',1,'',1,2,2,NULL,3,'active','2024-05-29 14:44:46','2024-05-29 14:44:46',NULL),(30,'CC','1020783787','MONICA','MORENO ROBAYO','OPTISALUD TUNJA','3143515281','3143515281','moniromero_09@hotmail.com','TUNJA','1990-06-15 05:00:00','F',2,'',1,3,2,13,3,'active','2024-05-29 14:46:41','2024-05-29 14:46:41',NULL),(31,'CC','1020818272','ANGELA',' ZAMBRANO BUITRAGO','CALLE 17 # 11-53','3115410539','3115410539','angela.101996@hotmail.com','TUNJA','1990-08-10 05:00:00','F',2,'',1,2,2,NULL,3,'active','2024-05-29 14:49:30','2024-05-29 14:49:30',NULL),(32,'CC','1022323766','CAROLINA','CASTRO JIMENEZ','CARRERA 9 # 18-60  LC 104','7432615','3142325909','centropticosantalucia@gmail.com','TUNJA','1990-04-13 05:00:00','F',2,'',1,2,2,NULL,3,'active','2024-05-29 14:51:11','2024-05-29 14:51:11',NULL),(33,'CC','10243788','MIGUEL','CHAPARRO BOHORQUEZ','CALLE 11 # 12-40','7702541','3157814914','miguelacheb@yahoo.es','SOGAMOSO','1970-09-07 05:00:00','M',2,'',1,2,1,NULL,3,'active','2024-05-29 14:53:01','2024-05-29 14:53:01',NULL),(35,'CC','1030564487','PAOLA ANDREA','SUAREZ','CENTRO COMERCIAL UNICENTRO','7454303','3118514112','andresuarezfo@hotmail.com','TUNJA','1990-11-21 05:00:00','F',2,'',1,3,2,NULL,3,'active','2024-05-29 14:54:25','2024-05-29 14:54:25',NULL),(36,'CC','1030669130','LUZ ANGELA','VELANDIA RODRIGUEZ','OPTISALUD TUNJA','3223438010','3223438010','dangela2408@gmail.com','TUNJA','1990-08-17 05:00:00','F',2,'',1,3,2,NULL,3,'active','2024-05-29 14:55:55','2024-05-29 14:55:55',NULL),(37,'CC','1032370391','YURY ESPERANZA','RISCANEVO MARTINEZ','CARRERA 9 # 20-45 LOCAL 108','3176358976','3176358976','yuriscasnevo@hotmail.com','TUNJA','1990-06-14 05:00:00','F',2,'',1,2,2,NULL,3,'active','2024-05-29 14:58:22','2024-05-29 14:58:22',NULL),(38,'CC','1032370818','JULIO CESAR','BAEZ CORDOBA','CALLE 47 # 7-66 TUNJA','3114559248','3114559248','julio_jc@hotmail.com','TUNJA','1990-09-24 05:00:00','M',1,'',1,3,2,NULL,3,'active','2024-05-29 14:59:47','2024-05-29 14:59:47',NULL),(39,'CC','1032394161','JESUS ARTURO','HERNANDEZ SIERRA','CARRERA 3 # 12-28','3152076151','3152076151','optometramundovisionboyaca@gmail.com','PUERTO BOYACA','1990-07-30 05:00:00','M',1,'',1,1,2,NULL,3,'active','2024-05-29 15:01:28','2024-05-29 15:01:28',NULL),(40,'CC','1032417179','LINA JULIETH ','BARROTE SILVA','CENTRO','3229436737','3229436737','linabarrote@hotmail.com','SOGAMOSO','1990-07-17 05:00:00','F',2,'',1,2,2,NULL,3,'active','2024-05-29 15:03:39','2024-05-29 15:03:39',NULL),(41,'CC','1032456937','DANIELA GRAJALES','HERRERA','OPTICA AE DUITAMA','3044612109','3044612109','nanigrajales@gmail.com','DUITAMA','1990-05-28 05:00:00','F',2,'',1,2,2,NULL,3,'active','2024-05-29 15:08:57','2024-05-29 15:08:57',NULL),(42,'CC','1049603576','SARA ALEJANDRA ','CARDENAS SOSA','CENTRO NORTE PISO 1','3206752896','3206752896','opticasantacruztja@gmail.com','TUNJA','1990-06-17 05:00:00','F',2,'',1,2,2,NULL,3,'active','2024-05-29 15:10:48','2024-05-29 15:10:48',NULL),(43,'CC','1049609752','IVAN DARIO','ROMERO','CARRERA 12 # 12-84','3144535370','3144535370','','SOGAMOSO','1990-11-27 05:00:00','M',1,'',1,2,2,NULL,3,'active','2024-05-29 15:14:22','2024-05-29 15:14:22',NULL),(44,'CC','1049632031','DANILO ','BUITRAGO SOLER','TUNJA','3123315382','3123315382','danilo-bs@hotmail.com','TUNJA','1990-11-19 05:00:00','M',2,'',1,3,2,NULL,3,'active','2024-05-29 15:16:42','2024-05-29 15:16:42',NULL),(45,'CC','1052402100','VERONICA MARCELA','ECHEVERRIA BUITRAGO','CARRERA 17 # 12A-06','3142378169','3142378169','vero.nikk17@hotmail.com','SOGAMOSO','1990-06-17 05:00:00','F',2,'',1,1,2,NULL,3,'active','2024-05-29 15:18:21','2024-05-29 15:18:21',NULL),(46,'CC','1051477584','ANGIE DAYANA','PIRAGUA ALARCON','CALLE 11 # 10-83  LOCAL 108','3235744997','3235744997','adpa@gmail.com','SOGAMOSO','1990-11-26 05:00:00','F',2,'',1,2,2,NULL,3,'active','2024-05-29 15:19:42','2024-05-29 15:19:42',NULL),(47,'CC','1052313181','CAMILO ','MARTINEZ PEREZ','CALLE 17 # 13-29','7610906','3044581102','opticasae@gmail.com','DUITAMA','1990-09-09 05:00:00','M',2,'',1,2,2,NULL,3,'active','2024-05-29 15:21:18','2024-05-29 15:21:18',NULL),(50,'CC','1052314423','JUDY ','CARVAJAL RIVERA','CARRERA 9  # 24-79','3134778098','3134778098','judycarvajal04@gmail.com','TUNJA','1990-04-11 05:00:00','F',2,'',1,2,2,NULL,3,'active','2024-05-29 15:24:48','2024-05-29 15:24:48',NULL),(51,'CC','1052387990','LUISA FERNANDA','NIÑO','CARDENAS VISION','2606684','3202259366','fernandino186@gmail.com','DUITAMA','1990-06-18 05:00:00','F',2,'',1,3,2,NULL,3,'active','2024-05-29 15:26:09','2024-05-29 15:26:09',NULL),(52,'CC','1052389508','MAURICIO ','ALVARADO BRAVO','CARRERA 10 # 14-138','3205442209','3205442209','mauricioaalvarado@hotmail.com','SOGAMOSO','1990-12-19 05:00:00','M',2,'',1,2,2,NULL,3,'active','2024-05-29 15:28:31','2024-05-29 15:28:31',NULL),(53,'CC','1052391346','EMERSON ','MONTOYA','OPTISALUD TUNJA','3118636311','3118636311','emerson_montoya90@hotmail.com','TUNJA','1990-07-12 05:00:00','M',2,'',1,3,1,NULL,3,'active','2024-05-29 15:30:22','2024-05-29 15:30:22',NULL),(54,'CC','1052395225','LEANDRO','VEGA MORALES','CALLE 15 # 12-38','3012783811','3012783811','ocad27@hotmail.com','DUITAMA','1990-01-03 05:00:00','M',2,'',1,1,2,NULL,3,'active','2024-05-29 15:31:34','2024-05-29 15:31:34',NULL),(55,'CC','1052395229','DIANA PAOLA ','BONILLA BUITRAGO','CARRERA 16 # 14-13 DUITAMA','3123259163','3123259163','dipabonilla@gmail.com','DUI','1990-12-27 05:00:00','F',2,'',1,2,2,NULL,3,'active','2024-05-29 15:32:44','2024-05-29 15:32:44',NULL),(56,'CC','1052396020','OSCAR FABIAN','SOLANO CARDENAS','CALLE 15 # 13-55','3214047519','3214047519','opticosgroup@gmail.com','DUITAMA','1990-01-29 05:00:00','M',2,'',1,2,2,NULL,3,'active','2024-05-29 15:34:17','2024-05-29 15:34:17',NULL),(57,'CC','1052401942','ANGELA ','MALDONADO QUIROGA','OPTISALUD DUITAMA','3102931116','3102931116','taanquima@hotmail.com','DUITAMA','1990-06-16 05:00:00','F',2,'',1,3,2,NULL,3,'active','2024-05-29 15:36:06','2024-05-29 15:36:06',NULL),(58,'CC','1098801437','ANGELA DEL PILAR','RAMIREZ BALLESTEROS','TUNJA UNICENTRO','3043766164','3043766164','pilar.ramirez8@hotmail.com','TUNJA','1990-10-20 05:00:00','F',1,'',1,3,2,NULL,3,'active','2024-05-29 15:37:57','2024-05-29 15:37:57',NULL),(59,'CC','1053327231','CLAUDIA ESPERANZA','LOPEZ CASAS','CARRERA 10 # 26-49','3113247884','3113247884','claulopezcasas@hotmail.com','TUNJA','1990-04-14 05:00:00','F',2,'',1,2,2,NULL,3,'active','2024-05-29 15:38:53','2024-05-29 15:38:53',NULL),(60,'CC','1054093442','SANDY LICET','PULIDO','CARRERA 11 # 14-51 C.C BARCELONA','3005196396','3005196396','sanylicet@gmail.com','SOGAMOSO','1990-10-06 05:00:00','F',2,'',1,2,2,NULL,3,'active','2024-05-29 15:41:26','2024-05-29 15:41:26',NULL),(61,'CC','1056931255','DIANA KATHERINE','BECERRA MARTINEZ','CARRERA 10 # 22-61','6087440839','3137055160','becerramartinezdianakatherine@gmail.com','TUNJA','1990-08-28 05:00:00','F',2,'',1,3,2,NULL,3,'active','2024-05-29 15:42:47','2024-05-29 15:42:47',NULL),(62,'CC','1057464747','LAURA LILIANA ','MORENO CARO','OPTICA MARIN','3183639034','3183639034','lauramoreno@hotmail.com','TUNJA','1990-03-14 05:00:00','F',2,'',1,3,2,NULL,3,'active','2024-05-29 15:44:52','2024-05-29 15:44:52',NULL),(63,'CC','1057574099','AURA MILENA','LARA RODRIGUEZ','CALLE 7 # 10A-19 APTO 203','3042028038','3209877867','milelara02@hotmail.com','SOGAMOSO','1990-02-01 05:00:00','F',2,'',1,2,2,NULL,3,'active','2024-05-29 15:49:43','2024-05-29 15:49:43',NULL),(64,'CC','1057579151','DIANA GINETH','GONZALEZ MARTINEZ','OPTISALUD SOGAMOSO','3138316455','3138316455','dianagon_18@hotmail.com','SOGAMOSO','1990-09-27 05:00:00','F',1,'',1,3,2,NULL,3,'active','2024-05-29 15:55:51','2024-05-29 15:55:51',NULL),(65,'CC','1032429372','SAID ANDREA','VARGAS PEREZ','CARRERA 10 #  24-45','3114560174','3114560174','said_andrea8@hotmail.com','TUNJA','1990-05-08 05:00:00','F',1,'',1,3,2,NULL,3,'active','2024-05-29 15:57:16','2024-05-29 15:57:16',NULL),(66,'CC','1057579500','YEFERSON ALEXANDER','RODRIGUEZ BOTIA','CALLE 10 # 11-15','3133769505','3133769505','yefersonr40@gmail.com','SOGAMOSO','1990-12-12 05:00:00','M',2,'',1,1,2,NULL,3,'active','2024-05-29 15:58:33','2024-05-29 15:58:33',NULL),(67,'CC','1057591308','SILKE ALEJANDRA','SANDOVAL ALVARADO','TUNJA UNICENTRO','3004873042','3004873042','silkealeja@hotmail.com','SOGAMOSO','1990-12-13 05:00:00','F',1,'',1,3,2,NULL,3,'active','2024-05-29 16:01:28','2024-05-29 16:01:28',NULL),(68,'CC','1057592638','SANTIAGO','NIÑO LOAIZA','OPTISALUD TUNJA','3173316255','3173316255','sninolo7@hotmail.com','TUNJA','1990-07-01 05:00:00','M',1,'',1,3,2,NULL,3,'active','2024-05-29 16:03:18','2024-05-29 16:03:18',NULL),(69,'CC','1057601777','MARIA PAULA','LOPEZ ACEVEDO','CALLE 3 # 4-03 SOGAMOSO','3194770934','3194770934','mariapaulalopezacevedo@gmail.com','SOGAMOSO','1990-08-23 05:00:00','F',1,'',1,2,2,NULL,3,'active','2024-05-29 16:04:43','2024-05-29 16:04:43',NULL),(70,'CC','1057605968','LAURA MELISA','LARA MENDIVELSO','CARRERA 12 # 11-30','3223834364','3223834364','laura_melisa_lara@hotmail.com','SOGAMOSO','1990-04-19 05:00:00','F',2,'',1,2,2,NULL,3,'active','2024-05-29 16:06:22','2024-05-29 16:06:22',NULL),(71,'CC','1069265276','DAVID CAMILO','TORRES GOMEZ','CARRERA 5 # 7-46','3102227481','3102227481','towersoptics@gmail.com','CHOCONTA','1990-01-01 05:00:00','M',1,'',1,2,2,NULL,3,'active','2024-05-29 16:08:31','2024-05-29 16:08:31',NULL),(72,'CC','1073157221','ANGELICA MARIA','TAMARA JARAMILLO','CALLE 15 # 12-38','3103124393','3103124393','oculare.es@gmail.com','DUITAMA','1990-07-03 05:00:00','F',2,'',1,1,2,NULL,3,'active','2024-05-29 16:09:42','2024-05-29 16:09:42',NULL),(73,'CC','1095808829','DIANA CAROLINA ','SUAREZ GONZALEZ','C.C INNOVO PISO 2','3118897665','3118897665','optica.soluvision@gmail.com','DUITAMA','1990-04-16 05:00:00','F',2,'',1,2,2,NULL,3,'active','2024-05-29 16:10:44','2024-05-29 16:10:44',NULL),(74,'CC','1098620878','JULIETH KATHERINE ','PEÑA OLARTE','C.C VIVA','3103720177','3103720177','juliethcomlan@gmail.com','TUNJA','1990-09-02 05:00:00','F',1,'',1,3,2,NULL,3,'active','2024-05-29 16:12:57','2024-05-29 16:12:57',NULL),(75,'CC','1098675484','VANIA MARCELA','PEREZ','OPTICLINICAS DR CETINA-UNICENTRO','3196142149','3196142149','vania.marcela.perez.s@gmail.com','TUNJA','1990-02-02 05:00:00','F',1,'',1,3,2,NULL,3,'active','2024-05-29 16:14:18','2024-05-29 16:14:18',NULL),(76,'CC','1098700689','MAYORLY ','QUINTERO GOMEZ','CARRERA 3 # 13A-44','3176944119','3176944119','redmundovision@gmail.com','PUERTO BOYACA','1990-12-03 05:00:00','F',1,'',1,1,2,NULL,3,'active','2024-05-29 16:15:23','2024-05-29 16:15:23',NULL),(77,'CC','123350732','ANGIE NICOL','PEÑUELA SUAREZ','CARRERA 12 # 20-35','3132139696','3132139696','asuarez0614@gmail.com','TUNJA','1990-06-14 05:00:00','F',1,'',1,3,2,NULL,3,'active','2024-05-29 16:19:08','2024-05-29 16:19:08',NULL),(78,'CC','13721993','RUBEN DARIO ','SARMIENTO REYES','CARRERA 14 # 10-26','7296476','3005861446','rsarmiento86@hotmail.com','TUNJA','1970-09-03 05:00:00','M',1,'',1,3,2,NULL,3,'active','2024-05-29 16:21:09','2024-05-29 16:21:09',NULL),(79,'CC','33377611','SUSANA','RODRIGUEZ BARRAGAN','OPTISALUD TUNJA','3204461130','3204461130','susyrodriguezba1984@gmail.com','TUNJA','1970-10-11 05:00:00','F',2,'',1,3,1,NULL,3,'active','2024-05-29 16:22:44','2024-05-29 16:22:44',NULL),(80,'CC','14326617','JUAN CARLOS ','VELOZA','OPTICA VELOZA','3102040385','3102040385','jolucaveloza@gmail.com','TUNJA','1970-07-23 05:00:00','M',1,'',1,3,2,NULL,3,'active','2024-05-29 16:23:54','2024-05-29 16:23:54',NULL),(81,'CC','19266713','ORLANDO','CORTES AGUILAR','CARRERA 11 # 12-28','3176564150','3176564150','orlandocortes@hotmail.com','SOGAMOSO','1970-02-27 05:00:00','M',2,'',1,2,2,NULL,3,'active','2024-05-29 16:28:57','2024-05-29 16:28:57',NULL),(82,'CC','19294315','JULIO ROBERTO','SEPULVEDA SEPÚLVEDA','CARRERA 14 # 17 - 47','7729040','3125249292','doctorsepulvedasogamoso@hotmail.com','SOGAMOSO','1970-05-05 05:00:00','M',2,'',1,3,1,NULL,3,'active','2024-05-29 16:30:20','2024-05-29 16:30:20',NULL),(83,'CC','19341600','JUAN EUGENIO','BAQUERO GOMEZ','CALLE 19 # 8 - 22','7423426','3153966269','juebaquero@yahoo.com','TUNJA','1970-12-31 05:00:00','M',2,'',1,3,1,NULL,3,'active','2024-05-29 16:32:48','2024-05-29 16:32:48',NULL),(84,'CC','23430708','SANDRA ROCIO','BAEZ','OPTICA SUPERVISIONOPT','3185218379','3185218379','supervisionopt@gmail.com','DUITAMA','1970-03-17 05:00:00','F',2,'',1,2,2,NULL,3,'active','2024-05-29 16:33:50','2024-05-29 16:33:50',NULL),(85,'CC','23551313','MYRIAM MERCEDES','JAIMES CORREA','CALLE 16 # 15 - 43','7605484','3153688281','creadsaludboyaca@yahoo.es','DUITAMA','1970-05-11 05:00:00','F',1,'',1,3,2,NULL,3,'active','2024-05-29 16:34:54','2024-05-29 16:34:54',NULL),(86,'CC','24049932','MARIA DEL PILAR','CALIXTO RUBIO','CALLE 15 # 16- 26 LA CALLEJA','3118814849','3118814849','pilicalixto@hotmail.com','DUITAMA','1970-02-15 05:00:00','F',1,'',1,2,2,NULL,3,'active','2024-05-29 16:36:07','2024-05-29 16:36:07',NULL),(87,'CC','280840','GREGORIO FRANCISCO','MOJICA RODRIGUEZ','CARRERA 9 No 22 - 10 CONSULTORIO 203','7404641','3107821689','framoro@hotmail.com','TUNJA','1970-10-01 05:00:00','M',2,'',1,3,1,NULL,3,'active','2024-05-29 16:37:26','2024-05-29 16:37:26',NULL),(88,'CC','31940819','BETHY','VELANDIA ROJAS','AVENIDA DE LAS AMERICAS 18-66','3208592428','3208592428','bethyvelandia@hotmail.com','DUITAMA','1970-05-25 05:00:00','F',2,'',1,3,1,NULL,3,'active','2024-05-29 16:38:47','2024-05-29 16:38:47',NULL),(89,'CC','3228030','ALVARO JOSE','JIMENEZ PEDREROS','CARRERA 1F # 39-76','7439640','3102650143','cxvisionsas@gmail.com','TUNJA','1970-05-31 05:00:00','M',2,'',1,2,1,NULL,3,'active','2024-05-29 16:41:11','2024-05-29 16:41:11',NULL),(90,'CC','33365805','ISABEL ','LOPEZ LOPEZ','CALLE 29 # 9a-20','3173787083','3173787083','isalopez07@yahoo.es','TUNJA','1970-02-07 05:00:00','F',1,'',1,2,2,NULL,3,'active','2024-05-29 16:43:10','2024-05-29 16:43:10',NULL),(91,'CC','46453924','GIOVANA','PRADO VARGAS','CALLE 16 # 13-77','3105510143','3105510143','giovaprav@gmail.com','DUITAMA','1970-09-18 05:00:00','F',1,'',1,3,2,NULL,3,'active','2024-05-29 16:48:47','2024-05-29 16:48:47',NULL),(92,'CC','35425934','LISLEY','CORTES GARZON','CARRERA 4 # 7-79','3112396021','3112396021','','CHOCONTA','1970-12-12 05:00:00','F',1,'',1,3,2,NULL,3,'active','2024-05-29 16:50:04','2024-05-29 16:50:04',NULL),(93,'CC','35458276','SILVIA MARINA ','ULLOQUE DE LA HOZ','CARRERA 9 # 22 - 10 CONSULTORIO 205','7401682','3153178068','sylloque@hotmail.com','TUNJA','1970-07-20 05:00:00','F',2,'',1,3,1,NULL,3,'active','2024-05-29 16:52:02','2024-05-29 16:52:02',NULL),(94,'CC','40017265','MARTHA CECILIA','NIÑO MEDINA','CALLE 20 # 12 - 11','7422212','3002193516','MARTHACNINO@HOTMAIL.COM','TUNJA','1970-02-03 05:00:00','F',0,'',1,3,2,NULL,3,'active','2024-05-29 16:53:25','2024-05-29 16:53:25',NULL),(95,'CC','40018171','BLANCA CECILIA','JIMENEZ FARFAN','CALLE 19 # 8-22','7423426','3124827519','blcejimenez@yahoo.com','TUNJA','1970-10-25 05:00:00','F',1,'',1,3,2,NULL,3,'active','2024-05-29 16:58:23','2024-05-29 16:58:23',NULL),(96,'CC','40019548','DORA CECILIA',' ARIAS GALINDO','CARRERA 9 # 24- 50','3132864669','3132864669','doracecilia12@hotmail.com','TUNJA','1970-08-12 05:00:00','F',2,'',1,3,2,NULL,3,'active','2024-05-29 17:02:13','2024-05-29 17:02:13',NULL),(97,'CC','40023229','TILIA ','ALVARADO TORRES','CALLE 17 # 10-60','7446309','3138860363','zonular90@hotmail.com','TUNJA','1970-12-26 05:00:00','F',1,'',1,3,2,NULL,3,'active','2024-05-29 17:06:13','2024-05-29 17:06:13',NULL),(98,'CC','40026464','MARTHA CECILIA','SALAS ROBERTO','CARRERA 11 # 25-39','3107831518','3107831518','marthasalasr@hotmail.com','TUNJA','1970-01-13 05:00:00','F',1,'',1,3,2,NULL,3,'active','2024-05-29 17:07:42','2024-05-29 17:07:42',NULL),(99,'CC','40029547','SANDRA LILIANA','VALLEJO SILVA','CARRERA 1F # 40-149','3164940873','3164940873','sandraliliana 13@hotmail.com','TUNJA','1970-07-03 05:00:00','F',1,'',1,2,2,NULL,3,'active','2024-05-29 17:10:02','2024-05-29 17:10:02',NULL),(100,'CC','40046612','LYDA GIOMARA','GRANADOS AVILA','CARRERA 10 # 17-47','7438759','3103404372','giomy1@hotmail.com','TUNJA','1970-10-26 05:00:00','F',1,'',1,1,2,NULL,3,'active','2024-05-29 17:14:42','2024-05-29 17:14:42',NULL),(101,'CC','41734437','MARIA TERESA ','RODRIGUEZ JUNCO','CARRERA 11 # 17-23','7425514','3153177562','mariat.rodriguez@gmail.com','TUNJA','1970-03-08 05:00:00','F',1,'',1,3,2,NULL,3,'active','2024-05-29 17:15:58','2024-05-29 17:15:58',NULL),(102,'CC','46358190','GLORIA ENITH','OJEDA SUANCHA','CALLE 11 # 8-47','3108123294','3108123294','gloriaenithojeda@yahoo.com','SOGAMOSO','1970-02-08 05:00:00','F',1,'',1,2,2,NULL,3,'active','2024-05-29 17:17:01','2024-05-29 17:17:01',NULL),(103,'CC','46364471','AURA PATRICIA','GARCIA','CARRERA 9A # 14-102','3212326156','3212326156','nuevavisiontuoptica@gmail.com','SOGAMOSO','1970-06-23 05:00:00','F',1,'',1,2,2,NULL,3,'active','2024-05-29 17:18:34','2024-05-29 17:18:34',NULL),(104,'CC','46379270','DIANA ','CEPEDA FONSECA','CARRERA 10 # 14-134','3208015911','3114493349','vision20/20@hotmail.com','SOGAMOSO','1970-02-03 05:00:00','F',1,'',1,2,2,NULL,3,'active','2024-05-29 17:19:59','2024-05-29 17:19:59',NULL),(105,'CC','46386838','GENNY MILDRET','ORJUELA MENDIVELSO','CARRERA 10 # 12-63','7726553','3118534978','opticagmonsogamoso@hotmail.com','SOGAMOSO','1970-06-18 05:00:00','F',1,'',1,2,2,NULL,3,'active','2024-05-29 17:21:05','2024-05-29 17:21:05',NULL),(106,'CC','46453277','YULY ANDREA','SATIVA JAIMES','CARRERA 19 # 15-75','3103314614','3103314614','optimedicalcenter@outlook.com','DUITAMA','1970-07-15 05:00:00','F',1,'',1,2,2,NULL,3,'active','2024-05-29 17:22:10','2024-05-29 17:22:10',NULL),(107,'CC','52249132','NATALIA','GARCIA RUIZ','CALLE 14  # 10-87','7700165','3045972221','tata06@hotmail.com','SOGAMOSO','1980-07-16 05:00:00','F',1,'',1,3,2,NULL,3,'active','2024-05-29 18:09:05','2024-05-29 18:09:05',NULL),(108,'CC','46456338','MAGDA ALEXANDRA','CORREDOR CAMARGO','CALLE 17 # 14-36','7610846','3173814236','magdacorredor316@yahoo.es','DUITAMA','1980-05-09 05:00:00','F',1,'',1,2,2,NULL,3,'active','2024-05-29 18:10:56','2024-05-29 18:10:56',NULL),(109,'CC','46662971','NUBIA ESMERALDA','DIAZ  ESCOBAR','CALLE 20 # 13A-47','3204954093','3204954093','nedevision@gmail.com','DUITAMA','1980-04-25 05:00:00','F',1,'',1,2,2,NULL,3,'active','2024-05-29 18:14:49','2024-05-29 18:14:49',NULL),(110,'CC','46670428','ALEXANDRA ','FAJARDO PRIETO','CARRERA 11 # 17 - 23','7432366','3153906157','fajardoalexandra@gmail.com','TUNJA','1980-09-29 05:00:00','F',1,'',1,2,2,NULL,3,'active','2024-05-29 18:16:16','2024-05-29 18:16:16',NULL),(111,'CC','46670522','FABIOLA','PARRA RAMÍREZ','CALLE 15 # 12-75 LOCAL 211','7627919','3012364320','fabiparra2@hotmail.com','DUITAMA','1980-09-24 05:00:00','F',1,'',1,2,2,NULL,3,'active','2024-05-29 18:17:33','2024-05-29 18:17:33',NULL),(112,'CC','46673590','XIOMARA MILENA ','PARRA CHAPARRO','CENTRO DE ESPECIALIDADES MEDICAS','3103291841','3103291841','xiomypacha@gmail.com','TUNJA','1980-10-09 05:00:00','F',1,'',1,2,2,NULL,3,'active','2024-05-29 18:18:38','2024-05-29 18:18:38',NULL),(113,'CC','46673798','ELIZABETH ','RAMIREZ MERCHAN','CARRERA 14 # 13-72','7603565','3143956500','proversaludvisual316@yahoo.es','DUITAMA','1980-01-03 05:00:00','F',1,'',1,2,2,NULL,3,'active','2024-05-29 18:19:40','2024-05-29 18:19:40',NULL),(114,'CC','46678321','ERIKA','FORERO','OPTISALUD TUNJA','3125709033','3125709033','erikfor22@hotmail.com','TUNJA','0080-10-22 04:56:16','F',1,'',1,3,2,NULL,3,'active','2024-05-29 18:21:24','2024-05-29 18:21:24',NULL),(115,'CC','46681814','CLAUDIA ','VELANDIA','CALLE 25 # 22-18 P3','31024900633','3102490063','claudia_velandia_9@hotmail.com','PAIPA','1980-01-17 05:00:00','F',1,'',1,3,2,NULL,3,'active','2024-05-29 18:22:58','2024-05-29 18:22:58',NULL),(116,'CC','51790164','SANDRA JANETH','MONROY GONZALEZ','CALLE 19 # 8-77','7432166','3174422914','opticavertex@gmail.com','TUNJA','1980-09-02 05:00:00','F',1,'',1,3,2,NULL,3,'active','2024-05-29 18:24:25','2024-05-29 18:24:25',NULL),(117,'CC','51880160','YASMINA','SALGADO PAEZ','CARRERA 15 # 14-58','7620201','3153005002','yasminasalgado@hotmail.com','DUITAMA','1980-10-21 05:00:00','F',2,'',1,3,1,11,3,'active','2024-05-29 18:26:27','2024-05-29 18:26:27',NULL),(118,'CC','51958168','LUISA ALEJANDRA','CASALLAS GUTIÉRREZ','CARRERA 16 # 13 - 52','7606461','3005656605','acasallasg@hotmail.com','DUITAMA','1980-05-21 05:00:00','F',1,'',1,2,2,NULL,3,'active','2024-05-29 18:28:59','2024-05-29 18:28:59',NULL),(119,'CC','52057039','ANA LUCIA','LOPEZ VARGAS','CALLE 11 # 11-32','3138306953','3138306953','anlulv@hotmail.com','SOGAMOSO','1980-12-03 05:00:00','F',1,'',1,2,2,NULL,3,'active','2024-05-29 18:30:46','2024-05-29 18:30:46',NULL),(120,'CC','52201793','NANCY DURLEY','BAUTISTA ROA','CARRERA 15 # 19-74','3136502938','3136502938','nbautistar@hotmail.com','TUNJA','1980-01-01 05:00:00','F',1,'',1,2,2,NULL,3,'active','2024-05-29 18:31:45','2024-05-29 18:31:45',NULL),(121,'CC','52218186','CLAUDIA ','VILLOTA SANCHEZ','CARRERA 1 #  46-49','3224185435','3224185435','optivil@yahoo.es','TUNJA','1980-03-02 05:00:00','F',1,'',1,3,2,NULL,3,'active','2024-05-29 18:33:18','2024-05-29 18:33:18',NULL),(122,'CC','71632253','HERNANDO ','PEREZ FLORES','CARRERA 12 # 18-21','7439064','3124799795','hepeflo@hotmail.com','TUNJA','1980-09-22 05:00:00','M',2,'',1,2,2,NULL,3,'active','2024-05-29 18:35:01','2024-05-29 18:35:01',NULL),(123,'CC','52261693','ZULMA','ACERO TORRES','CALLE 18 # 13-45','3133338026','3133338026','Zacerot@hotmail.com','DUITAMA','1980-11-06 05:00:00','F',1,'',1,2,2,NULL,3,'active','2024-05-29 18:36:04','2024-05-29 18:36:04',NULL),(124,'CC','52263302','SANDRA ','GOMEZ MONTAÑA','MONTURAS Y LENTES','3177143237','3177143237','montulentespao@gmail.com','DUITAMA','1980-02-14 05:00:00','F',2,'',1,3,2,NULL,3,'active','2024-05-29 18:37:45','2024-05-29 18:37:45',NULL),(125,'CC','52267292','JENNIFER','DIAZ VELASQUEZ','CARRERA  12 # 18-21','7439064','3134901637','jendiaz46@hotmail.com','TUNJA','1980-09-05 05:00:00','F',2,'',1,2,2,NULL,3,'active','2024-05-29 18:39:36','2024-05-29 18:39:36',NULL),(126,'CC','52364566','LUZ ANGELICA','VARGAS GOMEZ','CARRERA 11 # 17-66  LC153','3133243315','3133243315','luzkeka02160976@gmail.com','TUNJA','1980-02-16 05:00:00','F',1,'',1,2,2,NULL,3,'active','2024-05-29 18:40:35','2024-05-29 18:40:35',NULL),(127,'CC','52424136','GINA LILIANA','RODRIGUEZ SAENZ','CARRERA 9  # 24-50','310275966','310275966','ginalili@hotmail.com','TUNJA','1980-03-20 05:00:00','F',1,'',1,2,2,NULL,3,'active','2024-05-29 18:43:18','2024-05-29 18:43:18',NULL),(128,'CC','52473347','YEIMIT BRIGITTE','BAUTISTA PEREZ','CALLE 18 # 11-22','3204931803','3204931803','prevision@gmail.com','TUNJA','1980-08-16 05:00:00','F',1,'',1,2,2,NULL,3,'active','2024-05-29 18:45:23','2024-05-29 18:45:23',NULL),(129,'CC','52704123','CAROL ANDREA','VERGARA','CENTRO NORTE LOCAL 7','3114956630','3114956630','andreavergara2@hotmail.com','TUNJA-GARAGOA','0000-00-00 00:00:00','F',2,'',1,2,2,NULL,3,'active','2024-05-29 18:46:41','2024-05-29 18:46:41',NULL),(130,'CC','52704290','NIDIA YAQUELINE','CELY JOYA','CALLE 12 # 12-35 PISO2 SOGAMOSO','3184561590','3184561590','ncely7910@gmail.com','SOGAMOSO','1980-05-10 05:00:00','F',2,'',1,2,2,NULL,3,'active','2024-05-29 18:48:14','2024-05-29 18:48:14',NULL),(131,'CC','52737243','DIANA CAROLINA','GONZALEZ HEREDIA','CALLE 18 # 10-15','7401091','3007588264','OPTICACOC@HOTMAIL.COM','TUNJA','1980-12-14 05:00:00','F',2,'',1,1,2,NULL,3,'active','2024-05-29 18:49:20','2024-05-29 18:49:20',NULL),(132,'CC','52743523','JENNY ','FLOREZ','OPTISALUD DUITAMA','3023266060','3023266060','','DUITAMA','1980-05-13 05:00:00','F',1,'',1,3,2,NULL,3,'active','2024-05-29 18:50:27','2024-05-29 18:50:27',NULL),(133,'CC','52792861','NELCY JOHANNA','ALVARADO QUIJANO','CARRERA 10 # 14 - 56','7702267','3103378056','nelcyalvarado@hotmail.com','SOGAMOSO','1980-03-14 05:00:00','F',2,'',1,1,2,NULL,3,'active','2024-05-29 18:52:59','2024-05-29 18:52:59',NULL),(134,'CC','52967467','MARIA TERESA','MENDIETA MELO','CALLE 6 A # 6-76','3138539712','3138539712','mariamendieta122@hotmail.com','TUNJA-VILLA DE LEIVA','1980-12-08 05:00:00','F',2,'',1,1,2,NULL,3,'active','2024-05-29 18:55:31','2024-05-29 18:55:31',NULL),(135,'CC','53082587','ANA CATALINA ','MARTINEZ NOVA','CARRERA  11 No 24-10','3204629385','3204629385','cata.opt@gmail.com','DUITAMA','1980-03-27 05:00:00','F',1,'',1,3,2,NULL,3,'active','2024-05-29 18:57:00','2024-05-29 18:57:00',NULL),(136,'CC','53121279','ALEXA ROCIO','QUINTERO CASTIBLANCO','CENTRO NORTE','7464025','3105625442','rochy.quintero@gmail.com','TUNJA','1980-11-08 05:00:00','F',1,'',1,3,2,NULL,3,'active','2024-05-29 18:58:53','2024-05-29 18:58:53',NULL),(137,'CC','53139257','CLARA DEL ROSARIO','RODRIGUEZ SUAREZ','CARRERA 9  # 24-50','3187727814','3187727814','opto.clara.rodriguez@gmail.com','TUNJA','1980-01-14 05:00:00','F',2,'',1,3,2,NULL,3,'active','2024-05-29 18:59:47','2024-05-29 18:59:47',NULL),(138,'CC','53153306','RUBY YASMIN','ROSAS ACEVEDO','CARRERA 12 # 12-98 CREDIOPTICAS','3215098302','3215098302','rosas530709@gmail.com','SOGAMOSO','1980-06-09 05:00:00','F',2,'',1,3,2,NULL,3,'active','2024-05-29 19:00:46','2024-05-29 19:00:46',NULL),(139,'CC','63530012','ELIZABETH','RUIZ VARGAS','CALLE 28 # 9-29','3172649344','3172649344','','TUNJA','1980-06-28 05:00:00','F',1,'',1,3,2,NULL,3,'active','2024-05-29 19:02:02','2024-05-29 19:02:02',NULL),(140,'CC','65739035','DIANA PATRICIA','RIVERA HAYEK','CARRERA 11 # 10 -64','7721889','3105700432','','SOGAMOSO','1980-02-05 05:00:00','F',2,'',1,2,1,11,3,'active','2024-05-29 19:03:53','2024-05-29 19:03:53',NULL),(141,'CC','6767287','JORGE ALBERTO','VARGAS BUITRAGO','CARRERA 10 # 17 - 84','7426084','3132657518','jorgeopt_7@hotmail.com','TUNJA','1970-04-30 05:00:00','M',1,'',1,3,2,NULL,3,'active','2024-05-29 19:05:38','2024-05-29 19:05:38',NULL),(142,'CC','7178424','CIRO ALFONSO','CUCAITA ESQUIVEL','CARRERA 9 # 17-21','7430945','3134920749','0ptirislents@gmail.com','TUNJA','1970-11-03 05:00:00','M',2,'',1,2,2,NULL,3,'active','2024-05-29 19:07:47','2024-05-29 19:15:11',NULL),(143,'CC','79286425','HECTOR JULIO','FERNANDEZ RICAURTE','CALLE 15 # 10-41','7715572','3143753736','opticadrfernandez@yahoo.com','SOGAMOSO','1970-06-24 05:00:00','M',1,'',1,3,2,NULL,3,'active','2024-05-29 19:09:38','2024-05-29 19:09:38',NULL),(144,'CC','7187399','ANDRES','BOJACA CASTRO','CARRERA 10   18-57','3142995918','3142995918','abojaca99@unisalle.edu.co','TUNJA','1970-06-30 05:00:00','M',2,'',1,3,2,NULL,3,'active','2024-05-29 19:11:05','2024-05-29 19:11:05',NULL),(145,'CC','72197757','JAIRO ','CORREDOR PUERTO','CARRERA 14 # 16-20','7604450','3133514440','jairocorredorpuerto1@hotmail.com','DUITAMA','1970-01-30 05:00:00','M',2,'',1,2,2,NULL,3,'active','2024-05-29 19:13:06','2024-05-29 19:14:28',NULL),(146,'CC','74080182','OSCAR SANTIAGO','GONZALEZ MARTINEZ','CARRERA 10 # 14-42','7706558','3103415317','opticaultravisionsog@hotmail.com','SOGAMOSO','1970-10-04 05:00:00','M',2,'',1,2,2,NULL,3,'active','2024-05-29 19:14:15','2024-05-29 19:14:15',NULL),(147,'CC','74183533','MANUEL','BUSTACARA ACOSTA','CARRERA 15 # 13-42','3107991118','3107991118','visual-center@hotmail.com','DUITAMA','1970-09-23 05:00:00','M',1,'',1,3,2,NULL,3,'active','2024-05-29 19:16:33','2024-05-29 19:16:33',NULL),(148,'CC','74184267','MAURICIO','PULIDO ALFONSO','','3176682151','3176682151','optopul@gmail.com','DUITAMA','1970-08-09 05:00:00','M',2,'',1,1,2,NULL,3,'active','2024-05-29 19:19:09','2024-05-29 19:19:09',NULL),(149,'CC','74327024','OSCAR ','MARTÍNEZ ACESIO','CALLE 15 N 17 - 36','7613411','3166199998','osfrema@outlook.com','DUITAMA','1970-09-25 05:00:00','M',2,'',1,1,2,NULL,3,'active','2024-05-29 19:20:21','2024-05-29 19:20:21',NULL),(150,'CC','74381570','VICTOR ALFONSO','REYES FORERO','CARRERA 9  14-47','3214886260','3214886260','vialrefo@hotmail.com','SOGAMOSO','1970-06-19 05:00:00','M',2,'',1,2,2,NULL,3,'active','2024-05-29 19:22:30','2024-05-29 19:22:30',NULL),(151,'CC','74382012','ANDRES MAURICIO','MORALES NUÑEZ','C.C INOVO PLAZA','3012913208','3012913208','ocular.center@hotmail.com','DUITAMA','1970-11-28 05:00:00','M',1,'',1,2,2,NULL,3,'active','2024-05-29 19:23:35','2024-05-29 19:23:35',NULL),(152,'CC','77169702','ORLANDO ','USTARIZ GONZALEZ','AVENIDA SUBA # 115-45- TUNJA EDIFICIO ENTERPRISE','4100088','3002647098','orusgo@gmail.com','BOGOTA-TUNJA','1980-05-24 05:00:00','M',2,'',1,3,1,9,3,'active','2024-05-29 19:25:15','2024-05-29 19:25:15',NULL),(153,'CC','79189157','JULIAN EDUARDO ','RAMIREZ ROJAS','CALLE 63 # 18-16','3132816300','3132816300','julianeduardoramirez@gmail.com','SOGAMOSO','0000-00-00 00:00:00','M',2,'',1,1,1,11,3,'active','2024-05-29 19:27:01','2024-05-29 19:27:01',NULL),(154,'CC','79781600','SALIM ABOU ','AMMAR VELANDIA','CALLE 14  # 10-87','7700165','3107890711','zonasalim@hotmail.com.com','SOGAMOSO','1972-03-13 05:00:00','M',2,'',1,3,2,NULL,3,'active','2024-05-29 19:28:11','2024-05-29 19:28:11',NULL),(155,'CC','79849726','IVAN MAURICIO','ARIAS DIAZ','CALLE 17 # 9-30 CONSUTORIO 205','3186757717','3186757717','ivanarias07@gmail.com','TUNJA','1970-03-30 05:00:00','M',1,'',1,2,2,NULL,3,'active','2024-05-29 19:29:24','2024-05-29 19:29:24',NULL),(156,'CC','80088807','JULIAN ANDRES ','TRIANA','CARRERA 17 # 12A-06','3114647636','3114647636','','DUITAMA','1970-09-02 05:00:00','M',2,'',1,2,1,NULL,3,'active','2024-05-29 19:36:30','2024-05-29 19:36:30',NULL),(157,'CC','80199004','CARLOS EDUARDO ','BERMUDEZ MEDINA','OPTISALUD TUNJA','7433367','3008533685','carlos_bm84@hotmail.com','TUNJA','1970-03-15 05:00:00','M',2,'',1,3,1,NULL,3,'active','2024-05-29 19:37:56','2024-05-29 19:37:56',NULL),(158,'CC','80411029','LUIS GIOVANNY','CARDENAS  MATAMOROS','CALLE 20 # 12-89','7431384','3158712867','cardenasvision@mail.com','TUNJA','1970-09-25 05:00:00','M',2,'',1,1,1,11,3,'active','2024-05-29 19:38:56','2024-05-29 19:38:56',NULL),(159,'CE','827308','JORGE LUIS','PADRON CHACIN','TUNJA OPTISALUD','3117536712','3117536712','jpadron88@gmail.com','TUNJA','1980-05-08 05:00:00','M',2,'',1,3,1,11,3,'active','2024-05-29 19:39:52','2024-05-29 19:39:52',NULL),(160,'CE','921662','CARLOS EDUARDO','CASTELLANOS ZAMBRANO','OPTISALUD TUNJA','3138838588','3138838588','solrac_1789@hotmail.com','TUNJA','1970-08-17 05:00:00','M',2,'',1,3,1,NULL,3,'active','2024-05-29 19:41:02','2024-05-29 19:41:02',NULL),(161,'CC','9522554','JORGE ANDRES','FERNANDEZ RICAURTE','DUITAMA','3002108765','3002108765','jafersman@yahoo.es','DUITAMA','1970-11-08 05:00:00','M',2,'',1,3,1,NULL,3,'active','2024-05-29 19:42:06','2024-05-29 19:42:06',NULL),(162,'CC','9522578','SAMUEL','LARA','CARRERA 12 # 11-30','3108066436','3108066436','instituto.ocularsaludsocial@gmail.com','SOGAMOSO','1987-12-04 05:00:00','M',1,'',1,2,2,NULL,3,'active','2024-05-29 19:43:21','2024-05-29 19:43:21',NULL),(163,'CC','9529775','JULIAN HUMBERTO','PARDO MEJIA','CALLE 15 # 16 - 25','7610700','3107637783','opticaspardo.35@gmail.com','SOGAMOSO','1970-11-25 05:00:00','M',2,'',1,2,2,NULL,3,'active','2024-05-29 19:44:22','2024-05-29 19:44:22',NULL),(164,'CC','1018485086','HANNA MICHELLE','ALFONSO GONZALEZ','CARRERA 10 # 14-53','','','hanna.alfonso@hotmail.com','SOGAMOSO','1990-02-25 05:00:00','F',2,'',1,3,2,NULL,3,'active','2024-05-29 19:45:29','2024-05-29 19:45:29',NULL),(165,'CC','40020685','MARIA EUGENIA','VARGAS','CRA 6  47-27','7471146','3204910500','optomaria@hotmail.com','TUNJA','1970-01-26 05:00:00','F',1,'',1,3,2,NULL,3,'active','2024-05-29 20:53:33','2024-05-29 20:53:33',NULL),(166,'CC','1040738595','Jessica','Londoño','cra 67 25-45','3013892222','301322222','comunicaciones@laboratorioophtha.com','Medellín','2006-06-22 05:00:00','F',2,'',1,1,1,6,1,'active','2024-07-23 16:39:48','2024-07-23 16:39:48',NULL),(167,'CC','98568758','Prueba TEST','TEST ADMIN','Cra 1 e','3153998569','3153986594','testprueba@gmail.com','Medellin','2006-07-25 05:00:00',NULL,3,'Comfandi',2,NULL,5,NULL,3,'active','2024-10-03 16:52:17','2024-10-03 16:52:17',NULL),(168,'CC','123456789','prueba 1510','prueba','calle 2 79-35','3106933247','3016929387','juandavid.mejia@servitecssr.com.co','Medellin','1988-10-15 05:00:00','M',3,'',1,3,1,2,1,'active','2024-10-15 14:27:04','2024-10-15 14:27:04','2026-02-17 16:32:24'),(178,'CC','1017172511','Eduardo','Montoya','Carrera 65 No. 29 - 44','3153038888','3615303888','nanis2291@hotmail.com','Itagui','1990-03-21 05:00:00','M',3,NULL,1,1,2,NULL,1,'active','2026-03-12 13:36:45','2026-03-12 13:36:45',NULL),(179,'CC','88888888','JuanD','Echeverri','Dir','3015790000','3015794800','cor@cor.com','Medellín','2008-03-12 05:00:00','M',3,NULL,1,1,4,NULL,1,'active','2026-03-12 13:49:22','2026-04-06 15:02:41',NULL);
/*!40000 ALTER TABLE `third` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `third_classification`
--

DROP TABLE IF EXISTS `third_classification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `third_classification` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `third_classification`
--

LOCK TABLES `third_classification` WRITE;
/*!40000 ALTER TABLE `third_classification` DISABLE KEYS */;
INSERT INTO `third_classification` VALUES (1,'Compra directo Ophtha','active','2024-02-08 04:27:02','2024-02-08 04:27:02',NULL),(2,'Compra por distribuidor','active','2024-02-08 04:27:02','2024-02-08 04:27:02',NULL),(3,'Prescriptor','active','2024-03-12 03:13:22','2024-03-12 03:13:22',NULL),(4,'Tecnólogo Médico','active','2024-03-12 03:13:22','2024-03-12 03:13:22',NULL);
/*!40000 ALTER TABLE `third_classification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `third_specialty`
--

DROP TABLE IF EXISTS `third_specialty`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `third_specialty` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `third_specialty`
--

LOCK TABLES `third_specialty` WRITE;
/*!40000 ALTER TABLE `third_specialty` DISABLE KEYS */;
INSERT INTO `third_specialty` VALUES (1,'Oftalmólogo','active','2024-02-08 04:27:29','2024-02-08 04:27:29',NULL),(2,'Optometra','active','2024-03-12 03:22:31','2024-03-12 03:22:31',NULL),(3,'Residente','active','2024-03-12 03:22:31','2024-03-12 03:22:31',NULL),(4,'Fellow','active','2024-03-12 03:22:31','2024-03-12 03:22:31',NULL),(5,'Dermatólogo','active','2024-03-12 03:22:31','2024-03-12 03:22:31',NULL),(6,'Médico General','active','2024-03-12 03:22:31','2024-03-12 03:22:31',NULL),(7,'Médico Pediatra','active','2024-03-12 03:22:31','2024-03-12 03:22:31',NULL),(8,'Médico Veterinario','active','2024-03-12 03:22:31','2024-03-12 03:22:31',NULL),(9,'Médico Veterinario Oftalmólogo','active','2024-03-12 03:22:31','2024-03-12 03:22:31',NULL),(10,'Otras','active','2024-03-12 03:22:31','2024-03-12 03:22:31',NULL);
/*!40000 ALTER TABLE `third_specialty` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `third_subspecialty`
--

DROP TABLE IF EXISTS `third_subspecialty`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `third_subspecialty` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `specialtyId` int(11) DEFAULT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `specialtyId` (`specialtyId`),
  CONSTRAINT `third_subspecialty_ibfk_1` FOREIGN KEY (`specialtyId`) REFERENCES `third_specialty` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `third_subspecialty`
--

LOCK TABLES `third_subspecialty` WRITE;
/*!40000 ALTER TABLE `third_subspecialty` DISABLE KEYS */;
INSERT INTO `third_subspecialty` VALUES (1,'Oftalmología Integral',1,'active','2024-02-08 04:27:52','2024-02-08 04:27:52',NULL),(2,'Segmento Anterior y Posterior',1,'active','2024-02-08 04:27:52','2024-02-08 04:27:52',NULL),(3,'Retina, Vitreo y Uveítis',1,'active','2024-03-12 03:18:37','2024-03-12 03:18:37',NULL),(4,'Oftalmología Pedíatrica',1,'active','2024-03-12 03:18:37','2024-03-12 03:18:37',NULL),(5,'Estrabismo',1,'active','2024-03-12 03:18:37','2024-03-12 03:18:37',NULL),(6,'Glaucoma',1,'active','2024-03-12 03:18:37','2024-03-12 03:18:37',NULL),(7,'Oculoplastia, Vía lagrimal y Órbita',1,'active','2024-03-12 03:18:37','2024-03-12 03:18:37',NULL),(8,'Oncología Ocular y Tumores Oculares',1,'active','2024-03-12 03:18:37','2024-03-12 03:18:37',NULL),(9,'Córnea',1,'active','2024-03-12 03:18:37','2024-03-12 03:18:37',NULL),(10,'Neuro Oftalmología',1,'active','2024-03-12 03:18:37','2024-03-12 03:18:37',NULL),(11,'Otras',1,'active','2024-03-12 03:18:37','2024-03-12 03:18:37',NULL),(12,'Contactólogo',2,'active','2024-03-12 03:32:27','2024-03-12 03:32:27',NULL),(13,'Otras',2,'active','2024-03-12 03:32:27','2024-03-12 03:32:27',NULL);
/*!40000 ALTER TABLE `third_subspecialty` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `third_type`
--

DROP TABLE IF EXISTS `third_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `third_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `third_type`
--

LOCK TABLES `third_type` WRITE;
/*!40000 ALTER TABLE `third_type` DISABLE KEYS */;
INSERT INTO `third_type` VALUES (1,'Medico','active','2024-02-08 04:29:08','2024-02-08 04:29:08',NULL),(2,'Drogueria','active','2024-02-08 04:29:08','2024-02-08 04:29:08',NULL),(3,'Comercial','active','2024-02-08 04:29:08','2024-02-08 04:29:08',NULL);
/*!40000 ALTER TABLE `third_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `thirds_portfolios`
--

DROP TABLE IF EXISTS `thirds_portfolios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `thirds_portfolios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `portfolioId` int(11) NOT NULL,
  `thirdId` int(11) NOT NULL,
  `approved` tinyint(1) NOT NULL DEFAULT '0',
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `portfolioId` (`portfolioId`),
  KEY `thirdId` (`thirdId`),
  CONSTRAINT `thirds_portfolios_ibfk_1` FOREIGN KEY (`portfolioId`) REFERENCES `portfolios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `thirds_portfolios_ibfk_2` FOREIGN KEY (`thirdId`) REFERENCES `third` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=167 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `thirds_portfolios`
--

LOCK TABLES `thirds_portfolios` WRITE;
/*!40000 ALTER TABLE `thirds_portfolios` DISABLE KEYS */;
INSERT INTO `thirds_portfolios` VALUES (4,2,5,1,'active','2024-03-20 14:35:18','2025-12-16 20:40:36',NULL),(6,3,7,1,'active','2024-05-20 15:14:15','2025-11-06 20:15:28',NULL),(8,3,11,0,'active','2024-05-22 20:41:07','2024-05-22 20:41:07',NULL),(9,3,12,0,'active','2024-05-22 20:42:35','2024-05-22 20:42:35',NULL),(10,3,13,0,'active','2024-05-22 20:44:14','2024-05-22 20:44:14',NULL),(11,3,14,0,'active','2024-05-29 12:41:21','2024-05-29 12:41:21',NULL),(12,3,15,0,'active','2024-05-29 12:50:49','2024-05-29 12:50:49',NULL),(13,3,16,0,'active','2024-05-29 14:06:00','2024-05-29 14:06:00',NULL),(14,3,17,0,'active','2024-05-29 14:09:32','2024-05-29 14:09:32',NULL),(15,3,18,0,'active','2024-05-29 14:10:56','2024-05-29 14:10:56',NULL),(16,3,19,0,'active','2024-05-29 14:18:44','2024-05-29 14:18:44',NULL),(17,3,20,0,'active','2024-05-29 14:19:45','2024-05-29 14:19:45',NULL),(18,3,21,0,'active','2024-05-29 14:21:48','2024-05-29 14:21:48',NULL),(19,3,25,0,'active','2024-05-29 14:26:37','2024-05-29 14:26:37',NULL),(20,3,26,0,'active','2024-05-29 14:30:55','2024-05-29 14:30:55',NULL),(21,3,27,0,'active','2024-05-29 14:32:53','2024-05-29 14:32:53',NULL),(22,3,28,0,'active','2024-05-29 14:38:32','2024-05-29 14:38:32',NULL),(23,3,29,0,'active','2024-05-29 14:44:46','2024-05-29 14:44:46',NULL),(24,3,30,0,'active','2024-05-29 14:46:41','2024-05-29 14:46:41',NULL),(25,3,31,0,'active','2024-05-29 14:49:30','2024-05-29 14:49:30',NULL),(26,3,32,0,'active','2024-05-29 14:51:11','2024-05-29 14:51:11',NULL),(27,3,33,0,'active','2024-05-29 14:53:01','2024-05-29 14:53:01',NULL),(28,3,35,0,'active','2024-05-29 14:54:25','2024-05-29 14:54:25',NULL),(29,3,36,0,'active','2024-05-29 14:55:55','2024-05-29 14:55:55',NULL),(30,3,37,0,'active','2024-05-29 14:58:22','2024-05-29 14:58:22',NULL),(31,3,38,0,'active','2024-05-29 14:59:47','2024-05-29 14:59:47',NULL),(32,3,39,0,'active','2024-05-29 15:01:28','2024-05-29 15:01:28',NULL),(33,3,40,0,'active','2024-05-29 15:03:39','2024-05-29 15:03:39',NULL),(34,3,41,0,'active','2024-05-29 15:08:57','2024-05-29 15:08:57',NULL),(35,3,42,0,'active','2024-05-29 15:10:48','2024-05-29 15:10:48',NULL),(36,3,43,0,'active','2024-05-29 15:14:22','2024-05-29 15:14:22',NULL),(37,3,44,0,'active','2024-05-29 15:16:42','2024-05-29 15:16:42',NULL),(38,3,45,0,'active','2024-05-29 15:18:21','2024-05-29 15:18:21',NULL),(39,3,46,0,'active','2024-05-29 15:19:42','2024-05-29 15:19:42',NULL),(40,3,47,0,'active','2024-05-29 15:21:18','2024-05-29 15:21:18',NULL),(41,3,50,0,'active','2024-05-29 15:24:48','2024-05-29 15:24:48',NULL),(42,3,51,0,'active','2024-05-29 15:26:09','2024-05-29 15:26:09',NULL),(43,3,52,0,'active','2024-05-29 15:28:31','2024-05-29 15:28:31',NULL),(44,3,53,0,'active','2024-05-29 15:30:22','2024-05-29 15:30:22',NULL),(45,3,54,0,'active','2024-05-29 15:31:34','2024-05-29 15:31:34',NULL),(46,3,55,0,'active','2024-05-29 15:32:44','2024-05-29 15:32:44',NULL),(47,3,56,0,'active','2024-05-29 15:34:17','2024-05-29 15:34:17',NULL),(48,3,57,0,'active','2024-05-29 15:36:06','2024-05-29 15:36:06',NULL),(49,3,58,0,'active','2024-05-29 15:37:57','2024-05-29 15:37:57',NULL),(50,3,59,0,'active','2024-05-29 15:38:53','2024-05-29 15:38:53',NULL),(51,3,60,0,'active','2024-05-29 15:41:26','2024-05-29 15:41:26',NULL),(52,3,61,0,'active','2024-05-29 15:42:47','2024-05-29 15:42:47',NULL),(53,3,62,0,'active','2024-05-29 15:44:52','2024-05-29 15:44:52',NULL),(54,3,63,0,'active','2024-05-29 15:49:43','2024-05-29 15:49:43',NULL),(55,3,64,0,'active','2024-05-29 15:55:51','2024-05-29 15:55:51',NULL),(56,3,65,0,'active','2024-05-29 15:57:16','2024-05-29 15:57:16',NULL),(57,3,66,0,'active','2024-05-29 15:58:34','2024-05-29 15:58:34',NULL),(58,3,67,0,'active','2024-05-29 16:01:28','2024-05-29 16:01:28',NULL),(59,3,68,0,'active','2024-05-29 16:03:18','2024-05-29 16:03:18',NULL),(60,3,69,0,'active','2024-05-29 16:04:43','2024-05-29 16:04:43',NULL),(61,3,70,0,'active','2024-05-29 16:06:22','2024-05-29 16:06:22',NULL),(62,3,71,0,'active','2024-05-29 16:08:31','2024-05-29 16:08:31',NULL),(63,3,72,0,'active','2024-05-29 16:09:42','2024-05-29 16:09:42',NULL),(64,3,73,0,'active','2024-05-29 16:10:44','2024-05-29 16:10:44',NULL),(65,3,74,0,'active','2024-05-29 16:12:57','2024-05-29 16:12:57',NULL),(66,3,75,0,'active','2024-05-29 16:14:18','2024-05-29 16:14:18',NULL),(67,3,76,0,'active','2024-05-29 16:15:23','2024-05-29 16:15:23',NULL),(68,3,77,0,'active','2024-05-29 16:19:08','2024-05-29 16:19:08',NULL),(69,3,78,0,'active','2024-05-29 16:21:09','2024-05-29 16:21:09',NULL),(70,3,79,0,'active','2024-05-29 16:22:44','2024-05-29 16:22:44',NULL),(71,3,80,0,'active','2024-05-29 16:23:54','2024-05-29 16:23:54',NULL),(72,3,81,0,'active','2024-05-29 16:28:57','2024-05-29 16:28:57',NULL),(73,3,82,0,'active','2024-05-29 16:30:20','2024-05-29 16:30:20',NULL),(74,3,83,0,'active','2024-05-29 16:32:48','2024-05-29 16:32:48',NULL),(75,3,84,0,'active','2024-05-29 16:33:50','2024-05-29 16:33:50',NULL),(76,3,85,0,'active','2024-05-29 16:34:54','2024-05-29 16:34:54',NULL),(77,3,86,0,'active','2024-05-29 16:36:07','2024-05-29 16:36:07',NULL),(78,3,87,0,'active','2024-05-29 16:37:26','2024-05-29 16:37:26',NULL),(79,3,88,0,'active','2024-05-29 16:38:47','2024-05-29 16:38:47',NULL),(80,3,89,0,'active','2024-05-29 16:41:11','2024-05-29 16:41:11',NULL),(81,3,90,0,'active','2024-05-29 16:43:10','2024-05-29 16:43:10',NULL),(82,3,91,0,'active','2024-05-29 16:48:47','2024-05-29 16:48:47',NULL),(83,3,92,0,'active','2024-05-29 16:50:04','2024-05-29 16:50:04',NULL),(84,3,93,0,'active','2024-05-29 16:52:02','2024-05-29 16:52:02',NULL),(85,3,94,0,'active','2024-05-29 16:53:26','2024-05-29 16:53:26',NULL),(86,3,95,0,'active','2024-05-29 16:58:23','2024-05-29 16:58:23',NULL),(87,3,96,0,'active','2024-05-29 17:02:13','2024-05-29 17:02:13',NULL),(88,3,97,0,'active','2024-05-29 17:06:13','2024-05-29 17:06:13',NULL),(89,3,98,0,'active','2024-05-29 17:07:42','2024-05-29 17:07:42',NULL),(90,3,99,0,'active','2024-05-29 17:10:02','2024-05-29 17:10:02',NULL),(91,3,100,0,'active','2024-05-29 17:14:42','2024-05-29 17:14:42',NULL),(92,3,101,0,'active','2024-05-29 17:15:58','2024-05-29 17:15:58',NULL),(93,3,102,0,'active','2024-05-29 17:17:01','2024-05-29 17:17:01',NULL),(94,3,103,0,'active','2024-05-29 17:18:34','2024-05-29 17:18:34',NULL),(95,3,104,0,'active','2024-05-29 17:19:59','2024-05-29 17:19:59',NULL),(96,3,105,0,'active','2024-05-29 17:21:05','2024-05-29 17:21:05',NULL),(97,3,106,0,'active','2024-05-29 17:22:10','2024-05-29 17:22:10',NULL),(98,3,107,0,'active','2024-05-29 18:09:05','2024-05-29 18:09:05',NULL),(99,3,108,0,'active','2024-05-29 18:10:56','2024-05-29 18:10:56',NULL),(100,3,109,0,'active','2024-05-29 18:14:49','2024-05-29 18:14:49',NULL),(101,3,110,0,'active','2024-05-29 18:16:16','2024-05-29 18:16:16',NULL),(102,3,111,0,'active','2024-05-29 18:17:33','2024-05-29 18:17:33',NULL),(103,3,112,0,'active','2024-05-29 18:18:38','2024-05-29 18:18:38',NULL),(104,3,113,0,'active','2024-05-29 18:19:40','2024-05-29 18:19:40',NULL),(105,3,114,0,'active','2024-05-29 18:21:24','2024-05-29 18:21:24',NULL),(106,3,115,0,'active','2024-05-29 18:22:58','2024-05-29 18:22:58',NULL),(107,3,116,0,'active','2024-05-29 18:24:25','2024-05-29 18:24:25',NULL),(108,3,117,0,'active','2024-05-29 18:26:27','2024-05-29 18:26:27',NULL),(109,3,118,0,'active','2024-05-29 18:28:59','2024-05-29 18:28:59',NULL),(110,3,119,0,'active','2024-05-29 18:30:46','2024-05-29 18:30:46',NULL),(111,3,120,0,'active','2024-05-29 18:31:45','2024-05-29 18:31:45',NULL),(112,3,121,0,'active','2024-05-29 18:33:18','2024-05-29 18:33:18',NULL),(113,3,122,0,'active','2024-05-29 18:35:01','2024-05-29 18:35:01',NULL),(114,3,123,0,'active','2024-05-29 18:36:04','2024-05-29 18:36:04',NULL),(115,3,124,0,'active','2024-05-29 18:37:45','2024-05-29 18:37:45',NULL),(116,3,125,0,'active','2024-05-29 18:39:36','2024-05-29 18:39:36',NULL),(117,3,126,0,'active','2024-05-29 18:40:35','2024-05-29 18:40:35',NULL),(118,3,127,0,'active','2024-05-29 18:43:18','2024-05-29 18:43:18',NULL),(119,3,128,0,'active','2024-05-29 18:45:23','2024-05-29 18:45:23',NULL),(120,3,129,0,'active','2024-05-29 18:46:41','2024-05-29 18:46:41',NULL),(121,3,130,0,'active','2024-05-29 18:48:14','2024-05-29 18:48:14',NULL),(122,3,131,0,'active','2024-05-29 18:49:20','2024-05-29 18:49:20',NULL),(123,3,132,0,'active','2024-05-29 18:50:27','2024-05-29 18:50:27',NULL),(124,3,133,0,'active','2024-05-29 18:52:59','2024-05-29 18:52:59',NULL),(125,3,134,0,'active','2024-05-29 18:55:31','2024-05-29 18:55:31',NULL),(126,3,135,0,'active','2024-05-29 18:57:00','2024-05-29 18:57:00',NULL),(127,3,136,0,'active','2024-05-29 18:58:53','2024-05-29 18:58:53',NULL),(128,3,137,0,'active','2024-05-29 18:59:47','2024-05-29 18:59:47',NULL),(129,3,138,0,'active','2024-05-29 19:00:46','2024-05-29 19:00:46',NULL),(130,3,139,0,'active','2024-05-29 19:02:02','2024-05-29 19:02:02',NULL),(131,3,140,0,'active','2024-05-29 19:03:53','2024-05-29 19:03:53',NULL),(132,3,141,0,'active','2024-05-29 19:05:38','2024-05-29 19:05:38',NULL),(133,3,142,0,'active','2024-05-29 19:07:47','2024-05-29 19:07:47',NULL),(134,3,143,0,'active','2024-05-29 19:09:38','2024-05-29 19:09:38',NULL),(135,3,144,0,'active','2024-05-29 19:11:05','2024-05-29 19:11:05',NULL),(136,3,145,0,'active','2024-05-29 19:13:06','2024-05-29 19:13:06',NULL),(137,3,146,0,'active','2024-05-29 19:14:15','2024-05-29 19:14:15',NULL),(138,3,147,0,'active','2024-05-29 19:16:33','2024-05-29 19:16:33',NULL),(139,3,148,0,'active','2024-05-29 19:19:09','2024-05-29 19:19:09',NULL),(140,3,149,0,'active','2024-05-29 19:20:21','2024-05-29 19:20:21',NULL),(141,3,150,0,'active','2024-05-29 19:22:30','2024-05-29 19:22:30',NULL),(142,3,151,0,'active','2024-05-29 19:23:35','2024-05-29 19:23:35',NULL),(143,3,152,0,'active','2024-05-29 19:25:15','2024-05-29 19:25:15',NULL),(144,3,153,0,'active','2024-05-29 19:27:01','2024-05-29 19:27:01',NULL),(145,3,154,0,'active','2024-05-29 19:28:11','2024-05-29 19:28:11',NULL),(146,3,155,0,'active','2024-05-29 19:29:24','2024-05-29 19:29:24',NULL),(147,3,156,0,'active','2024-05-29 19:36:30','2024-05-29 19:36:30',NULL),(148,3,157,0,'active','2024-05-29 19:37:56','2024-05-29 19:37:56',NULL),(149,3,158,0,'active','2024-05-29 19:38:56','2024-05-29 19:38:56',NULL),(150,3,159,0,'active','2024-05-29 19:39:52','2024-05-29 19:39:52',NULL),(151,3,160,0,'active','2024-05-29 19:41:02','2024-05-29 19:41:02',NULL),(152,3,161,0,'active','2024-05-29 19:42:06','2024-05-29 19:42:06',NULL),(153,3,162,0,'active','2024-05-29 19:43:21','2024-05-29 19:43:21',NULL),(154,3,163,0,'active','2024-05-29 19:44:22','2024-05-29 19:44:22',NULL),(155,3,164,0,'active','2024-05-29 19:45:29','2024-05-29 19:45:29',NULL),(156,3,165,0,'active','2024-05-29 20:53:33','2024-05-29 20:53:33',NULL),(157,3,166,1,'active','2024-07-23 16:39:48','2024-07-23 16:39:48',NULL),(159,2,167,1,'active','2024-10-03 17:26:41','2025-12-16 20:40:36',NULL),(163,6,158,1,'active','2026-03-12 05:25:30','2026-03-12 05:25:30',NULL),(164,7,158,1,'active','2026-03-12 05:25:58','2026-03-12 05:26:32',NULL),(165,6,179,1,'active','2026-03-12 13:55:10','2026-03-12 13:55:10',NULL),(166,8,179,0,'active','2026-03-17 00:39:19','2026-03-17 00:39:19',NULL);
/*!40000 ALTER TABLE `thirds_portfolios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `type_events`
--

DROP TABLE IF EXISTS `type_events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `type_events` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `type_events`
--

LOCK TABLES `type_events` WRITE;
/*!40000 ALTER TABLE `type_events` DISABLE KEYS */;
INSERT INTO `type_events` VALUES (1,'Inasistencia','active','2024-02-20 01:10:37','2024-02-20 01:10:37',NULL),(2,'Plan de trabajo','active','2024-02-20 01:10:37','2024-02-20 01:10:37',NULL);
/*!40000 ALTER TABLE `type_events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_classification`
--

DROP TABLE IF EXISTS `user_classification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_classification` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_classification`
--

LOCK TABLES `user_classification` WRITE;
/*!40000 ALTER TABLE `user_classification` DISABLE KEYS */;
INSERT INTO `user_classification` VALUES (1,'Administrador','active','2024-02-08 04:29:35','2024-02-08 04:29:35',NULL),(2,'Representante','active','2024-03-15 04:56:14','2024-03-15 04:56:14',NULL),(3,'Superadmin','active','2026-03-17 18:24:29','2026-03-17 18:24:29',NULL);
/*!40000 ALTER TABLE `user_classification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(25) NOT NULL,
  `lastName` varchar(25) NOT NULL,
  `email` varchar(120) NOT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `mobile` varchar(15) DEFAULT NULL,
  `password` varchar(180) NOT NULL,
  `category` varchar(50) DEFAULT NULL,
  `classificationId` int(11) NOT NULL,
  `regionId` int(11) NOT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `shortcuts` longtext,
  `userClassificationId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `classificationId` (`classificationId`),
  KEY `regionId` (`regionId`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`classificationId`) REFERENCES `user_classification` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_2` FOREIGN KEY (`regionId`) REFERENCES `region` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Jhordan A','Rodriguez','jrodriguez@codemasterdev.co','','','$2a$10$DDIHmvlXjgdWI0Wp30uoIO4cxbutcvQezehjpnJPxFVYKqL0wYe/2','',1,1,'active','2024-02-08 03:55:42','2025-08-29 23:19:23',NULL,'[\"reports-component\"]',0),(2,'Cesar ','Mendoza','cesar@gmail.com','','','$2a$10$EfWwdJehzk7QNKa0F1CoBewu6N1TO2EmthtyEaj6jwq.kEWBGq.CO','',2,1,'active','2024-02-08 03:55:42','2024-05-21 18:44:32',NULL,'[]',0),(3,'Jhordan','Rodriguez','jhordan.alexis1@gmail.com',NULL,'','$2a$10$cVt22oFjVPBOL6Uuxt7QnenMmNoUfB9l6Bz5B/VOoudU3tAVPN5TS','',2,14,'active','2024-03-18 18:54:53','2024-03-18 18:54:53',NULL,'[]',0),(4,'Luisa ','Castaño','analista.comercial@laboratorioophtha.com','3006280282','3006280282','$2a$10$5rFg4t7Ob5cL8KCB8XrUguKiU9LXUYrM3HJ/lcUXoRcxdIZ6BEH36','',1,1,'active','2024-03-22 19:59:29','2024-03-22 19:59:29',NULL,'[]',0),(6,'Angel','Tenjo','gabriel.tenjo@laboratorioophtha.com','3102275919','3102275919','$2a$10$kB5q4izAHjIFc2JHBa9/Cu873NZGcD01jQDXKkKkn4BZAqO2OHjs6','Junior',2,3,'active','2024-03-22 20:01:27','2024-05-20 15:04:44',NULL,'[]',0),(7,'Sistemas','Ophtha','sistemas@laboratorioophtha.com','','','$2a$10$z7YZHlZrj83i.xpA9Z.3BO/07ldG/ruf6OpFayu2F5LJyHG52FJkm',NULL,1,1,'active','2024-05-07 13:37:15','2025-04-22 13:52:23',NULL,'[]',0),(8,'Cindy','Rincon','cindy.rincon@laboratorioophtha.com','318 3775491','318 3775491','$2a$10$ZBaboXvdivhwJp9RuXUxteeWV2Q/gJzoqih2ulIm8/yDip3N7KP96',NULL,2,13,'active','2024-05-28 13:22:35','2024-05-28 13:22:35',NULL,'[]',0),(12,'Johana ','Londoño Muñoz','comunicaciones@laboratorioophtha.com','3153031818','3153031818','$2a$10$Pnsb3V01E5MipVY/Hc0QMOjHrT69d74FpygxadHed.CRv9Z2UxrmW',NULL,1,1,'active','2024-06-11 14:36:47','2025-09-01 15:35:33',NULL,'[]',0),(15,'Todo','Venta','gerencia@todoventa.com','3045558469','3045558469','$2a$10$kJ2RUdKd8RRuH7G1wE0NxuXRunIq.lW2pOY2LzDeqXXSg/mWtXEP.','Junior',2,1,'active','2026-01-20 14:43:50','2026-01-20 14:43:50',NULL,NULL,NULL),(17,'Juan Diego','Echeverri','jecheverri@cidenet.com.co','301 5794837','301 5794837','$2a$10$aldz8u93TjCHnqKC4TIKR.LsfCgOFRVtiGL9XZ/HJlWj7xB0A/bk6','Coordinador',1,1,'active','2026-03-09 16:04:01','2026-03-17 00:10:22',NULL,NULL,NULL),(18,'Juan Diego','Echeverri','jdecheverrimesa@gmail.com','3015794837','3015794837','$2a$10$2O5rQ9y6KWx5Um08YIWx7.BY0tvBfZWMpgEZG47vQP8jicbCNFuii','Junior',2,1,'active','2026-03-09 16:08:52','2026-03-17 00:10:58',NULL,NULL,NULL),(19,'Juan','Mesa','dosecheverris@gmail.com','3015790000','3015794800','$2a$10$s5QzJrRVGlpoWXnQQKz6OuqScMDfxFO.S3KfQItCGjxajX2TkZEDC','Coordinador',2,1,'active','2026-03-17 00:18:01','2026-03-17 00:18:01',NULL,NULL,NULL),(22,'Hector ','Alvarez','gerencia@siev.co','3175025238','3175025238','$2a$10$mtswr7PNwHYQtN4RdAYVVe3XDFksbN9n7ZkGOByTE8KRyKeudjPPi','Coordinador',1,1,'active','2026-04-06 14:44:50','2026-04-06 14:44:50',NULL,NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `visits`
--

DROP TABLE IF EXISTS `visits`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `visits` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `typeId` int(11) NOT NULL,
  `thirdId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `objective` text NOT NULL,
  `comment` text,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `typeId` (`typeId`),
  KEY `thirdId` (`thirdId`),
  KEY `userId` (`userId`),
  CONSTRAINT `visits_ibfk_1` FOREIGN KEY (`typeId`) REFERENCES `third_type` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `visits_ibfk_2` FOREIGN KEY (`thirdId`) REFERENCES `third` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `visits_ibfk_3` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visits`
--

LOCK TABLES `visits` WRITE;
/*!40000 ALTER TABLE `visits` DISABLE KEYS */;
INSERT INTO `visits` VALUES (1,2,5,3,'2024-03-20 11:30:00','Visita almacen','Visita almacen','active','2024-03-20 14:35:53','2024-03-20 14:35:53',NULL),(2,1,2,1,'2024-04-18 12:15:00','Visita prueba','Visita prueba 2','active','2024-04-18 22:48:27','2024-08-05 17:21:36',NULL),(3,1,2,2,'2024-04-18 13:30:00','>Test pruebas','>Test pruebas','active','2024-04-18 22:55:25','2024-08-28 03:06:06',NULL),(4,1,6,6,'2024-04-11 15:00:00','Visita médica','Prueba','active','2024-05-20 15:06:15','2024-05-20 15:08:11',NULL),(5,1,6,6,'2024-04-24 15:00:00','Visita # 2','Visita médica','active','2024-05-20 15:08:53','2024-05-20 15:08:53',NULL),(6,1,6,6,'2024-05-09 15:00:00','Prueba','Prueba','active','2024-05-20 15:09:48','2024-05-20 15:09:48',NULL),(7,1,6,6,'2024-05-20 15:00:00','Prueba','Prueba','active','2024-05-20 15:10:24','2024-06-11 14:27:31',NULL),(8,1,12,6,'2024-06-07 05:00:00','prueba 11/06/2024','prueba 11/06/2024','active','2024-06-11 14:28:25','2024-06-11 14:28:25',NULL),(9,1,7,6,'2024-07-24 05:00:00','Prueba 5 de julio','prueba','active','2024-07-05 16:52:05','2024-07-23 16:34:02',NULL),(10,1,47,6,'2024-07-05 05:00:00','prueba 5 de julio','prueba','active','2024-07-05 16:52:35','2024-07-05 16:52:35',NULL),(11,1,6,6,'2024-07-05 05:00:00','prueba','','active','2024-07-05 17:09:21','2024-07-05 17:09:21',NULL),(12,1,6,6,'2024-07-05 05:00:00','prueba','','active','2024-07-05 17:14:43','2024-07-05 17:14:43',NULL),(13,3,3,2,'2024-07-11 05:00:00','prueba s','pruebas','active','2024-07-11 12:46:10','2024-08-28 03:06:00',NULL),(14,1,2,2,'2024-07-11 05:00:00','prueba','prueba','active','2024-07-11 12:46:49','2024-07-11 12:46:49',NULL),(15,3,4,2,'2024-07-11 05:00:00','dbdb','test','active','2024-07-11 12:47:40','2024-08-05 16:19:52',NULL),(16,3,3,2,'2024-10-04 05:00:00','visita cliente','visita cliente','active','2024-10-03 17:19:00','2024-10-03 17:19:00',NULL),(17,1,2,2,'2024-10-15 05:00:00','venta','ventab tdwta f','active','2024-10-15 14:31:21','2024-10-15 14:31:38',NULL),(18,1,179,18,'2026-03-13 05:00:00','Prueba','Prueba','active','2026-03-12 13:55:32','2026-03-12 13:55:32',NULL);
/*!40000 ALTER TABLE `visits` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `workplans`
--

DROP TABLE IF EXISTS `workplans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `workplans` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `typeEventId` int(11) DEFAULT NULL,
  `startDate` datetime NOT NULL,
  `endDate` datetime NOT NULL,
  `description` text NOT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `typeEventId` (`typeEventId`),
  CONSTRAINT `workplans_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `workplans_ibfk_2` FOREIGN KEY (`typeEventId`) REFERENCES `type_events` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `workplans`
--

LOCK TABLES `workplans` WRITE;
/*!40000 ALTER TABLE `workplans` DISABLE KEYS */;
INSERT INTO `workplans` VALUES (1,2,1,'2024-03-20 11:00:00','2024-03-20 11:00:00','vacaciones x','active','2024-03-20 12:07:51','2024-08-28 03:05:22',NULL),(2,2,2,'2024-03-20 05:00:00','2024-03-20 05:00:00','trabajo completo x\nDSVSV','active','2024-03-20 12:08:39','2024-08-28 03:05:16',NULL),(3,2,2,'2024-04-02 05:00:00','2024-04-02 05:00:00','Antioquia d','active','2024-03-20 12:23:16','2024-08-28 03:04:25',NULL),(4,2,2,'2024-03-03 05:00:00','2024-03-03 05:00:00','esgdh ','active','2024-03-20 12:24:36','2024-03-20 12:24:36',NULL),(5,2,2,'2024-03-20 05:00:00','2024-03-20 05:00:00','rxctvbnmxx','active','2024-03-20 12:35:48','2024-08-28 03:04:58',NULL),(6,2,2,'2024-03-31 05:00:00','2024-03-31 17:00:00','sdxfcvbnm,','active','2024-03-20 12:39:19','2024-03-20 12:39:19',NULL),(7,2,1,'2024-03-31 05:00:00','2024-03-31 05:00:00','prueba xxxxz s','active','2024-03-20 12:44:00','2024-08-28 03:09:51',NULL),(8,1,1,'2024-03-22 05:00:00','2024-03-22 17:30:00','prueba','active','2024-03-20 13:34:15','2024-03-20 13:34:15',NULL),(9,6,2,'2024-07-08 13:00:00','2024-07-08 05:00:00','Dra. XX','active','2024-07-05 17:19:00','2024-07-05 17:19:00',NULL),(10,6,1,'2024-07-03 12:00:00','2024-07-03 12:00:00','DIA DE LA FAMILIA ','active','2024-07-05 17:51:13','2024-08-28 03:03:55',NULL),(11,1,1,'2024-08-06 05:00:00','2024-08-06 05:00:00',' test ina aa ss','active','2024-08-05 16:26:36','2024-08-05 16:38:14',NULL),(12,2,2,'2024-08-28 05:00:00','2024-08-28 05:00:00','Cesar ds','active','2024-08-28 03:08:55','2024-08-28 03:09:19',NULL),(13,2,1,'2024-06-04 05:00:00','2024-06-04 05:00:00','cesa vaca','active','2024-08-28 03:10:14','2024-08-28 03:10:14',NULL),(14,2,1,'2024-10-15 11:00:00','2024-10-18 11:00:00','Test Inasistencia','active','2024-10-03 17:21:39','2024-10-03 17:21:39',NULL),(15,2,2,'2024-10-04 12:30:00','2024-10-04 23:00:00','Plan de trabajo','active','2024-10-03 17:22:28','2024-10-03 17:22:28',NULL),(16,17,2,'2026-03-13 05:00:00','2026-03-19 05:00:00','Plan Semana','active','2026-03-12 05:50:10','2026-03-12 05:50:10',NULL),(17,17,2,'2026-02-22 05:00:00','2026-02-27 05:00:00','Plan de Trabajo Febrero','active','2026-03-12 12:52:15','2026-03-12 12:52:15',NULL),(18,18,2,'2026-02-08 05:00:00','2026-02-13 05:00:00','Plan febrero','active','2026-03-17 00:14:54','2026-03-17 00:14:54',NULL);
/*!40000 ALTER TABLE `workplans` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-06-05 13:53:41
