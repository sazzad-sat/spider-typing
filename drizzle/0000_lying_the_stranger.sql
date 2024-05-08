DO $$ BEGIN
 CREATE TYPE "keyboard_keys" AS ENUM('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', ';');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "typing_performance" (
	"id" serial PRIMARY KEY NOT NULL,
	"practice_date" date NOT NULL,
	"start_time" time NOT NULL,
	"end_time" time NOT NULL,
	"problem_keys" keyboard_keys[] DEFAULT '{}' NOT NULL,
	"user_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "typing_performance_practice_date_start_time_end_time_user_id_unique" UNIQUE("practice_date","start_time","end_time","user_id")
);
