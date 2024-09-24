import express from 'express';
import GuildRouter from './guild.route';

const router = express.Router();

router.use('/guild', GuildRouter);

export default router;
