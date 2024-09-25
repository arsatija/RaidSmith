import { eq } from 'drizzle-orm';
import db from '../db';
import * as schema from '../db/schemas/schema';
import { Character, type Player } from '../db/types';
import logger from '../utils/logger';

export class PlayerService {
    constructor() {}

    private async storePlayer(player: Player): Promise<Player> {
        try {
            const insertedPlayer = await db.insert(schema.players).values(player).returning();

            return insertedPlayer[0];
        } catch (error) {
            logger.error('Failed to store player with the following error:', error);
            throw error;
        }
    }

    public async createPlayer(name: string, rank: string, role: string, guild_id: number) {
        try {
            const newPlayer: Player = {
                name: name,
                guild_rank: rank,
                in_game_role: role,
                guild_id: guild_id,
            };

            const player = await this.storePlayer(newPlayer);
            return player;
        } catch (error) {
            logger.error('Failed to create player with the following error', error);
            throw error;
        }
    }

    public async getPlayer(player_id: number): Promise<Player | null> {
        try {
            const player = await db.select().from(schema.players).where(eq(schema.players.id, player_id));
            if (player.length === 0) return null;
            return player[0] as Player;
        } catch (error) {
            logger.error(`Failed to get player ${player_id} with the following error:`, error);
            throw error;
        }
    }

    public async getCharacters(player_id: number): Promise<Character[]> {
        try {
            const players = await db.select().from(schema.characters).where(eq(schema.characters.player_id, player_id));

            return players as Character[];
        } catch (error) {
            logger.error(`Failed to get characters for player ${player_id} with the following error: ${error}`);
            throw error;
        }
    }

    public async deletePlayer(player_id: number): Promise<void> {
        try {
            await db.delete(schema.players).where(eq(schema.players.id, player_id));
        } catch (error) {
            logger.error(`Failed to delete player ${player_id} with the following error: ${error}`);
            throw error;
        }
    }
}
