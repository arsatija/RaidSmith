import express from 'express';
import PlayerController from '../../controllers/player.controller';
const router = express.Router();

router.post('/create', PlayerController.createPlayer);
router.get('/:id', PlayerController.getPlayer);
router.get('/characters/:id', PlayerController.getCharacters);

export default router;
