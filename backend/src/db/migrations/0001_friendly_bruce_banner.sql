CREATE TABLE IF NOT EXISTS "guilds" (
	"id" integer PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"realm" varchar(255) NOT NULL,
	"faction" varchar(255) NOT NULL,
	"last_updated" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DROP TABLE "gear";--> statement-breakpoint
ALTER TABLE "characters" ALTER COLUMN "class" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "characters" ALTER COLUMN "race" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "characters" ALTER COLUMN "faction" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "players" ADD COLUMN "guild_id" integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "players" ADD CONSTRAINT "players_guild_id_guilds_id_fk" FOREIGN KEY ("guild_id") REFERENCES "public"."guilds"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
