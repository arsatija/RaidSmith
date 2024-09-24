import { ClientCredentials, type AccessToken, type ModuleOptions } from 'simple-oauth2';

export class TokenService {
    private client: ClientCredentials;
    private cachedToken: AccessToken | null = null;

    constructor(config: ModuleOptions) {
        this.client = new ClientCredentials(config);
    }

    public async getAccessToken(): Promise<string> {
        if (this.cachedToken && !this.cachedToken.expired()) {
            return this.cachedToken.token.access_token as string;
        }

        try {
            const token = await this.client.getToken({});
            this.cachedToken = token;
            return token.token.access_token as string;
        } catch (error) {
            console.error(`Error acquiring access token: ${error}`);
            throw new Error('Failed to acquire access token');
        }
    }
}
