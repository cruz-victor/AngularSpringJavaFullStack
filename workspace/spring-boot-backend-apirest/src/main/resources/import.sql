insert into regiones(id, nombre) values(1,'Sudamerica');
insert into regiones(id, nombre) values(2,'Centroamerica');
insert into regiones(id, nombre) values(3,'Norteamerica');
insert into regiones(id, nombre) values(4,'Europa');
insert into regiones(id, nombre) values(5,'Asia');
insert into regiones(id, nombre) values(6,'Africa');
insert into regiones(id, nombre) values(7,'Oceania');
insert into regiones(id, nombre) values(8,'Antartida');

INSERT INTO cliente(nombre, apellido, email, create_at, region_id)VALUES('Victor','Cruz','victor.cruz@gmail.com','2018-01-15',1);
INSERT INTO cliente(nombre, apellido, email, create_at, region_id)VALUES('Grace','Cruz','grace.cruz@gmail.com','2018-01-15',2);
INSERT INTO cliente(nombre, apellido, email, create_at, region_id)VALUES('Maria','Illanes','maria.illanes@gmail.com','2018-01-15',2);
INSERT INTO cliente(nombre, apellido, email, create_at, region_id)VALUES('Miriam','Gomez','miriam.gomez@gmail.com','2018-01-15',2);
INSERT INTO cliente(nombre, apellido, email, create_at, region_id)VALUES('German','Cruz','german.cruz@gmail.com','2018-01-15',4);
INSERT INTO cliente(nombre, apellido, email, create_at, region_id)VALUES('Julia','Cruz','julia.cruz@gmail.com','2018-01-15',5);
INSERT INTO cliente(nombre, apellido, email, create_at, region_id)VALUES('Brandon','Cruz','brando.cruz@gmail.com','2018-01-15',6);
INSERT INTO cliente(nombre, apellido, email, create_at, region_id)VALUES('Richard','Cruz','richard.cruz@gmail.com','2018-01-15',7);
INSERT INTO cliente(nombre, apellido, email, create_at, region_id)VALUES('Jesus','Sanchez','jesus.sanchez@gmail.com','2018-01-15',7);
INSERT INTO cliente(nombre, apellido, email, create_at, region_id)VALUES('David','Perez','david.perez@gmail.com','2018-01-15',1);
INSERT INTO cliente(nombre, apellido, email, create_at, region_id)VALUES('Hector','Vega','hector.vega@gmail.com','2018-01-15',1);
INSERT INTO cliente(nombre, apellido, email, create_at, region_id)VALUES('Juan','Lazo','juan.lazo@gmail.com','2018-01-15',2);

INSERT INTO productos(nombre, precio, create_at)VALUES('TV Panasonic',100,now());
INSERT INTO productos(nombre, precio, create_at)VALUES('Radio Panasonic',200,now());
INSERT INTO productos(nombre, precio, create_at)VALUES('Celular Samsung',300,now());
INSERT INTO productos(nombre, precio, create_at)VALUES('TV Samsung',400,now());
INSERT INTO productos(nombre, precio, create_at)VALUES('Celular Xiomi',500,now());
INSERT INTO productos(nombre, precio, create_at)VALUES('TV Box Tomate',600,now());

INSERT INTO facturas(create_at,descripcion,observacion,cliente_id)VALUES(now(),'Factura de equipos de oficina','',1);
INSERT INTO facturas_items(cantidad,producto_id,factura_id)VALUES(2,1,1);
INSERT INTO facturas_items(cantidad,producto_id,factura_id)VALUES(5,2,1);
INSERT INTO facturas_items(cantidad,producto_id,factura_id)VALUES(3,3,1);
INSERT INTO facturas_items(cantidad,producto_id,factura_id)VALUES(6,4,1);

INSERT INTO facturas(create_at,descripcion,observacion,cliente_id)VALUES(now(),'Factura de maquinaria','',2);
INSERT INTO facturas_items(cantidad,producto_id,factura_id)VALUES(3,1,2);
INSERT INTO facturas_items(cantidad,producto_id,factura_id)VALUES(4,2,2);
INSERT INTO facturas_items(cantidad,producto_id,factura_id)VALUES(5,3,2);
INSERT INTO facturas_items(cantidad,producto_id,factura_id)VALUES(5,4,2);