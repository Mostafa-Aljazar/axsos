CREATE DATABASE IF NOT EXISTS friendships_db;
USE friendships_db;

CREATE TABLE IF NOT EXISTS users (
    id         INT         NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(45) NOT NULL,
    last_name  VARCHAR(45) NOT NULL,
    created_at DATETIME    DEFAULT NOW(),
    updated_at DATETIME    DEFAULT NOW(),
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS friendships (
    id         INT NOT NULL AUTO_INCREMENT,
    user_id    INT NOT NULL,
    friend_id  INT NOT NULL,
    created_at DATETIME DEFAULT NOW(),
    updated_at DATETIME DEFAULT NOW(),
    PRIMARY KEY (id),
    FOREIGN KEY (user_id)   REFERENCES users(id),
    FOREIGN KEY (friend_id) REFERENCES users(id)
);


-- Add 6 users

INSERT INTO users (first_name, last_name) VALUES
    ('Amy',    'Giver'),
    ('Eli',    'Byers'),
    ('Marky',  'Mark'),
    ('Big',    'Bird'),
    ('Kermit', 'The Frog'),
    ('Cookie', 'Monster');


-- Amy (1) is friends with Eli (2), Big (4), and Cookie (6)

INSERT INTO friendships (user_id, friend_id) VALUES (1, 2), (1, 4), (1, 6);


-- Eli (2) is friends with Amy (1), Marky (3), and Kermit (5)

INSERT INTO friendships (user_id, friend_id) VALUES (2, 1), (2, 3), (2, 5);


-- Marky (3) is friends with Eli (2) and Kermit (5)

INSERT INTO friendships (user_id, friend_id) VALUES (3, 2), (3, 5);


-- Big (4) is friends with Marky (3)

INSERT INTO friendships (user_id, friend_id) VALUES (4, 3);


-- Kermit (5) is friends with Amy (1) and Cookie (6)

INSERT INTO friendships (user_id, friend_id) VALUES (5, 1), (5, 6);


-- Cookie (6) is friends with Eli (2) and Marky (3)

INSERT INTO friendships (user_id, friend_id) VALUES (6, 2), (6, 3);


-- Show all friendships — who is friends with who

SELECT
    users.first_name,
    users.last_name,
    user2.first_name AS friend_first_name,
    user2.last_name  AS friend_last_name
FROM users
JOIN friendships ON users.id = friendships.user_id
LEFT JOIN users AS user2 ON friendships.friend_id = user2.id;


-- NINJA: Who is Amy (user 1) friends with?

SELECT user2.first_name, user2.last_name
FROM friendships
LEFT JOIN users AS user2 ON friendships.friend_id = user2.id
WHERE friendships.user_id = 1;


-- NINJA: How many friendships are there in total?

SELECT COUNT(*) AS total_friendships
FROM friendships;


-- NINJA: Who has the most friends?

SELECT users.first_name, users.last_name, COUNT(friendships.id) AS friend_count
FROM users
JOIN friendships ON users.id = friendships.user_id
GROUP BY users.id
ORDER BY friend_count DESC
LIMIT 1;


-- NINJA: Who are Marky's (user 3) friends, in alphabetical order?

SELECT user2.first_name, user2.last_name
FROM friendships
LEFT JOIN users AS user2 ON friendships.friend_id = user2.id
WHERE friendships.user_id = 3
ORDER BY user2.first_name ASC;