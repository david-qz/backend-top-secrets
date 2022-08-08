-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
drop table if exists users;
drop table if exists secrets;

create table users (
    id bigint generated always as identity primary key,
    email text not null,
    password_hash text not null
);

create table secrets (
    id bigint generated always as identity primary key,
    title text not null,
    description text not null,
    created_at timestamp with time zone default CURRENT_TIMESTAMP
);

insert into secrets (title, description)
values ('Lunch Menu', 'The cafeteria is serving tuna salad today.');
