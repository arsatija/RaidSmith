DO $$ BEGIN
 CREATE TYPE "public"."faction" AS ENUM('Alliance', 'Horde');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."class" AS ENUM('Warrior', 'Mage', 'Rogue', 'Priest', 'Hunter', 'Paladin', 'Shaman', 'Druid', 'Warlock', 'Death Knight', 'Demon Hunter', 'Evoker', 'Monk');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."race" AS ENUM('Human', 'Orc', 'Dwarf', 'Night Elf', 'Undead', 'Tauren', 'Gnome', 'Troll', 'Blood Elf', 'Draenei', 'Pandaren', 'Void Elf', 'Nightborne', 'Highmountain Tauren', 'Zandalari Troll', 'Mag''har Orc', 'Kul Tiran', 'Dark Iron Dwarf', 'Vulpera', 'Mechanical', 'Dracthyr');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "players" (
	"player_id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"user_id" uuid,
	"guild_rank" text NOT NULL,
	"in_game_role" text NOT NULL,
	"join_date" timestamp DEFAULT now(),
	"leave_date" timestamp,
	"last_active" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "characters" (
	"character_id" integer PRIMARY KEY NOT NULL,
	"player_id" serial NOT NULL,
	"character_name" varchar(13) NOT NULL,
	"class" "class" NOT NULL,
	"level" integer DEFAULT 1,
	"realm" varchar(50) NOT NULL,
	"race" "race" NOT NULL,
	"faction" "faction" NOT NULL,
	"spec" varchar(50),
	"guild" varchar(24),
	"last_logged_in" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "gear" (
	"gear_id" serial PRIMARY KEY NOT NULL,
	"character_id" integer NOT NULL,
	"trinket1" varchar(100),
	"trinket2" varchar(100),
	"weapon" varchar(100),
	"tier_2set" boolean DEFAULT false,
	"tier_4set" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "accounts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"clerk_user_id" varchar NOT NULL,
	"username" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"registered_date" timestamp DEFAULT now() NOT NULL,
	"last_updated" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "accounts_clerk_user_id_unique" UNIQUE("clerk_user_id"),
	CONSTRAINT "accounts_username_unique" UNIQUE("username"),
	CONSTRAINT "accounts_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "players" ADD CONSTRAINT "players_user_id_accounts_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."accounts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "characters" ADD CONSTRAINT "characters_player_id_players_player_id_fk" FOREIGN KEY ("player_id") REFERENCES "public"."players"("player_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "gear" ADD CONSTRAINT "gear_character_id_characters_character_id_fk" FOREIGN KEY ("character_id") REFERENCES "public"."characters"("character_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
