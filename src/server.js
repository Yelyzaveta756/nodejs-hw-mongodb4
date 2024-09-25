import express from 'express';
import cors from 'cors';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { logger } from './middlewares/logger.js';
import { env } from './utils/env.js';
import { contactRouter } from './routers/contacts.js';

export default function setupServer(){
    const app = express();
    const PORT = Number(env('PORT', 3000));

    app.use(cors());
    app.use(logger);
    app.use(express.json());

    app.use(contactRouter);

    app.use('*', notFoundHandler);

    app.use(errorHandler);

      app.listen(PORT, ()=> {
        console.log(`Server is running on ${PORT}`);
      });
}


