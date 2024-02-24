import path from 'path';

import 'dotenv/config';

export const BASE_DIR = path.dirname(__filename);

export const GRAPHIQL = Boolean(process.env.GRAPHIQL);

export const MONGODB_URI = String(process.env.MONGODB_URI);
