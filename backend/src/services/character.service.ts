import axios from 'axios';
import TokenService from './token.service';
import db from '../db';
import { type Character } from '../db/types';
import { BLIZZARD_CHARACTER_PROFILE_URL } from '../configs/blizzardApis.config';
import * as schema from '../db/schemas/schema';
import { and, eq } from 'drizzle-orm';

export class CharacterService {
    private tokenService: TokenService;

    constructor() {
        this.tokenService = TokenService.getInstance();
    }

    public async fetchCharacter(realm: string, characterName: string): Promise<any> {
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
                    namespace: 'profile-us',
                    locale: 'en_US',
                },
            });

            return response.data;
        } catch (error) {
            console.error('Error fetching character data:', error);
            throw error;
        }
    }

    private async storeCharacter(data: any, player_id: number) {
        try {
            const character: Character = {
                id: data.id,
                player_id: player_id,
                character_name: data.name,
                realm: data.realm.slug,
                race: data.race.name,
                class: data.character_class.name,
                spec: data.active_spec.name,
                level: data.level,
                faction: data.faction.name,
            };

            await db.insert(schema.characters).values(character);
        } catch (error) {
            console.error('Failed to store character with the following error: ', error);
            throw error;
        }
    }

    public async addCharacter(realm: string, characterName: string, player_id: number): Promise<void> {
        try {
            const response = await this.fetchCharacter(realm, characterName);
            await this.storeCharacter(response, player_id);
        } catch (error) {
            console.error('Failed to add character with the following error: ', error);
            throw error;
        }
    }
    public async getCharacter(realm: string, characterName: string): Promise<Character | null> {
        try {
            const response = await db
                .select()
                .from(schema.characters)
                .where(and(eq(schema.characters.realm, realm), eq(schema.characters.character_name, characterName)));

            if (response.length === 0) return null;

            return response[0] as Character;
        } catch (error) {
            console.error('Failed to retrieve character with the following error:', error);
            throw error;
        }
    }
}
