-- 1. Raw Materials
INSERT INTO RawMaterial (id, name, stockQuantity) VALUES (1, 'Steel', 100.0);
INSERT INTO RawMaterial (id, name, stockQuantity) VALUES (2, 'Plastic', 50.0);
INSERT INTO RawMaterial (id, name, stockQuantity) VALUES (3, 'Electronic Components', 30.0);

ALTER SEQUENCE RawMaterial_SEQ RESTART WITH 4;

-- 2. Products
INSERT INTO Product (id, name, price) VALUES (1, 'Car', 50000.00);
INSERT INTO Product (id, name, price) VALUES (2, 'Bicycle', 1000.00);
INSERT INTO Product (id, name, price) VALUES (3, 'Smartphone', 2500.00);

ALTER SEQUENCE Product_SEQ RESTART WITH 4;

-- 3. Product Composition

-- Car: 80 Steel, 10 Plastic
INSERT INTO ProductComposition (id, product_id, rawMaterial_id, quantityNeeded) VALUES (1, 1, 1, 80.0);
INSERT INTO ProductComposition (id, product_id, rawMaterial_id, quantityNeeded) VALUES (2, 1, 2, 10.0);

-- Smartphone: 1 Steel, 5 Plastic, 10 Electronic Components
INSERT INTO ProductComposition (id, product_id, rawMaterial_id, quantityNeeded) VALUES (3, 3, 1, 1.0);
INSERT INTO ProductComposition (id, product_id, rawMaterial_id, quantityNeeded) VALUES (4, 3, 2, 5.0);
INSERT INTO ProductComposition (id, product_id, rawMaterial_id, quantityNeeded) VALUES (5, 3, 3, 10.0);

-- Bicycle: 10 Steel, 5 Plastic
INSERT INTO ProductComposition (id, product_id, rawMaterial_id, quantityNeeded) VALUES (6, 2, 1, 10.0);
INSERT INTO ProductComposition (id, product_id, rawMaterial_id, quantityNeeded) VALUES (7, 2, 2, 5.0);

ALTER SEQUENCE ProductComposition_SEQ RESTART WITH 8;