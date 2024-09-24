import { eq } from 'drizzle-orm';
import db from '../db';
import * as schema from '../db/schemas/schema';
import type { Guild, Player } from '../db/types';

export class PlayerService {
    constructor() {}

    public async storeGuild(guild: Guild): Promise<number> {
        try {
            const insertedGuild = await db.insert(schema.guilds).values(guild).returning({ id: schema.guilds.id });

            return insertedGuild[0].id;
        } catch (error) {
            console.error('Failed to store guild with the following error:', error);
            throw error;
        }
    }

    public async getGuild(guild_id: number): Promise<Guild | null> {
        try {
            const guild = await db.select().from(schema.guilds).where(eq(schema.guilds.id, guild_id));
            if (guild.length === 0) return null;
            return guild[0] as Guild;
        } catch (error) {
            console.log(`Failed to get player ${guild_id} with the following error: ${error}`);
            throw error;
        }
    }

    public async getPlayers(guild_id: number): Promise<Player[]> {
        try {
            const players = await db.select().from(schema.players).where(eq(schema.players.guild_id, guild_id));

            return players as Player[];
        } catch (error) {
            console.error(`Failed to get players from guild ${guild_id} with the following error: ${error}`);
            throw error;
        }
    }
}
