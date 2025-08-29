-- this is the shiit where i am gonna write the sql part
CREATE TABLE user (
id VARCHAR(50) PRIMARY KEY,
username VARCHAR(50) UNIQUE,
email VARCHAR(50) UNIQUE NOT NULL,
password VARCHAR(50) NOT NULL 
);