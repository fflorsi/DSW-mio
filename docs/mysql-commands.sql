create database if not exists veterinaria;

use veterinaria;

create user if not exists dsw@'%' identified by 'dsw';
grant select, update, insert, delete on veterinaria.* to dsw@'%';

create table if not exists  `veterinaria`.`pets`(
     `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
     `name` VARCHAR(255) NOT NULL,
     `age` INT UNSIGNED NULL,
     `type` VARCHAR (200) NULL,
     `breed` VARCHAR (200) NULL,
     `weight` INT UNSIGNED NULL,
    PRIMARY KEY (`id`)
);


insert into veterinaria.pets values (1, 'Moro', 5, 'perro', 'Caniche', '20' );

create table if not exists `veterinaria`.`clients` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `dni` VARCHAR(10) NOT NULL,
  `firstname` VARCHAR(20) NOT NULL,
  `lastname` VARCHAR(20) NOT NULL,
  `address` VARCHAR(50) NOT NULL,
  `phone` VARCHAR(15) NOT NULL,
  `email` VARCHAR(50) NOT NULL,
  `registrationDate` VARCHAR(15) NOT NULL,
  PRIMARY KEY (`id`)
);
insert into veterinaria.clients

values(
    1,
    '44523096',
    'Facundo',
    'Munne',
    'Buenos Aires 1430',
    '3416470473',
    'fnmunne@gmail.com',
    '08/12/2002'
  );

USE veterinaria

ALTER TABLE Pets
MODIFY COLUMN client_id INT UNSIGNED;

ALTER TABLE Pets
ADD CONSTRAINT fk_client_id
FOREIGN KEY (client_id) REFERENCES Clients(id);