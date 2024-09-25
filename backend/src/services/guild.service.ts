import { eq } from 'drizzle-orm';
import db from '../db';
import * as schema from '../db/schemas/schema';
import type { Guild, Player } from '../db/types';
import logger from '../utils/logger';
import { BLIZZARD_GUILD_PROFILE_URL } from '../configs/blizzardApis.config';
import { tokenService } from '.';
import axios from 'axios';

export class GuildService {
    constructor() {}

    private async fetchGuild(realm: string, name: string) {
        const accessToken = await tokenService.getAccessToken();

        const apiUrl = `${BLIZZARD_GUILD_PROFILE_URL}/${encodeURIComponent(realm)}/${encodeURIComponent(name)}`;

        const response = await axios.get(apiUrl, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            params: {
                namespace: 'profile-us',
                locale: 'en_US',
            },
        });

        return response.data;
    }

    private async storeGuild(data: any): Promise<Guild> {
        const guild: Guild = {
            id: data.id,
            name: data.name,
            realm: data.realm.slug,
            faction: data.faction.name,
        };
        const insertedGuild = await db.insert(schema.guilds).values(guild).returning();

        return insertedGuild[0] as Guild;
    }

    public async createGuild(realm: string, name: string) {
        const response = await this.fetchGuild(realm, name);

        const insertedGuild = await this.storeGuild(response);

        return insertedGuild;
    }

    public async getGuild(guild_id: number): Promise<Guild | null> {
        const guild = await db.select().from(schema.guilds).where(eq(schema.guilds.id, guild_id));
        if (guild.length === 0) return null;
        return guild[0] as Guild;
    }

    public async getPlayers(guild_id: number): Promise<Player[]> {
        const players = await db.select().from(schema.players).where(eq(schema.players.guild_id, guild_id));

        return players as Player[];
    }

    public async deleteGuild(guild_id: number): Promise<void> {
        await db.delete(schema.guilds).where(eq(schema.guilds.id, guild_id));
    }
}
