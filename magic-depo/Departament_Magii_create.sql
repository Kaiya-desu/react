
CREATE SCHEMA IF NOT EXISTS `tin-zadanie`;

-- tables
-- Table: Role
CREATE TABLE IF NOT EXISTS `tin-zadanie`.`Role` (
    `RoleID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(20) NOT NULL,
    PRIMARY KEY (`RoleID`),
    UNIQUE INDEX `role_id_UNIQUE` (`RoleID` ASC)
) ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_general_ci;

-- Table: Mage
CREATE TABLE IF NOT EXISTS `tin-zadanie`.`Mage` (
    `MageID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(20) NOT NULL,
    `Surname` VARCHAR(20) NOT NULL,
    `Title` VARCHAR(50) NULL,
    `Certified_date` date NOT NULL,
    `Email` VARCHAR(40) NOT NULL,
    `Password` VARCHAR(200) NOT NULL,
    `Role_RoleID` INT UNSIGNED NOT NULL,
    PRIMARY KEY (`MageID`),
    UNIQUE INDEX `mage_id_UNIQUE` (`MageID` ASC),
    CONSTRAINT `role_fk` FOREIGN KEY (`Role_RoleID`) REFERENCES `tin-zadanie`.`Role` (`RoleID`)
) ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_general_ci;

-- Table: Spell
CREATE TABLE IF NOT EXISTS `tin-zadanie`.`Spell` (
    `SpellID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(40) NOT NULL,
    `Description` VARCHAR(200) NULL,
    `Mana_cost` INT UNSIGNED NOT NULL,
    PRIMARY KEY (`SpellID`),
    UNIQUE INDEX `spell_id_UNIQUE` (`SpellID` ASC)
) ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_general_ci;

-- Table: Mage_know_spell
CREATE TABLE IF NOT EXISTS `tin-zadanie`.`Mage_know_spell` (
    `MksID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `Mage_MageID` INT UNSIGNED NOT NULL,
    `Spell_SpellID` INT UNSIGNED NOT NULL,
    `Learned_date` DATE NOT NULL,
    `Mastery_level` VARCHAR(50) NULL,
    PRIMARY KEY (`MksID`),
    UNIQUE INDEX `mks_id_UNIQUE` (`MksID` ASC),
    CONSTRAINT `mage_fk` FOREIGN KEY (`Mage_MageID`) REFERENCES `tin-zadanie`.`Mage` (`MageID`),
    CONSTRAINT `spell_fk` FOREIGN KEY (`Spell_SpellID`) REFERENCES `tin-zadanie`.`Spell` (`SpellID`)
    ) ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_general_ci;

-- Values

INSERT IGNORE INTO `tin-zadanie`.`Role` (`RoleID`, `Name`) VALUES
(1, 'admin'),
(2, 'user')
;

INSERT IGNORE INTO `tin-zadanie`.`Mage` (`MageID`, `Name`, `Surname`, `Title`, `Certified_date`, `Email`, `Password`, `Role_RoleID`) VALUES
(1, 'Warol', 'Kojtyła', 'Demon z Wadowic', '2005-04-02', 'admin@admin.com', '$2a$08$1xnDDnqzTifba84T9dPO9uSGOYiHUalyiFeoBbAiHRO97GM.0j90a', 1),
(2, 'Jan', 'Gaweł', 'Papaj', '1920-05-18', 'test@test.com', '$2a$08$rJit2W52DFTA4eaR5mAHl.NSi9hlsYjMiLcmzIeabJ0ICEM1Z3g72', 2)
;


INSERT IGNORE INTO `tin-zadanie`.`Spell` (`SpellID`, `Name`, `Description`, `Mana_cost`) VALUES
(1, 'Palec zagłady', 'potęzny spell zniszczenia', 420),
(2, 'Przywołanie szatana', 'Przywołuje papieża', 2137),
(3, 'Super saiyan', 'AAAaaaAAAAaaAaaaa!!!!', 9000)
;

INSERT IGNORE INTO `tin-zadanie`.`Mage_know_spell` (`MksID`,`Mage_MageID`,`Spell_SpellID`,`Learned_date`,`Mastery_level`) VALUES
(1,1,1,'2021-03-03', 'noob'),
(2,1,2,'2020-10-10', 'noob'),
(3,2,3,'2018-01-01', 'noob')
;



-- Table: Rank
CREATE TABLE IF NOT EXISTS `tin-zadanie`.`Rank` (
    `RankID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `Email` VARCHAR(40) NOT NULL,
    `Turns`INT UNSIGNED NOT NULL,
    PRIMARY KEY (`RankID`),
    UNIQUE INDEX `rank_id_UNIQUE` (`RankID` ASC)
) ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_general_ci;

INSERT IGNORE INTO `tin-zadanie`.`Rank` (`RankID`, `Email`, `Turns`) VALUES
(1, 'admin@admin.com', 2137),
(2, 'test@test.com', 420)
;