import express from 'express';
import v1_router from './v1';

const router = express.Router();

router.use('/v1', v1_router);

export default router;
