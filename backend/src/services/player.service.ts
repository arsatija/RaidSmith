import { eq } from 'drizzle-orm';
import db from '../db';
import * as schema from '../db/schemas/schema';
import { type Player } from '../db/types';

export class PlayerService {
    constructor() {}

    public async storePlayer(player: Player): Promise<number> {
        try {
            const insertedPlayer = await db.insert(schema.players).values(player).returning({ id: schema.players.id });

            return insertedPlayer[0].id;
        } catch (error) {
            console.error('Failed to store player with the following error:', error);
            throw error;
        }
    }

    public async getPlayer(player_id: number): Promise<Player | null> {
        try {
            const player = await db.select().from(schema.players).where(eq(schema.players.id, player_id));
            if (player.length === 0) return null;
            return player[0] as Player;
        } catch (error) {
            console.log(`Failed to get player ${player_id} with the following error:`, error);
            throw error;
        }
    }
}
