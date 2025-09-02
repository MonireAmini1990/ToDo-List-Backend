CREATE SCHEMA "note";
--> statement-breakpoint
CREATE TYPE "public"."category" AS ENUM('work', 'personal', 'wishList');--> statement-breakpoint
CREATE TYPE "public"."repeat" AS ENUM('daily', 'weekly', 'monthly');--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('pending', 'in_progress', 'completed', 'cancelled');--> statement-breakpoint
CREATE TABLE "note"."tasks" (
	"task_id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"due_date" date,
	"status" "status" NOT NULL,
	"user_id" integer NOT NULL,
	"category" "category" NOT NULL,
	"description" text NOT NULL,
	"repeat" "repeat",
	"time" time NOT NULL
);
--> statement-breakpoint
CREATE TABLE "note"."users" (
	"user_id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"last_name" varchar(100) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "note"."tasks" ADD CONSTRAINT "tasks_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "note"."users"("user_id") ON DELETE no action ON UPDATE no action;