import { Request, Response } from 'express';
import { playerService } from '../services';
import logger from '../utils/logger';
import { Character, Player } from '../db/types';

interface createPlayerRequest {
    name: string;
    rank: string;
    role: string;
    guild_id: number;
}

interface playerParams {
    id: number;
}

export default class PlayerController {
    static async createPlayer(req: Request<{}, {}, createPlayerRequest>, res: Response<Player>) {
        try {
            const player = await playerService.createPlayer(
                req.body.name,
                req.body.rank,
                req.body.role,
                req.body.guild_id
            );
            return res.json(player);
        } catch (error) {
            logger.error('Failed to create player.', { error: error });
            return res.sendStatus(500);
        }
    }

    static async getPlayer(req: Request<playerParams>, res: Response<Player | null>) {
        try {
            const player_id = req.params.id;
            const player = await playerService.getPlayer(player_id);
            return res.send(player);
        } catch (error) {
            logger.error('Failed to retrieve player.', { error: error });
            return res.sendStatus(500);
        }
    }

    static async getCharacters(req: Request<playerParams>, res: Response<Character[]>) {
        try {
            const player_id = +req.params.id;
            const characters = await playerService.getCharacters(player_id);
            return res.json(characters);
        } catch (error) {
            logger.error("Failed to retrieve player's characters.", { error: error });
            return res.sendStatus(500);
        }
    }

    static async deletePlayer(req: Request<playerParams>, res: Response) {
        try {
            const player_id = +req.params.id;
            await playerService.deletePlayer(player_id);
            return res.send(`Successfully deleted player ${player_id}`).status(200);
        } catch (error) {
            logger.error('Failed to delete player.', { error: error });
            return res.sendStatus(500);
        }
    }
}
