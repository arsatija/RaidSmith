import { pgTable, uuid, varchar, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('accounts', {
    id: uuid('id').defaultRandom().primaryKey(),
    clerkUserId: varchar('clerk_user_id').notNull().unique(),
    username: varchar('username', { length: 255 }).notNull().unique(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    registered: timestamp('registered_date').defaultNow().notNull(),
    lastUpdated: timestamp('last_updated').defaultNow().notNull(),
});
