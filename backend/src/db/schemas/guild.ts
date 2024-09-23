import { pgTable, uuid, text, varchar, timestamp } from 'drizzle-orm/pg-core';
import { characters } from './schema';

export const guilds = pgTable('guilds', {
    id: uuid('id').defaultRandom().primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    realm: varchar('realm', { length: 255 }).notNull(),
    faction: varchar('faction', { length: 255 }).notNull(),
    guildmaster: uuid('guildmaster').references(() => characters.character_id),
    last_updated: timestamp('last_updated').defaultNow().notNull(),
});
