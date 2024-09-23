import db from '../db';
import { type User } from '../db/types';
import * as schema from '../db/schemas/schema';
import { eq } from 'drizzle-orm';

export class UserService {
    async createUserProfile(
        clerkUserId: string,
        additionalData: Partial<User>
    ) {
        try {
            const newUser: User = {
                clerkUserId: clerkUserId,
                email: additionalData.email!,
                username: additionalData.username!,
            };

            await db.insert(schema.users).values(newUser).execute();

            console.log('User profile created succesfully:', newUser);
        } catch (error) {
            console.error('Eror creating user profile:', error);
            throw error;
        }
    }

    async getUserProfile(clerk_user_id: string): Promise<User | null> {
        try {
            const result = await db
                .select()
                .from(schema.users)
                .where(eq(schema.users.clerkUserId, clerk_user_id));
            if (result.length === 0) return null;
            return result[0] as User;
        } catch (error) {
            console.error('Error retrieving user profile', error);
            throw error;
        }
    }
}
