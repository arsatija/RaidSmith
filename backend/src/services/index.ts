import { AuthService } from './auth.service';
import { CharacterService } from './character.service';
import { TokenService } from './token.service';
import { UserService } from './user.service';
import { GuildService } from './guild.service';
import { PlayerService } from './player.service';
import { oauthConfig } from '../configs/oauth.config';

export const authService = new AuthService();
export const userService = new UserService();
export const tokenService = new TokenService(oauthConfig);
export const characterService = new CharacterService(tokenService);
export const guildService = new GuildService();
export const playerService = new PlayerService();
