-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le :  lun. 13 mai 2024 à 10:50
-- Version du serveur :  10.4.6-MariaDB
-- Version de PHP :  7.3.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `fadtestdb`
--

-- --------------------------------------------------------

--
-- Structure de la table `achat`
--

CREATE TABLE `achat` (
  `id_Achat` int(20) NOT NULL,
  `date_Achat` date NOT NULL,
  `qte_Achat` int(11) NOT NULL,
  `id_Produit` int(11) NOT NULL,
  `id_Fournisseur` int(11) NOT NULL,
  `id_User` int(11) NOT NULL,
  `note_Achat` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `client`
--

CREATE TABLE `client` (
  `id_Client` int(20) NOT NULL,
  `nom_Client` varchar(100) NOT NULL,
  `adresse_Client` varchar(255) NOT NULL,
  `tel_Client` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `client`
--

INSERT INTO `client` (`id_Client`, `nom_Client`, `adresse_Client`, `tel_Client`) VALUES
(2, 'userpvr', 'rabat', '06897987'),
(3, 'new client 1', 'safi', '06564655');

-- --------------------------------------------------------

--
-- Structure de la table `fournisseur`
--

CREATE TABLE `fournisseur` (
  `id_Fournisseur` int(11) NOT NULL,
  `nom_Fournisseur` varchar(100) NOT NULL,
  `adresse_Fournisseur` varchar(255) NOT NULL,
  `tel_Fournisseur` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `fournisseur`
--

INSERT INTO `fournisseur` (`id_Fournisseur`, `nom_Fournisseur`, `adresse_Fournisseur`, `tel_Fournisseur`) VALUES
(1, 'mr X', 'casablanca x 22', '06123456'),
(3, 'adbo x', 'casablanca, anassi', '06654654');

-- --------------------------------------------------------

--
-- Structure de la table `produit`
--

CREATE TABLE `produit` (
  `id_Produit` int(20) NOT NULL,
  `pu_Produit` decimal(10,2) NOT NULL,
  `type_Produit` varchar(50) NOT NULL,
  `prix_Vente` decimal(10,2) NOT NULL,
  `note_Produit` decimal(3,1) NOT NULL,
  `code_Barre` varchar(20) NOT NULL,
  `numero_Serie` varchar(20) NOT NULL,
  `unite` varchar(20) NOT NULL,
  `statut` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `produit`
--

INSERT INTO `produit` (`id_Produit`, `pu_Produit`, `type_Produit`, `prix_Vente`, `note_Produit`, `code_Barre`, `numero_Serie`, `unite`, `statut`) VALUES
(1, '500.00', 'Electric dev', '600.00', '6.0', '54566579', '14564646', '65u', 'qsfd'),
(2, '300.00', 'Electric dev 2', '450.00', '6.0', '123111111', '13214564', 'w', 'qsfd'),
(4, '1100.00', 'Electric dev 3', '1999.00', '6.0', '545661579', '1456004646', 'f', 'qsf'),
(5, '162.00', 'electronic', '199.00', '8.0', '10121011', '13', 'F', 'vide'),
(8, '19990.00', 'electronic', '199.00', '8.0', '10121011', '13', 'F', 'stock'),
(9, '0.00', '', '0.00', '0.0', '', '', '', '');

-- --------------------------------------------------------

--
-- Structure de la table `sav_e`
--

CREATE TABLE `sav_e` (
  `id_SAV+` int(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp(),
  `qte_SAV+` int(11) NOT NULL,
  `id_Client` int(11) NOT NULL,
  `id_Produit` int(11) NOT NULL,
  `id_User` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `sav_s`
--

CREATE TABLE `sav_s` (
  `id_SAV-` int(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp(),
  `qte_SAV-` int(11) NOT NULL,
  `id_Client` int(11) NOT NULL,
  `id_Produit` int(11) NOT NULL,
  `id_User` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id_User` int(20) NOT NULL,
  `login_User` varchar(50) NOT NULL,
  `password_User` varchar(255) NOT NULL,
  `nom_User` varchar(100) NOT NULL,
  `prenom_User` varchar(100) NOT NULL,
  `tel_User` varchar(20) NOT NULL,
  `note_User` text NOT NULL,
  `type_User` enum('Super Admin','Admin','Utilisateur') NOT NULL,
  `email_User` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id_User`, `login_User`, `password_User`, `nom_User`, `prenom_User`, `tel_User`, `note_User`, `type_User`, `email_User`) VALUES
(23, 'admin2', '11', 'mlk', 'ùmj', 'mlkj', 'jhm', 'Super Admin', 'test@gmail.com'),
(27, 'a2', '00', 'habti', 'simo', '06564564', 'sffq', 'Admin', 'test2@gmail.com'),
(28, 'pvr', '000', 'habti', 'simo', '06465', 'sffq', 'Super Admin', 's.pales20@gmail.com'),
(30, 'pvr1', '000', 'habti', 'simo', '06465', '', 'Super Admin', 's.pales20@gmail.com'),
(31, 'pvr12', '000', 'habti', 'simo', '06465', '', 'Super Admin', 's.pales20@gmail.com'),
(32, 'pvr123', '000', 'habti', 'simo', '06465', '8', 'Utilisateur', ''),
(33, 'fad_user', '11', 'habti', 'simo', '06564564', '', 'Utilisateur', 'qsdf@gmail.com'),
(34, 'tes', '11', 'sqdf', 'sdf', '064564', '', 'Utilisateur', 'fsdq@gmail.com'),
(35, 'user2', '132', 'mlj', 'mlkj', '064564', '', 'Utilisateur', 'qsdf@gmail.com'),
(42, 'user22222', 'sqdf', 'qsdf', 'qsdf', 'qsfd', '', 'Utilisateur', 'qsdf@gmail.com'),
(43, 'user9', '11', 'tst', 'MR TEST', '06564564', '', 'Utilisateur', 's@gmail.com'),
(45, 'at', 'qsdfqsf', 'qsdfjk', 'qsmlkdfj', '021321', '', 'Utilisateur', 'qsdfsqdf@gmail.com');

-- --------------------------------------------------------

--
-- Structure de la table `vente`
--

CREATE TABLE `vente` (
  `id_Vente` int(20) NOT NULL,
  `date_Vente` date NOT NULL,
  `qte_Vente` int(11) NOT NULL,
  `pu_Vente` decimal(10,0) NOT NULL,
  `pu_Achat` decimal(10,0) NOT NULL,
  `id_Produit` int(11) NOT NULL,
  `id_Client` int(11) NOT NULL,
  `id_User` int(11) NOT NULL,
  `note_Vente` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `achat`
--
ALTER TABLE `achat`
  ADD PRIMARY KEY (`id_Achat`),
  ADD KEY `id_Produit` (`id_Produit`),
  ADD KEY `id_Fournisseur` (`id_Fournisseur`),
  ADD KEY `id_User` (`id_User`);

--
-- Index pour la table `client`
--
ALTER TABLE `client`
  ADD PRIMARY KEY (`id_Client`);

--
-- Index pour la table `fournisseur`
--
ALTER TABLE `fournisseur`
  ADD PRIMARY KEY (`id_Fournisseur`);

--
-- Index pour la table `produit`
--
ALTER TABLE `produit`
  ADD PRIMARY KEY (`id_Produit`);

--
-- Index pour la table `sav_e`
--
ALTER TABLE `sav_e`
  ADD PRIMARY KEY (`id_SAV+`),
  ADD KEY `id_Client` (`id_Client`),
  ADD KEY `id_Produit` (`id_Produit`),
  ADD KEY `id_User` (`id_User`);

--
-- Index pour la table `sav_s`
--
ALTER TABLE `sav_s`
  ADD PRIMARY KEY (`id_SAV-`),
  ADD KEY `id_Client` (`id_Client`),
  ADD KEY `id_Produit` (`id_Produit`),
  ADD KEY `id_User` (`id_User`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_User`);

--
-- Index pour la table `vente`
--
ALTER TABLE `vente`
  ADD PRIMARY KEY (`id_Vente`),
  ADD KEY `id_Produit` (`id_Produit`),
  ADD KEY `id_Client` (`id_Client`),
  ADD KEY `id_User` (`id_User`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `achat`
--
ALTER TABLE `achat`
  MODIFY `id_Achat` int(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `client`
--
ALTER TABLE `client`
  MODIFY `id_Client` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `fournisseur`
--
ALTER TABLE `fournisseur`
  MODIFY `id_Fournisseur` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `produit`
--
ALTER TABLE `produit`
  MODIFY `id_Produit` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pour la table `sav_e`
--
ALTER TABLE `sav_e`
  MODIFY `id_SAV+` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `sav_s`
--
ALTER TABLE `sav_s`
  MODIFY `id_SAV-` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id_User` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT pour la table `vente`
--
ALTER TABLE `vente`
  MODIFY `id_Vente` int(20) NOT NULL AUTO_INCREMENT;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `achat`
--
ALTER TABLE `achat`
  ADD CONSTRAINT `achat_ibfk_1` FOREIGN KEY (`id_Produit`) REFERENCES `produit` (`id_Produit`),
  ADD CONSTRAINT `achat_ibfk_2` FOREIGN KEY (`id_Fournisseur`) REFERENCES `fournisseur` (`id_Fournisseur`),
  ADD CONSTRAINT `achat_ibfk_3` FOREIGN KEY (`id_User`) REFERENCES `user` (`id_User`);

--
-- Contraintes pour la table `sav_e`
--
ALTER TABLE `sav_e`
  ADD CONSTRAINT `sav_e_ibfk_1` FOREIGN KEY (`id_Client`) REFERENCES `client` (`id_Client`),
  ADD CONSTRAINT `sav_e_ibfk_2` FOREIGN KEY (`id_Produit`) REFERENCES `produit` (`id_Produit`);

--
-- Contraintes pour la table `sav_s`
--
ALTER TABLE `sav_s`
  ADD CONSTRAINT `sav_s_ibfk_1` FOREIGN KEY (`id_Client`) REFERENCES `client` (`id_Client`),
  ADD CONSTRAINT `sav_s_ibfk_2` FOREIGN KEY (`id_Produit`) REFERENCES `produit` (`id_Produit`),
  ADD CONSTRAINT `sav_s_ibfk_3` FOREIGN KEY (`id_User`) REFERENCES `user` (`id_User`);

--
-- Contraintes pour la table `vente`
--
ALTER TABLE `vente`
  ADD CONSTRAINT `vente_ibfk_1` FOREIGN KEY (`id_Produit`) REFERENCES `produit` (`id_Produit`),
  ADD CONSTRAINT `vente_ibfk_2` FOREIGN KEY (`id_Client`) REFERENCES `client` (`id_Client`),
  ADD CONSTRAINT `vente_ibfk_3` FOREIGN KEY (`id_User`) REFERENCES `user` (`id_User`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
