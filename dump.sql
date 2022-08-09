CREATE TABLE "users" (
"id" SERIAL NOT NULL PRIMARY KEY,
"name" varchar(120) NOT NULL,
"email" varchar(100) UNIQUE NOT NULL,
"password" varchar(255) NOT NULL,
"createdAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW()    
);