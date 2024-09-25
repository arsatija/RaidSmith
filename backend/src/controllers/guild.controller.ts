import { Request, Response } from 'express';
import { guildService } from '../services';
import type { Guild, Player } from '../db/types';
import logger from '../utils/logger';

interface createGuildRequest {
    realm: string;
    name: string;
}

interface guildParams {
    id: number;
}

export default class GuildController {
    static async createGuild(req: Request<{}, {}, createGuildRequest>, res: Response<Guild>) {
        try {
            const guild = await guildService.createGuild(req.body.realm, req.body.name);
            return res.json(guild);
        } catch (error) {
            logger.error('Failed to create guild.', { error: error });
            return res.sendStatus(500);
        }
    }

    static async getGuild(req: Request<guildParams>, res: Response<Guild | null>) {
        try {
            const guild_id = +req.params.id;
            const guild = await guildService.getGuild(guild_id);
            return res.json(guild);
        } catch (error) {
            logger.error('Failed to get guild.', { error: error });
            return res.sendStatus(500);
        }
    }

    static async getPlayers(req: Request<guildParams>, res: Response<Player[]>) {
        try {
            const guild_id = +req.params.id;
            const players = await guildService.getPlayers(guild_id);
            return res.json(players);
        } catch (error) {
            logger.error('Failed to get players from guild.', { error: error });
            return res.sendStatus(500);
        }
    }

    static async deleteGuild(req: Request<guildParams>, res: Response) {
        try {
            const guild_id = +req.params.id;
            await guildService.deleteGuild(guild_id);
            return res.send(`Successfully deleted guild ${guild_id}`).status(200);
        } catch (error) {
            logger.error('Failed to delete guild.', { error: error });
            return res.sendStatus(500);
        }
    }
}
