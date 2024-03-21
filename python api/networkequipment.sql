-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 21, 2024 at 08:22 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `networkequipment`
--

-- --------------------------------------------------------

--
-- Table structure for table `equipment`
--

CREATE TABLE `equipment` (
  `id` int(255) NOT NULL,
  `proid` varchar(255) NOT NULL,
  `serial` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `mac` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `status_stock` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `lot_stock` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `price` double DEFAULT NULL,
  `brand` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `model` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `project` varchar(255) CHARACTER SET utf32 COLLATE utf32_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `equipment`
--

INSERT INTO `equipment` (`id`, `proid`, `serial`, `mac`, `status_stock`, `lot_stock`, `price`, `brand`, `model`, `project`) VALUES
(2, '697169327582', 'G1S09L3001793', '', 'sold out', '11/3/2567', 3100, 'reyee', 'RG-ES210GS-P', 'เวียงพางคำ'),
(3, '697169327582', 'G1S09L3001181', '', 'sold out', '11/3/2567', 3100, 'reyee', 'RG-ES210GS-P', 'เวียงพางคำ'),
(4, '697169327582', 'G1S09L3001304', '', 'sold out', '11/3/2567', 3100, 'reyee', 'RG-ES210GS-P', 'เวียงพางคำ'),
(5, 'GJJMHI802286\r\n', 'FHTT9D7EC8F8\r\n', '', 'sold out', '11/3/2567', 3100, 'reyee', 'RG-ES210GS-P', NULL),
(20, '', 'ZASB1JC018187', '', 'in stock', '21/3/2567', 6527, 'Ruijie', 'RG-ES218GC-P', NULL),
(21, '', 'ZASC00V010285', '', 'in stock', '21/3/2567', 6527, 'Ruijie', 'RG-ES218GC-P', NULL),
(22, '', 'ZASC00V01027B', '', 'in stock', '21/3/2567', 6527, 'Ruijie', 'RG-ES218GC-P', NULL),
(23, '', 'ZASC00V009468', '', 'in stock', '21/3/2567', 6527, 'Ruijie', 'RG-ES218GC-P', NULL),
(24, '', 'G1S09L3001937', '', 'in stock', '21/3/2567', 3100, 'Ruijie', 'RG-ES210GS-P', NULL),
(25, '', 'G1S09L300199A', '', 'in stock', '21/3/2567', 3100, 'Ruijie', 'RG-ES210GS-P', NULL),
(26, '', 'G1S09L300152C', '', 'in stock', '21/3/2567', 3100, 'Ruijie', 'RG-ES210GS-P', NULL),
(27, '', 'G1S09L3001633', '', 'in stock', '21/3/2567', 3100, 'Ruijie', 'RG-ES210GS-P', NULL),
(28, '', 'G1S09L000157B', '', 'in stock', '21/3/2567', 1840, 'Ruijie', 'RG-ES206GS-P', NULL),
(29, '', 'G1S09L000279B', '', 'in stock', '21/3/2567', 1840, 'Ruijie', 'RG-ES206GS-P', NULL),
(30, '', 'G1S09L0002759', '', 'in stock', '21/3/2567', 1840, 'Ruijie', 'RG-ES206GS-P', NULL),
(31, '', 'G1SUBKC075141', '', 'in stock', '21/3/2567', 2098, 'Reyee', 'RG-RAP2200E', NULL),
(32, '', 'G1SUBKC07524B', '', 'in stock', '21/3/2567', 2098, 'Reyee', 'RG-RAP2200E', NULL),
(33, '', 'G1SUBKC08239B', '', 'in stock', '21/3/2567', 2098, 'Reyee', 'RG-RAP2200E', NULL),
(34, '', 'G1SUBKC075424', '', 'in stock', '21/3/2567', 2098, 'Reyee', 'RG-RAP2200E', NULL),
(35, '', 'G1SUBKC079882', '', 'in stock', '21/3/2567', 2098, 'Reyee', 'RG-RAP2200E', NULL),
(36, '', 'G1SUBKC075116', '', 'in stock', '21/3/2567', 2098, 'Reyee', 'RG-RAP2200E', NULL),
(37, '', 'G1SUBKC075002', '', 'in stock', '21/3/2567', 2098, 'Reyee', 'RG-RAP2200E', NULL),
(38, '', 'G1SUBKC077961', '', 'in stock', '21/3/2567', 2098, 'Reyee', 'RG-RAP2200E', NULL),
(39, '', 'G1SUBKC075044', '', 'in stock', '21/3/2567', 2098, 'Reyee', 'RG-RAP2200E', NULL),
(40, '', 'G1SUBKC075213', '', 'in stock', '21/3/2567', 2098, 'Reyee', 'RG-RAP2200E', NULL),
(41, '', 'G1SUBKC074174', '', 'in stock', '21/3/2567', 2098, 'Reyee', 'RG-RAP2200E', NULL),
(42, '', 'G1SUBKC076475', '', 'in stock', '21/3/2567', 2098, 'Reyee', 'RG-RAP2200E', NULL),
(43, '', 'G1SUBKC07416A', '', 'in stock', '21/3/2567', 2098, 'Reyee', 'RG-RAP2200E', NULL),
(44, '', 'G1SUBKC074149', '', 'in stock', '21/3/2567', 2098, 'Reyee', 'RG-RAP2200E', NULL),
(45, '', 'G1SUBKC076551', '', 'in stock', '21/3/2567', 2098, 'Reyee', 'RG-RAP2200E', NULL),
(46, '', 'G1SUBKC07648C', '', 'in stock', '21/3/2567', 2098, 'Reyee', 'RG-RAP2200E', NULL),
(47, '', 'G1SUBKC075732', '', 'in stock', '21/3/2567', 2098, 'Reyee', 'RG-RAP2200E', NULL),
(48, '', 'G1SUBKC07400A', '', 'in stock', '21/3/2567', 2098, 'Reyee', 'RG-RAP2200E', NULL),
(49, '', 'G1SUBKC074512', '', 'in stock', '21/3/2567', 2098, 'Reyee', 'RG-RAP2200E', NULL),
(50, '', 'G1SUBKC074132', '', 'in stock', '21/3/2567', 2098, 'Reyee', 'RG-RAP2200E', NULL),
(51, '', 'G1SUBKC074482', '', 'in stock', '21/3/2567', 2098, 'Reyee', 'RG-RAP2200E', NULL),
(52, '', 'G1SUBKC074415', '', 'in stock', '21/3/2567', 2098, 'Reyee', 'RG-RAP2200E', NULL),
(53, '', 'G1SUBKC079342', '', 'in stock', '21/3/2567', 2098, 'Reyee', 'RG-RAP2200E', NULL),
(54, '', 'G1SUBKC074719', '', 'in stock', '21/3/2567', 2098, 'Reyee', 'RG-RAP2200E', NULL),
(55, '', 'G1SUBKC07458C', '', 'in stock', '21/3/2567', 2098, 'Reyee', 'RG-RAP2200E', NULL),
(56, '', 'G1SUBKC07437B', '', 'in stock', '21/3/2567', 2098, 'Reyee', 'RG-RAP2200E', NULL),
(57, '', 'G1SUBKC07442C', '', 'in stock', '21/3/2567', 2098, 'Reyee', 'RG-RAP2200E', NULL),
(58, '', 'G1SUBKC074668', '', 'in stock', '21/3/2567', 2098, 'Reyee', 'RG-RAP2200E', NULL),
(59, '', 'G1SUBKC074499', '', 'in stock', '21/3/2567', 2098, 'Reyee', 'RG-RAP2200E', NULL),
(60, '', 'G1SUBKC074478', '', 'in stock', '21/3/2567', 2098, 'Reyee', 'RG-RAP2200E', NULL),
(61, '', 'G1SUBKC073971', '', 'in stock', '21/3/2567', 2098, 'Reyee', 'RG-RAP2200E', NULL),
(62, '', 'G1SUBKC073904', '', 'in stock', '21/3/2567', 2098, 'Reyee', 'RG-RAP2200E', NULL),
(63, '', 'G1SUBKC07367A', '', 'in stock', '21/3/2567', 2098, 'Reyee', 'RG-RAP2200E', NULL),
(64, '', 'G1SUBKC074786', '', 'in stock', '21/3/2567', 2098, 'Reyee', 'RG-RAP2200E', NULL),
(65, '', 'G1SUBKC073895', '', 'in stock', '21/3/2567', 2098, 'Reyee', 'RG-RAP2200E', NULL),
(66, '', 'G1SUBKC073807', '', 'in stock', '21/3/2567', 2098, 'Reyee', 'RG-RAP2200E', NULL),
(67, '', 'G1SUBKC074081', '', 'in stock', '21/3/2567', 2098, 'Reyee', 'RG-RAP2200E', NULL),
(68, '', 'G1SUBKC073874', '', 'in stock', '21/3/2567', 2098, 'Reyee', 'RG-RAP2200E', NULL),
(69, '', 'G1SUBKC073798', '', 'in stock', '21/3/2567', 2098, 'Reyee', 'RG-RAP2200E', NULL),
(70, '', 'G1SUBKC079785', '', 'in stock', '21/3/2567', 2098, 'Reyee', 'RG-RAP2200E', NULL),
(71, '', 'G1SUBKC074554', '', 'in stock', '21/3/2567', 2098, 'Reyee', 'RG-RAP2200E', NULL),
(72, '', 'G1SUBKC07454A', '', 'in stock', '21/3/2567', 2098, 'Reyee', 'RG-RAP2200E', NULL),
(73, '', 'G1SUBKC074651', '', 'in stock', '21/3/2567', 2098, 'Reyee', 'RG-RAP2200E', NULL),
(74, '', 'G1SUBKC074841', '', 'in stock', '21/3/2567', 2098, 'Reyee', 'RG-RAP2200E', NULL),
(75, '', 'G1SUBKC074533', '', 'in stock', '21/3/2567', 2098, 'Reyee', 'RG-RAP2200E', NULL),
(76, '', '23AI100636', '', 'in stock', '21/3/2567', 1850, 'Cleanline', 'AI-800', NULL),
(77, '', '23AI100642', '', 'in stock', '21/3/2567', 1850, 'Cleanline', 'AI-800', NULL),
(78, '', '23AI100626', '', 'in stock', '21/3/2567', 1850, 'Cleanline', 'AI-800', NULL),
(79, '', '23AI100645', '', 'in stock', '21/3/2567', 1850, 'Cleanline', 'AI-800', NULL),
(80, '', '23AI100637', '', 'in stock', '21/3/2567', 1850, 'Cleanline', 'AI-800', NULL),
(81, '', '23AI100641', '', 'in stock', '21/3/2567', 1850, 'Cleanline', 'AI-800', NULL),
(82, '', '23AI100671', '', 'in stock', '21/3/2567', 1850, 'Cleanline', 'AI-800', NULL),
(83, '', '23AI100631', '', 'in stock', '21/3/2567', 1850, 'Cleanline', 'AI-800', NULL),
(84, '', '23AI100638', '', 'in stock', '21/3/2567', 1850, 'Cleanline', 'AI-800', NULL),
(85, '', '23AI100648', '', 'in stock', '21/3/2567', 1850, 'Cleanline', 'AI-800', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `ribraly`
--

CREATE TABLE `ribraly` (
  `id` int(255) NOT NULL,
  `ProId` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `Brand` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `Model` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `ribraly`
--

INSERT INTO `ribraly` (`id`, `ProId`, `Brand`, `Model`) VALUES
(1, '697169327582', 'reyee', 'RG-ES210GS-P');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `equipment`
--
ALTER TABLE `equipment`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ribraly`
--
ALTER TABLE `ribraly`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `equipment`
--
ALTER TABLE `equipment`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=86;

--
-- AUTO_INCREMENT for table `ribraly`
--
ALTER TABLE `ribraly`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
