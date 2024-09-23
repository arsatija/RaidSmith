import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core';
import { users } from './schema';

export const players = pgTable('players', {
    player_id: uuid('player_id').defaultRandom().primaryKey(),
    name: text('name').notNull(),
    user_id: uuid('user_id').references(() => users.id),
    guild_rank: text('guild_rank', {
        enum: ['Guild Master', 'Officer', 'Raider', 'Trial', 'Retired'],
    }).notNull(),
    in_game_role: text('in_game_role', {
        enum: ['Tank', 'Healer', 'DPS'],
    }).notNull(),
    join_date: timestamp('join_date').defaultNow(),
    leave_date: timestamp('leave_date'),
    last_active: timestamp('last_active'),
});
