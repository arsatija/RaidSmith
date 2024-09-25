import express from 'express';
import GuildController from '../../controllers/guild.controller';

const router = express.Router();

router.post('/', GuildController.createGuild);
router.get('/:id', GuildController.getGuild);
router.get('/players/:id', GuildController.getPlayers);
router.delete('/', GuildController.deleteGuild);

export default router;
