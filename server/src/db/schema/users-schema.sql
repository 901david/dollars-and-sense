CREATE TABLE Users
(
    id INTEGER(10) NOT NULL
    AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR
    (60) NOT NULL,
    email VARCHAR
    (60) DEFAULT NULL,
    user_password VARCHAR
    (60) NOT NULL,
);