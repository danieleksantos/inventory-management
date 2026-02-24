-- 1. Matérias-primas
INSERT INTO RawMaterial (id, name, stockQuantity) VALUES (1, 'Aço', 100.0);
INSERT INTO RawMaterial (id, name, stockQuantity) VALUES (2, 'Plástico', 50.0);

ALTER SEQUENCE RawMaterial_SEQ RESTART WITH 3;

-- 2. Produtos
INSERT INTO Product (id, name, price) VALUES (1, 'Carro', 50000.00);
INSERT INTO Product (id, name, price) VALUES (2, 'Bicicleta', 1000.00);
ALTER SEQUENCE Product_SEQ RESTART WITH 3;

-- 3. Composição 
-- Carro usa 80 de Aço e 20 de Plástico
INSERT INTO ProductComposition (id, product_id, rawMaterial_id, quantityNeeded) VALUES (1, 1, 1, 80.0);
INSERT INTO ProductComposition (id, product_id, rawMaterial_id, quantityNeeded) VALUES (2, 1, 2, 20.0);
-- Bicicleta usa 10 de Aço e 5 de Plástico
INSERT INTO ProductComposition (id, product_id, rawMaterial_id, quantityNeeded) VALUES (3, 2, 1, 10.0);
INSERT INTO ProductComposition (id, product_id, rawMaterial_id, quantityNeeded) VALUES (4, 2, 2, 5.0);
ALTER SEQUENCE ProductComposition_SEQ RESTART WITH 5;