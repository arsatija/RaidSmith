import type { ModuleOptions } from "simple-oauth2";

const clientId = process.env.BLIZZARD_CLIENT_ID ?? "";
const clientSecret = process.env.BLIZZARD_CLIENT_SECRET ?? "";

export const oauthConfig: ModuleOptions = {
    client: {
        id: clientId,
        secret: clientSecret,
    },
    auth: {
        tokenHost: "https://oauth.battle.net/token",
    },
};
