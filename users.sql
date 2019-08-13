DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS friendships;
DROP TABLE IF EXISTS chats;


CREATE TABLE users (
id SERIAL PRIMARY KEY,
first VARCHAR(200) NOT NULL,
last VARCHAR(200) NOT NULL,
email VARCHAR (200) UNIQUE,
password VARCHAR (999) NOT NULL,
imageid VARCHAR (999),
bio VARCHAR(300),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE friendships (
  id serial,
  sender_id INT REFERENCES users(id),
  reciever_id INT REFERENCES users(id),
  accepted BOOLEAN DEFAULT false
);


CREATE TABLE chats (
    id SERIAL PRIMARY KEY,
    sender_id INT NOT NULL REFERENCES users(id),
    message VARCHAR(1000),
    imageid VARCHAR (999),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
