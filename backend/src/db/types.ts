import type { InferInsertModel } from 'drizzle-orm';
import * as schema from './schemas/schema';

export type Character = InferInsertModel<typeof schema.characters>;
export type Player = InferInsertModel<typeof schema.players>;
export type Gear = InferInsertModel<typeof schema.gear>;
export type User = InferInsertModel<typeof schema.users>;
