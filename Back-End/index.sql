create database little_art_book;
use little_art_book;

create table users (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL ,
    username VARCHAR(64) NOT NULL ,
    email VARCHAR(128) NOT NULL UNIQUE KEY ,
    password VARCHAR(256) NOT NULL ,
    telephone VARCHAR(24) NOT NULL 
) charset = 'utf8';

create table works (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL ,
    name VARCHAR(64) NOT NULL ,
    image_url VARCHAR(128) NOT NULL ,
    data TEXT NOT NULL ,
    short_description TEXT NOT NULL ,
    description TEXT  NOT NULL ,
    belong_user_id VARCHAR(128) NOT NULL
) charset = 'utf8';
