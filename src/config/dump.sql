
CREATE TABLE "users"
(
    "id" SERIAL NOT NULL PRIMARY KEY,
    "username" TEXT UNIQUE NOT NULL,
    "email" TEXT UNIQUE NOT NULL,
    "password" TEXT NOT NULL,
    "profile_image" TEXT NOT NULL,
    "created_at" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE "sessions"
(
    "id" SERIAL NOT NULL PRIMARY KEY,
    "user_id" INTEGER NOT NULL REFERENCES "users"("id"),
    "token" TEXT UNIQUE NOT NULL,
    "created_at" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE "posts"
(
    "id" SERIAL NOT NULL PRIMARY KEY,
    "user_id" INTEGER NOT NULL REFERENCES "users"("id"),
    "message" TEXT DEFAULT ' ',
    "shared_url" TEXT NOT NULL,
    "created_at" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    "title_link" TEXT,
    "image_link" TEXT,
    "description_link" TEXT,
    "updated_at" TIMESTAMP WITHOUT TIME ZONE
);

CREATE TABLE "postsdeleted"
(
    "id" SERIAL NOT NULL PRIMARY KEY,
    "user_id" INTEGER NOT NULL REFERENCES "users"("id"),
    "post_id" INTEGER NOT NULL REFERENCES "posts"("id"),
    "deleted_at" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE "hashtags"
(
    "id" SERIAL NOT NULL PRIMARY KEY,
    "name" TEXT UNIQUE NOT NULL,
    "created_at" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE "postshashtags"
(
    "id" SERIAL NOT NULL PRIMARY KEY,
    "post_id" INTEGER NOT NULL REFERENCES "posts"("id"),
    "hashtag_id" INTEGER NOT NULL REFERENCES "hashtags"("id"),
    "created_at" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW()
);
CREATE TABLE "reposts"
(
    "id" SERIAL NOT NULL PRIMARY KEY,
    "post_id" INTEGER NOT NULL REFERENCES "posts"("id"),
    "user_id" INTEGER NOT NULL REFERENCES "users"("id"),
    "created_at" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE "comments"
(
    "id" SERIAL NOT NULL PRIMARY KEY,
    "post_id" INTEGER NOT NULL REFERENCES "posts"("id"),
    "user_id" INTEGER NOT NULL REFERENCES "users"("id"),
    "message" varchar(200),
    "created_at" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE "likes"
(
    "id" SERIAL NOT NULL PRIMARY KEY,
    "user_id" INTEGER NOT NULL REFERENCES "users"("id"),
    "post_id" INTEGER NOT NULL REFERENCES "posts"("id"),
    "created_at" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW() 
);

CREATE TABLE "follows"
(
    "id" SERIAL NOT NULL PRIMARY KEY,
    "user" INTEGER NOT NULL REFERENCES "users"("id"),
    "following" INTEGER NOT NULL REFERENCES "users"("id"),
    "customer" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW() 
);