import { CharacterService } from './services/character.service';

const characterService = new CharacterService();

await characterService.fetchCharacter('illidan', 'ravravravrav');
