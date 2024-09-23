import { expect } from 'chai';
import { CharacterService } from '../../src/services/character.service';
import db from '../../src/db';
import * as schema from '../../src/db/schemas/schema';
import { eq } from 'drizzle-orm';
import sinon from 'sinon';
import axios from 'axios';
import { Player, User } from '../../src/db/types';
import { faker } from '@faker-js/faker';

const mockUser: User = {
    clerkUserId: faker.string.uuid(),
    email: faker.internet.email(),
    username: faker.internet.userName(),
};

const mockPlayer: Player = {
    name: faker.internet.displayName(),
    user_id: undefined,
    guild_rank: 'Raider',
    in_game_role: 'DPS',
};

describe('CharacterService', () => {
    let characterService: CharacterService;

    before(async () => {
        // Deleteing in order to ensure no foreign key constraint issues. too lazy to write clever code for it atm
        await db.delete(schema.characters);
        await db.delete(schema.players);
        await db.delete(schema.users);

        characterService = new CharacterService();
    });

    it('should fetch a character from the realm Illidan named Ravxd and store it in the db', async () => {
        // Add a fake user to the db to use as a foreign key for player insertion
        const insertedUser = await db.insert(schema.users).values(mockUser).returning({ user_id: schema.users.id });
        mockPlayer.user_id = insertedUser[0].user_id;

        // Add a fake player to the db to use as a foreign key for character insertion
        const insertedPlayer = await db
            .insert(schema.players)
            .values(mockPlayer)
            .returning({ player_id: schema.players.id });
        const insertedPlayerId = insertedPlayer[0].player_id;

        const realm = 'illidan';
        const characterName = 'Ravxd';

        // Mock the response from the Blizzard API
        const mockApiResponse = {
            data: {
                id: '230144631',
                name: 'Ravxd',
                realm: { slug: 'illidan' },
                race: { name: 'Night Elf' },
                character_class: { name: 'Priest' },
                active_spec: { name: 'Shadow' },
                level: 80,
                faction: { name: 'Alliance' },
            },
        };

        // Stub the axios.get method to return the mock response
        const axiosGetStub = sinon.stub(axios, 'get').resolves(mockApiResponse);

        await characterService.addCharacter(realm, characterName, insertedPlayerId);

        let storedCharacter = await db
            .select()
            .from(schema.characters)
            .where(eq(schema.characters.character_name, 'Ravxd'));

        expect(storedCharacter[0]).to.exist;
        expect(storedCharacter[0].character_name).to.equal('Ravxd');
        expect(storedCharacter[0].realm).to.equal('illidan');

        // Restore the original axios.get method
        axiosGetStub.restore();
    });
});
