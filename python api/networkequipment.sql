-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 15, 2024 at 10:56 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.1.25

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
(2, '697169327582', 'G1S09L3001793', '', 'in stock', '11/3/2567', 5000, 'reyee', 'RG-ES210GS-P', 'เวียงพางคำ'),
(3, '697169327582', 'G1S09L3001181', '', 'in stock', '11/3/2567', 5000, 'reyee', 'RG-ES210GS-P', 'เวียงพางคำ'),
(4, '697169327582', 'G1S09L3001304', '', 'in stock', '11/3/2567', 5000, 'reyee', 'RG-ES210GS-P', 'เวียงพางคำ'),
(5, 'GJJMHI802286\r\n', 'FHTT9D7EC8F8\r\n', '', 'in stock', '11/3/2567', 5000, 'reyee', 'RG-ES210GS-P', NULL),
(6, 'AABB', '56789', '56789', 'in stock', '2/5/2567', 1500, 'Thankyou', 'Goodbye', 'ProjectA'),
(11, 'test', 'test', 'test', 'test', 'test', 1500, 'test1', 'test1', 'test'),
(16, '34', '34', '34', '34', '34', 34, '34', '34', '34'),
(18, '45', '45', '45', '45', '45', 45, '45', '45', '45'),
(19, '54', '54', '54', '54', '54', 54, '54', '54', '54'),
(20, '55', '55', '55', '55', '55', 55, '55', '55', '55'),
(21, '11', '66', '22', 'in stock', '88', 55, '33', '44', '77'),
(22, '22', '22', '22', 'in stock', '', 22, '22', '22', '22');

-- --------------------------------------------------------

--
-- Table structure for table `library`
--

CREATE TABLE `library` (
  `id` int(255) NOT NULL,
  `proid` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `brand` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `model` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `library`
--

INSERT INTO `library` (`id`, `proid`, `brand`, `model`) VALUES
(1, '6971693275829\r\n', 'reyee', 'RG-ES210GS-P');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `equipment`
--
ALTER TABLE `equipment`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `library`
--
ALTER TABLE `library`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `equipment`
--
ALTER TABLE `equipment`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `library`
--
ALTER TABLE `library`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
