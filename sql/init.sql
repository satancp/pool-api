CREATE SCHEMA `qiangxie` DEFAULT CHARACTER SET utf8mb4 ;

CREATE TABLE `qiangxie`.`t_email` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(500) NULL,
  `password` VARCHAR(500) NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT NOW(),
  `updated_at` TIMESTAMP NOT NULL DEFAULT NOW(),
  PRIMARY KEY (`id`))

CREATE TABLE `qiangxie`.`t_mobile` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `mobile` VARCHAR(500) NULL,
  `is_used` INT(1) NOT NULL DEFAULT 0,
  `is_released` INT(1) NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT NOW(),
  `updated_at` TIMESTAMP NOT NULL DEFAULT NOW(),
  PRIMARY KEY (`id`))