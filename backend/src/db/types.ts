import type { InferInsertModel } from 'drizzle-orm';
import * as schema from './schemas/schema';

export type Character = InferInsertModel<typeof schema.characters>;
export type Player = InferInsertModel<typeof schema.players>;
export type User = InferInsertModel<typeof schema.users>;
export type Guild = InferInsertModel<typeof schema.guilds>;
