CREATE USER docker;
CREATE DATABASE docker;
USE docker;
CREATE TABLE user (UserID int, LastName varchar(255), FirstName varchar(255));
INSERT INTO user (LastName, FirstName) VALUES ("Jan", "Kowalski");

CREATE TABLE patient  (FirstName VARCHAR(255) NOT NULL , LastName VARCHAR(255) NOT NULL , PESEL VARCHAR(11) NOT NULL PRIMARY KEY);
INSERT INTO patient (FirstName, LastName, PESEL) VALUES ("Jan", "Kowalski", "01234567891");

CREATE TABLE doctor  (FirstName VARCHAR(255) NOT NULL , LastName VARCHAR(255) NOT NULL , PESEL VARCHAR(11) NOT NULL PRIMARY KEY,
                    UserName VARCHAR(255), Password VARCHAR(255));
INSERT INTO doctor (FirstName, LastName, PESEL, UserName, Password) VALUES ("Doktor", "Doktorek", "01234567891", "doktor.doktorek", "pass");

CREATE TABLE notes (PESEL VARCHAR(11) NOT NULL, Note TEXT NOT NULL, Date DATETIME NOT NULL, DoctorUserName VARCHAR(255));
