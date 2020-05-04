CREATE TABLE Users
(
    id INTEGER(10) NOT NULL
    AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR
    (60) NOT NULL UNIQUE,
    email VARCHAR
    (60) NOT NULL UNIQUE,
    user_password VARCHAR
    (60) NOT NULL,
    email_confirmed BOOLEAN DEFAULT FALSE
);