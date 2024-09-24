import { pgTable, integer, varchar, timestamp } from 'drizzle-orm/pg-core';

export const guilds = pgTable('guilds', {
    id: integer('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    realm: varchar('realm', { length: 255 }).notNull(),
    faction: varchar('faction', { length: 255 }).notNull(),
    last_updated: timestamp('last_updated').defaultNow().notNull(),
});
