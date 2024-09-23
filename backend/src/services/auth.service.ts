import { clerkClient } from '@clerk/clerk-sdk-node';

interface CreateUserInput {
    email: string;
    username: string;
    password: string;
}

export class AuthService {
    async createUser(input: CreateUserInput) {
        try {
            const user = await clerkClient.users.createUser({
                emailAddress: [input.email],
                username: input.username,
                password: input.password,
            });

            return user;
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }
}
