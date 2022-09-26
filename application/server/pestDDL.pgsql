
DROP TABLE IF EXISTS pest;
CREATE TABLE IF NOT EXISTS pest (
    pest_id INTEGER, 
    pest_type TEXT,
    x_coord INTEGER,
    y_coord INTEGER,
    id INTEGER,
    name TEXT);

INSERT INTO pest VALUES (1, 'Ants', 100, 100, 1001, 'Formicoidea');
INSERT INTO pest VALUES (2, 'Bees', 100, -100, 1002, 'Apoidea');
INSERT INTO pest VALUES (3, 'Cougers', -100, 100, 1003, 'Felidae');
INSERT INTO pest VALUES (4, 'Dragonflies', -100, -100, 1004, 'Anisoptera');


SELECT * FROM pest;