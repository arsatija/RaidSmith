import express from 'express';
import routes from './routes';
import morgan from 'morgan';
import logger from './utils/logger';

const app = express();
const morganMiddleware = morgan(':remote-addr :method :url :status :res[content-length] - :response-time ms', {
    stream: {
        write: (message) => logger.http(message),
    },
});

// Middleware
app.use(express.json());
app.use(morganMiddleware);

// Routes
app.use('/api', routes);

app.use((err: any, req: any, res: any, next: any) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
});

export default app;
