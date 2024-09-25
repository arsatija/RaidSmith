import { Request, Response } from 'express';
import { playerService } from '../services';

export default class PlayerController {
    static async createPlayer(req: Request, res: Response) {
        const player = await playerService.createPlayer(req.body.name, req.body.rank, req.body.role, req.body.guild_id);
        return res.json(player);
    }

    static async getPlayer(req: Request, res: Response) {
        const player_id = +req.params.id;
        const player = await playerService.getPlayer(player_id);
        return res.json(player);
    }

    static async getCharacters(req: Request, res: Response) {
        const player_id = +req.params.id;
        const characters = await playerService.getCharacters(player_id);
        return res.json(characters);
    }

    static async deletePlayer(req: Request, res: Response) {
        try {
            const player_id = +req.params.id;
            await playerService.deletePlayer(player_id);
            return res.sendStatus(200);
        } catch (error) {
            return res.sendStatus(500);
        }
    }
}
