import { Request, Response } from 'express';
import { guildService } from '../services';
import type { Guild } from '../db/types';

export default class GuildController {
    static async createGuild(req: Request, res: Response) {
        const newGuild = req.body as Guild;
        const guild = await guildService.createGuild(newGuild);
        return res.json(guild);
    }

    static async getGuild(req: Request, res: Response) {
        const guild_id = +req.params.id;
        const guild = await guildService.getGuild(guild_id);
        return res.json(guild);
    }

    static async getPlayers(req: Request, res: Response) {
        const guild_id = +req.params.id;
        const players = await guildService.getPlayers(guild_id);
        return res.json(players);
    }
}
