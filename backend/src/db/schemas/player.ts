import { pgTable, uuid, integer, text, timestamp, serial } from 'drizzle-orm/pg-core';
import { users, guilds } from './schema';

export const players = pgTable('players', {
    id: serial('player_id').primaryKey(),
    name: text('name').notNull(),
    user_id: uuid('user_id').references(() => users.id),
    guild_rank: text('guild_rank').notNull(),
    guild_id: integer('guild_id').references(() => guilds.id),
    in_game_role: text('in_game_role').notNull(),
    join_date: timestamp('join_date').defaultNow(),
    leave_date: timestamp('leave_date'),
    last_active: timestamp('last_active'),
});
