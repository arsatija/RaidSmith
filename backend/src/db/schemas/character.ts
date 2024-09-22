import {
    pgTable,
    serial,
    integer,
    varchar,
    pgEnum,
    timestamp,
} from "drizzle-orm/pg-core";
import { players } from "./player";

// Define ENUMs
export const classEnum = pgEnum("class", [
    "Warrior",
    "Mage",
    "Rogue",
    "Priest",
    "Hunter",
    "Paladin",
    "Shaman",
    "Druid",
    "Warlock",
    "Death Knight",
    "Demon Hunter",
    "Evoker",
    "Monk",
]);
export const raceEnum = pgEnum("race", [
    "Human",
    "Orc",
    "Dwarf",
    "Night Elf",
    "Undead",
    "Tauren",
    "Gnome",
    "Troll",
    "Blood Elf",
    "Draenei",
    "Pandaren",
    "Void Elf",
    "Nightborne",
    "Highmountain Tauren",
    "Zandalari Troll",
    "Mag''har Orc",
    "Kul Tiran",
    "Dark Iron Dwarf",
    "Vulpera",
    "Mechanical",
    "Dracthyr",
]);
export const factionEnum = pgEnum("faction", ["Alliance", "Horde"]);

export const characters = pgTable("characters", {
    character_id: serial("character_id").primaryKey(),
    player_id: integer("player_id").references(() => players.player_id, {
        onDelete: "cascade",
    }),
    character_name: varchar("character_name", { length: 13 }).notNull(),
    class: classEnum("class").notNull(),
    level: integer("level").default(1),
    realm: varchar("realm", { length: 50 }).notNull(),
    race: raceEnum("race").notNull(),
    faction: raceEnum("faction").notNull(),
    spec: varchar("spec", { length: 50 }),
    guild: varchar("guild", { length: 24 }),
    last_logged_in: timestamp("last_logged_in"),
});
