import { pgTable, integer, varchar, pgEnum, timestamp, serial } from 'drizzle-orm/pg-core';
import { players } from './schema';

export const characters = pgTable('characters', {
    id: integer('character_id').primaryKey(),
    player_id: serial('player_id').references(() => players.id, {
        onDelete: 'cascade',
    }),
    character_name: varchar('character_name', { length: 13 }).notNull(),
    class: varchar('class').notNull(),
    level: integer('level').default(1),
    realm: varchar('realm', { length: 50 }).notNull(),
    race: varchar('race').notNull(),
    faction: varchar('faction').notNull(),
    spec: varchar('spec', { length: 50 }),
    guild: varchar('guild', { length: 24 }),
    last_logged_in: timestamp('last_logged_in'),
});
