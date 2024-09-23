import { pgTable, serial, uuid, text, timestamp } from 'drizzle-orm/pg-core';
import { users } from './user';

export const players = pgTable('players', {
    player_id: serial('player_id').primaryKey(),
    name: text('name').notNull(),
    account_id: uuid('account_id').references(() => users.id),
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
