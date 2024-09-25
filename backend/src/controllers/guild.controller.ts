import { Request, Response } from 'express';
import { guildService } from '../services';
import type { Guild } from '../db/types';
import logger from '../utils/logger';
import { NeonDbError } from '@neondatabase/serverless';

export default class GuildController {
    static async createGuild(req: Request, res: Response) {
        try {
            const guild = await guildService.createGuild(req.body.realm, req.body.name);
            return res.json(guild);
        } catch (error) { 
            logger.error(`Failed to create guild ${req.body.name}-${req.body.realm}.`, {error: error});
            return res.sendStatus(500);
        }
    }

    static async getGuild(req: Request, res: Response) {
        try {
            const guild_id = +req.params.id;
            const guild = await guildService.getGuild(guild_id);
            return res.json(guild);
        } catch (error) {
            logger.error(`Failed to get guild ${req.body.name}-${req.body.realm}.`, { error: error });
            return res.sendStatus(500);
        }
        
    }

    static async getPlayers(req: Request, res: Response) {
        try {
            const guild_id = +req.params.id;
            const players = await guildService.getPlayers(guild_id);
            return res.json(players);
        } catch (error) {
            logger.error(`Failed to get players from guild ${req.body.name}-${req.body.realm}.`, { error: error });
            return res.sendStatus(500);
        }
    }

    static async deleteGuild(req: Request, res: Response) {
        try {
            const guild_id = +req.params.id;
            await guildService.deleteGuild(guild_id);
            return res.sendStatus(200);
        } catch (error) {
            logger.error(`Failed to delete guild ${req.body.name}-${req.body.realm}.`, { error: error });
            return res.sendStatus(500);
        }
    }
}
