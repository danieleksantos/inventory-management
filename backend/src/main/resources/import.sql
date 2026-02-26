INSERT INTO RawMaterial (id, name, stockQuantity) VALUES (1, 'Industrial Steel', 800.0);
INSERT INTO RawMaterial (id, name, stockQuantity) VALUES (2, 'High-Density Plastic', 300.0); -- 
INSERT INTO RawMaterial (id, name, stockQuantity) VALUES (3, 'Microprocessors', 100.0);
INSERT INTO RawMaterial (id, name, stockQuantity) VALUES (4, 'Lithium Battery Cells', 50.0); -- 
INSERT INTO RawMaterial (id, name, stockQuantity) VALUES (5, 'Aluminum Alloy', 150.0);
INSERT INTO RawMaterial (id, name, stockQuantity) VALUES (6, 'Carbon Fiber', 50.0);
ALTER SEQUENCE RawMaterial_SEQ RESTART WITH 7;

INSERT INTO Product (id, name, price) VALUES (1, 'Luxury Sedan', 85000.00);
INSERT INTO Product (id, name, price) VALUES (2, 'Mountain Bike Pro', 2500.00);
INSERT INTO Product (id, name, price) VALUES (3, 'Pro Smartphone X', 4500.00);
INSERT INTO Product (id, name, price) VALUES (4, 'Electric Scooter', 3200.00);
INSERT INTO Product (id, name, price) VALUES (5, 'Professional Drone', 12000.00);
INSERT INTO Product (id, name, price) VALUES (6, 'Gaming Console Z', 3800.00);
INSERT INTO Product (id, name, price) VALUES (7, 'Heavy Duty Toolbox', 150.00); 
INSERT INTO Product (id, name, price) VALUES (8, 'Smart Home Hub v2', 890.00); 
ALTER SEQUENCE Product_SEQ RESTART WITH 9;


INSERT INTO ProductComposition (id, product_id, rawMaterial_id, quantityNeeded) VALUES (1, 1, 1, 350.0);
INSERT INTO ProductComposition (id, product_id, rawMaterial_id, quantityNeeded) VALUES (2, 1, 2, 40.0);
INSERT INTO ProductComposition (id, product_id, rawMaterial_id, quantityNeeded) VALUES (3, 1, 3, 15.0);

INSERT INTO ProductComposition (id, product_id, rawMaterial_id, quantityNeeded) VALUES (4, 5, 3, 12.0);
INSERT INTO ProductComposition (id, product_id, rawMaterial_id, quantityNeeded) VALUES (5, 5, 5, 5.0);
INSERT INTO ProductComposition (id, product_id, rawMaterial_id, quantityNeeded) VALUES (6, 5, 6, 2.0);

INSERT INTO ProductComposition (id, product_id, rawMaterial_id, quantityNeeded) VALUES (7, 3, 3, 8.0);
INSERT INTO ProductComposition (id, product_id, rawMaterial_id, quantityNeeded) VALUES (8, 3, 4, 1.0);

INSERT INTO ProductComposition (id, product_id, rawMaterial_id, quantityNeeded) VALUES (9, 7, 1, 15.0); 
INSERT INTO ProductComposition (id, product_id, rawMaterial_id, quantityNeeded) VALUES (10, 7, 2, 8.0);  

INSERT INTO ProductComposition (id, product_id, rawMaterial_id, quantityNeeded) VALUES (11, 2, 5, 12.0);
INSERT INTO ProductComposition (id, product_id, rawMaterial_id, quantityNeeded) VALUES (12, 2, 2, 5.0);

INSERT INTO ProductComposition (id, product_id, rawMaterial_id, quantityNeeded) VALUES (13, 4, 5, 8.0);
INSERT INTO ProductComposition (id, product_id, rawMaterial_id, quantityNeeded) VALUES (14, 4, 3, 4.0);
INSERT INTO ProductComposition (id, product_id, rawMaterial_id, quantityNeeded) VALUES (15, 4, 4, 2.0);

INSERT INTO ProductComposition (id, product_id, rawMaterial_id, quantityNeeded) VALUES (16, 6, 3, 10.0);
INSERT INTO ProductComposition (id, product_id, rawMaterial_id, quantityNeeded) VALUES (17, 6, 2, 4.0);

ALTER SEQUENCE ProductComposition_SEQ RESTART WITH 18;