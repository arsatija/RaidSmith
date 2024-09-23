import { pgTable, serial, integer, varchar, boolean } from 'drizzle-orm/pg-core';
import { characters } from './schema';

export const gear = pgTable('gear', {
    id: serial('gear_id').primaryKey(),
    character_id: integer('character_id')
        .references(() => characters.id, {
            onDelete: 'cascade',
        })
        .notNull(),
    trinket1: varchar('trinket1', { length: 100 }),
    trinket2: varchar('trinket2', { length: 100 }),
    weapon: varchar('weapon', { length: 100 }),
    tier_2set: boolean('tier_2set').default(false),
    tier_4set: boolean('tier_4set').default(false),
});
