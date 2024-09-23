import { pgTable, serial, uuid, varchar, boolean } from 'drizzle-orm/pg-core';
import { characters } from './schema';

export const gear = pgTable('gear', {
    gear_id: serial('gear_id').primaryKey(),
    character_id: uuid('character_id')
        .references(() => characters.character_id, {
            onDelete: 'cascade',
        })
        .notNull(),
    trinket1: varchar('trinket1', { length: 100 }),
    trinket2: varchar('trinket2', { length: 100 }),
    weapon: varchar('weapon', { length: 100 }),
    tier_2set: boolean('tier_2set').default(false),
    tier_4set: boolean('tier_4set').default(false),
});
