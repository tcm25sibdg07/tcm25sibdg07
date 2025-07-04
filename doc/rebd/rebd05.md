# C5 : SQL

# DDL

```sql
USE `purpleblush`;
DROP TABLE IF EXISTS `ITEMENCOMENDA`;
DROP TABLE IF EXISTS `CLASSIFICACAO`;
DROP TABLE IF EXISTS `PRODUTO`;
DROP TABLE IF EXISTS `ENCOMENDA`;
DROP TABLE IF EXISTS `CLIENTE`;
DROP TABLE IF EXISTS `CATEGORIA`;
DROP TABLE IF EXISTS `ESTADO`;

CREATE TABLE IF NOT EXISTS `CATEGORIA` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE (`nome`)
);


CREATE TABLE IF NOT EXISTS `CLIENTE` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(100) NOT NULL,
  `morada` TEXT NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `data_nascimento` DATE DEFAULT NULL,
  `nif` VARCHAR(9) DEFAULT NULL,
  `palavra_passe` VARCHAR(255) NOT NULL,
  `telemovel` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE (`email`, `telemovel`)
);

CREATE TABLE IF NOT EXISTS `ESTADO` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE (`nome`)
);

CREATE TABLE IF NOT EXISTS `ENCOMENDA` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `data` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `metodo_pagamento` VARCHAR(50) NOT NULL,
  `observacao` VARCHAR(512) DEFAULT NULL,
  `valor_total` DECIMAL(10,2) DEFAULT NULL,
  `clienteId` INT DEFAULT NULL,
  `estadoId` INT DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`clienteId`) REFERENCES `CLIENTE`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`estadoId`) REFERENCES `ESTADO`(`id`)
);

CREATE TABLE IF NOT EXISTS `CLASSIFICACAO` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `estrelas` INT NOT NULL CHECK (`estrelas` BETWEEN 1 AND 5),
  `comentario` TEXT DEFAULT NULL,
  `data` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `encomendaId` INT DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`encomendaId`) REFERENCES `ENCOMENDA`(`id`) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `PRODUTO` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `stock` INT NOT NULL DEFAULT 0,
  `nome` VARCHAR(512) NOT NULL,
  `preco` DECIMAL(10,2) NOT NULL,
  `descricao` VARCHAR(512) DEFAULT NULL,
  `categoriaId` INT DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE (`nome`),
  FOREIGN KEY (`categoriaId`) REFERENCES `CATEGORIA`(`id`)
);

CREATE TABLE IF NOT EXISTS `ITEMENCOMENDA` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `produtoId` INT DEFAULT NULL,
  `encomendaId` INT DEFAULT NULL,
  `preco_unitario` DECIMAL(10,2) DEFAULT NULL,
  `quantidade` INT NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`produtoId`) REFERENCES `PRODUTO`(`id`),
  FOREIGN KEY (`encomendaId`) REFERENCES `ENCOMENDA`(`id`)
);
```
# DML

## INSERT
```sql
-- Inserir categorias
INSERT INTO CATEGORIA (nome) VALUES ('Cuidados de Pele'), ('Maquilhagem'), ('Cabelos');

-- Inserir produtos
INSERT INTO PRODUTO (stock, nome, preco, descricao, id_categoria) VALUES
(50, 'Creme Hidratante', 19.99, 'Creme para pele seca', 1),
(30, 'Batom Vermelho', 9.99, 'Batom de longa duração', 2),
(100, 'Shampoo Nutritivo', 14.50, 'Para cabelos danificados', 3);

-- Inserir cliente
INSERT INTO CLIENTE (nome, morada, email, data_nascimento, nif, palavra_passe)
VALUES ('Joana Silva', 'Rua das Flores, 123', 'joana@email.com', '1990-05-14', '123456789', 'hashsenha123');

-- Inserir telemóvel do cliente
INSERT INTO TELEMOVEL (id_cliente, telemovel) VALUES (1, '912345678');

-- Inserir estados de encomenda
INSERT INTO ESTADO (nome) VALUES ('Pendente'), ('Enviada'), ('Entregue'), ('Cancelada');

-- Inserir encomenda
INSERT INTO ENCOMENDA (data, metodo_pagamento, observacao, valor_total, id_cliente, id_estado)
VALUES (CURRENT_DATE, 'MBWay', 'Entregar após as 18h', 29.98, 1, 1);

-- Inserir produtos na encomenda
INSERT INTO incluido_em (id_produto, id_encomenda, preco_unitario, quantidade)
VALUES (1, 1, 19.99, 1), (2, 1, 9.99, 1);
```
## UPDATE
```sql
-- Atualizar stock após a encomenda
UPDATE PRODUTO SET stock = stock - 1 WHERE id = 1;
UPDATE PRODUTO SET stock = stock - 1 WHERE id = 2;

-- Atualizar estado da encomenda para "Enviada"
UPDATE ENCOMENDA SET id_estado = 2 WHERE id = 1;

-- Atualizar palavra-passe do cliente
UPDATE CLIENTE SET palavra_passe = 'novasenha456' WHERE id = 1;
```
## DELETE
```sql
-- Apagar um produto descontinuado
DELETE FROM PRODUTO WHERE id = 3;

-- Apagar um cliente (e dados associados)
DELETE FROM CLIENTE WHERE id = 1;
```
## SELECT
```sql
-- Ver todos os produtos com categoria
SELECT * FROM vista_produtos_com_categoria;

-- Ver histórico de encomendas
SELECT * FROM vista_encomendas_com_clientes;

-- Ver detalhes da encomenda 1
SELECT * FROM vista_detalhes_encomenda WHERE id_encomenda = 1;

-- Ver classificações
SELECT * FROM vista_classificacoes_detalhadas;

-- Ver produtos com stock baixo
SELECT nome, stock FROM PRODUTO WHERE stock < 10;

-- Ver encomendas do cliente 1
SELECT * FROM ENCOMENDA WHERE id_cliente = 1;

-- Ver produtos mais vendidos
SELECT p.nome, SUM(ie.quantidade) AS total_vendido
FROM incluido_em ie
JOIN PRODUTO p ON p.id = ie.id_produto
GROUP BY p.nome
ORDER BY total_vendido DESC;
```
---
[< Previous](rebd04.md) | [^ Main](/../../) | Next >
:--- | :---: | ---: 
