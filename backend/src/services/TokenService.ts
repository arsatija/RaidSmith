import {
    ClientCredentials,
    type AccessToken,
    type ModuleOptions,
} from "simple-oauth2";

const client = new ClientCredentials({
    client: {
        id: process.env.BLIZZARD_CLIENT_ID ?? "",
        secret: process.env.BLIZZARD_CLIENT_SECRET ?? "",
    },
    auth: {
        tokenHost: "https://oauth.battle.net/token",
    },
});

export class TokenService {
    private static instance: TokenService;

    private client: ClientCredentials;
    private cachedToken: AccessToken | null = null;

    constructor(config: ModuleOptions) {
        this.client = new ClientCredentials(config);
    }

    public static getInstance(config: ModuleOptions): TokenService {
        if (!TokenService.instance) {
            TokenService.instance = new TokenService(config);
        }
        return TokenService.instance;
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
            throw new Error("Failed to acquire access token");
        }
    }
}
