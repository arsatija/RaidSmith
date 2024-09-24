import express from 'express';
import GuildController from '../../controllers/guild.controller';

const router = express.Router();

router.post('/create', GuildController.createGuild);
router.get('/:id', GuildController.getGuild);
router.get('/players/:id', GuildController.getPlayers);

export default router;
