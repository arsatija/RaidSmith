import { pgEnum } from "drizzle-orm/pg-core";

export const factionEnum = pgEnum('faction', ['Alliance', 'Horde']);
