DROP DATABASE IF EXISTS dicebot;
CREATE DATABASE dicebot;
USE dicebot;

/* TABLES */
CREATE TABLE guilds (
    guildID BIGINT UNSIGNED NOT NULL UNIQUE,
    prefix CHAR(2) NOT NULL,
    rig TINYINT NOT NULL,
    PRIMARY KEY (guildID)
);

CREATE TABLE aliases (
    guildID BIGINT UNSIGNED NOT NULL,
    userID BIGINT UNSIGNED NOT NULL,
    aliasName VARCHAR(16) NOT NULL,
    dice VARCHAR(16) NOT NULL,
    PRIMARY KEY (guildID,aliasName),
    FOREIGN KEY (guildID) REFERENCES guilds(guildID) ON DELETE CASCADE
);

DELIMITER $$

/* GUILDS PROCEDURES*/
CREATE PROCEDURE getGuild(IN inGuildID BIGINT)
BEGIN 
    SELECT * FROM guilds
    WHERE guilds.guildID = inGuildID;
END$$

CREATE PROCEDURE setGuild(IN inGuildID BIGINT,IN inPrefix CHAR(2),IN inRig TINYINT)
BEGIN 
    INSERT INTO guilds (guildID,prefix,rig) VALUES (inGuildID,inPrefix,inRig);
END$$

CREATE PROCEDURE updateGuild(IN inGuildID BIGINT,IN inPrefix CHAR(2),IN inRig TINYINT)
BEGIN 
    UPDATE guilds
    SET prefix = inPrefix, rig = inRig
    WHERE guildID = inGuildID;
END$$

CREATE PROCEDURE deleteGuild(IN inGuildID BIGINT)
BEGIN
    DELETE FROM guilds WHERE guildID = inGuildID;
END$$

/* ALIASES PROCEDURES */
CREATE PROCEDURE getAliases(IN inGuildID BIGINT)
BEGIN
    SELECT * FROM aliases
    WHERE guildID = inGuildID;
END$$

CREATE PROCEDURE setAlias(IN inGuildID BIGINT,IN inUserID BIGINT,IN inAliasName VARCHAR(16),IN inDice VARCHAR(16))
BEGIN
    INSERT INTO aliases (guildID,userID,aliasName,dice) VALUES (inGuildID,inUserID,inAliasName,inDice);
END$$

CREATE PROCEDURE updateAlias(IN inGuildID BIGINT,IN inAliasName VARCHAR(16),IN inDice VARCHAR(16))
BEGIN
    UPDATE aliases
    SET aliasName = inAliasName, dice = inDice
    WHERE (guildID,aliasName) = (inGuildID,inAliasName);
END$$

CREATE PROCEDURE deleteAlias(IN inGuildID BIGINT, IN inaAliasName VARCHAR(16))
BEGIN
    DELETE FROM aliases WHERE (guildID,aliasName) = (inGuildID,inAliasName);
END$$

DELIMITER ;