import { pgTable, uuid, varchar, timestamp } from "drizzle-orm/pg-core";

export const accounts = pgTable("accounts", {
    id: uuid("id").defaultRandom().primaryKey(),
    username: varchar("username", { length: 255 }).notNull().unique(),
    password: varchar("password").notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    lastUpdated: timestamp("last_updated").defaultNow().notNull(),
});
