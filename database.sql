DROP DATABASE IF EXISTS unnamed;
CREATE DATABASE IF NOT EXISTS unnamed;
USE unnamed;

CREATE TABLE IF NOT EXISTS `Chef` (
  `chefId`                   BIGINT NOT NULL,
  `name`                     VARCHAR(45) NULL DEFAULT NULL,
  `salary`                   FLOAT NULL DEFAULT NULL,
  PRIMARY KEY (
    `chefId` ASC
  )
);

CREATE TABLE IF NOT EXISTS `Meal` (
  `mealId`                   BIGINT NOT NULL,
  `name`                     VARCHAR(45) NULL DEFAULT NULL,
  `price`                    FLOAT NULL DEFAULT NULL,
  `chefFk`                   BIGINT NULL DEFAULT NULL,
  PRIMARY KEY (
    `mealId` ASC
  )
);

CREATE TABLE IF NOT EXISTS `Orders` (
  `orderId`                  BIGINT NOT NULL,
  `customerFk`               BIGINT NULL DEFAULT NULL,
  `mealFk`                   BIGINT NULL DEFAULT NULL,
    PRIMARY KEY (
    `orderId` ASC
  )
);

CREATE TABLE IF NOT EXISTS `Supplier` (
  `supplierId`               BIGINT NOT NULL,
  `city`                     VARCHAR(45) NULL DEFAULT NULL,
  `name`                     TEXT(100) NULL DEFAULT NULL,
  `phone`                    INT(12) NULL DEFAULT NULL,
  `chefFk`                   BIGINT NULL DEFAULT NULL,
  PRIMARY KEY (
    `supplierId` ASC
  )
);

CREATE TABLE IF NOT EXISTS `Waiter` (
  `waiterId`                 BIGINT NOT NULL,
  `name`                     VARCHAR(45) NULL DEFAULT NULL,
  `salary`                   FLOAT NULL DEFAULT NULL,
  `phone`                    INT(12) NULL DEFAULT NULL,
  PRIMARY KEY (
    `waiterId` ASC
  )
);

CREATE TABLE IF NOT EXISTS `Customer` (
  `customerId`               BIGINT NOT NULL,
  `name`                     VARCHAR(45) NULL DEFAULT NULL,
  `address`                  VARCHAR(45) NULL DEFAULT NULL,
  `phone`                    INT(12) NULL DEFAULT NULL,
  `waiterFk`                 BIGINT NULL DEFAULT NULL,
  PRIMARY KEY (
    `customerId` ASC
  )
);

CREATE TABLE IF NOT EXISTS `Ingredient` (
  `ingredientId`             BIGINT NOT NULL,
  `name`                     VARCHAR(45) NULL DEFAULT NULL,
  `description`              VARCHAR(45) NULL DEFAULT NULL,
  `mealFk`                   BIGINT NULL DEFAULT NULL,
  PRIMARY KEY (
    `ingredientId` ASC
  )
);

CREATE TABLE IF NOT EXISTS `Provides` (
  `supplierFk`               BIGINT NULL DEFAULT NULL,
  `providesId`               BIGINT NOT NULL,
  `ingredientFk`             BIGINT NULL DEFAULT NULL,
  PRIMARY KEY (
    `providesId` ASC
  )
);

-- ---------------------------- --
-- --------FOREIGN KEYS-------- --
-- ---------------------------- --
ALTER TABLE `Meal`
  ADD INDEX `fk_Meal_Chef_chef_id_idx` (`chefFk` ASC),
  ADD CONSTRAINT `fk_Meal_Chef_chef_id`
    FOREIGN KEY (`chefFk`)
    REFERENCES `Chef` (`chefId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION;

ALTER TABLE `Supplier`
  ADD INDEX `fk_Supplier_Chef_chef_id_idx` (`chefFk` ASC),
  ADD CONSTRAINT `fk_Supplier_Chef_chef_id`
    FOREIGN KEY (`chefFk`)
    REFERENCES `Chef` (`chefId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION;

ALTER TABLE `Customer`
  ADD INDEX `fk_Customer_Waiter_waiter_id_idx` (`waiterFk` ASC),
  ADD CONSTRAINT `fk_Customer_Waiter_waiter_id`
    FOREIGN KEY (`waiterFk`)
    REFERENCES `Waiter` (`waiterId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION;

ALTER TABLE `Ingredient`
  ADD INDEX `fk_Ingredient_Meal_meal_id_idx` (`mealFk` ASC),
  ADD CONSTRAINT `fk_Ingredient_Meal_meal_id`
    FOREIGN KEY (`mealFk`)
    REFERENCES `Meal` (`mealId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION;

ALTER TABLE `Orders`
  ADD INDEX `fk_Orders_Customer_customer_id_idx` (`customerFk` ASC),
  ADD CONSTRAINT `fk_Orders_Customer_customer_id`
    FOREIGN KEY (`customerFk`)
    REFERENCES `Customer` (`customerId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  ADD INDEX `fk_Orders_Meal_meal_id_idx` (`mealFk` ASC),
  ADD CONSTRAINT `fk_Orders_Meal_meal_id`
    FOREIGN KEY (`mealFk`)
    REFERENCES `Meal` (`mealId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION;

ALTER TABLE `Provides`
  ADD INDEX `fk_Provides_Supplier_supplier_id_idx` (`supplierFk` ASC),
  ADD CONSTRAINT `fk_Provides_Supplier_supplier_id`
    FOREIGN KEY (`supplierFk`)
    REFERENCES `Supplier` (`supplierId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  ADD INDEX `fk_Provides_Ingredient_ingredient_id_idx` (`ingredientFk` ASC),
  ADD CONSTRAINT `fk_Provides_Ingredient_ingredient_id`
    FOREIGN KEY (`ingredientFk`)
    REFERENCES `Ingredient` (`ingredientId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION;
