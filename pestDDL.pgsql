
drop table if exists pest;
create table if not exists pest (
    pest_id INTEGER, 
    pest_type TEXT,
    x_coord INTEGER,
    y_coord INTEGER);

select * from pest;