import axios from "axios";
import TokenService from "./token.service";
import db from "../db";
import { type Character } from "../db/types";
import { BLIZZARD_CHARACTER_PROFILE_URL } from "../configs/blizzardApis.config";

export class CharacterService {
    private tokenService: TokenService;

    constructor() {
        this.tokenService = TokenService.getInstance();
    }

    public async fetchCharacter(realm: string, characterName: string) {
        try {
            const accessToken = await this.tokenService.getAccessToken();

            const apiUrl = `${BLIZZARD_CHARACTER_PROFILE_URL}/${encodeURIComponent(
                realm
            )}/${encodeURIComponent(characterName)}`;

            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                params: {
                    namespace: "profile-us",
                    locale: "en_US",
                },
            });

            console.log(response);
        } catch (error) {
            console.error("Error fetching character data:", error);
            throw error;
        }
    }

    public async storeCharacter(data: any) {
        const character: Character = {
            character_name: data.name,
            realm: data.realm.slug,
            race: data.race.name,
            class: data.character_class.name,
            spec: data.active_spec.name,
            level: data.level,
            faction: data.faction.name,
        };
    }
}
