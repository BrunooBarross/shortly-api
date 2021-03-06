CREATE DATABASE shortly;

CREATE TABLE users (
	id SERIAL PRIMARY KEY, 
	name TEXT UNIQUE NOT NULL,
	email TEXT UNIQUE NOT NULL,
	password TEXT NOT NULL,
	"createdAt" DATE NOT NULL
);

CREATE TABLE sessions(
	id SERIAL PRIMARY KEY,
	token TEXT NOT NULL,
	"userId" INTEGER NOT NULL REFERENCES "users"("id"),
	"createdAt" DATE NOT NULL
);

CREATE TABLE "shortenedLinks"(
	id SERIAL PRIMARY KEY,
	"shortUrl" TEXT NOT NULL,
	url TEXT NOT NULL,
	"visitCount" INTEGER NOT NULL DEFAULT 0,
	"userId" INTEGER NOT NULL REFERENCES "users"("id"),
	"createdAt" DATE NOT NULL
);