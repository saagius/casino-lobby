import { TestBed, getTestBed } from '@angular/core/testing';

import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { GameService } from './game.service';
import { Game, GameCategory, GameProvider } from '../models/game';
import { GAMES } from '../mocks/mock-games';
import { GAME_PROVIDERS } from '../mocks/mock-providers';
import { GAME_CATEGORIES } from '../mocks/mock-categories';
import { GAMES_SEARCH } from '../mocks/mock-search';
import { VGS_GAMES } from '../mocks/mock-vgs-games';

describe('GameService', () => {
    let injector: TestBed;
    let gameService: GameService;
    let httpMock: HttpTestingController;
    
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [GameService]
        });

        injector = getTestBed();
        gameService = injector.get(GameService);
        httpMock = injector.get(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });
  
    it('#getDistinctCategories should return 13 categories', () => {
        const mockCategories: GameCategory[] = GAME_CATEGORIES;
        let data;
            
        gameService.getDistinctCategories().subscribe((categories: GameCategory[]) => {
            data = categories;
        });

        const mockReq = httpMock.expectOne(`${gameService.gamesUrl}/categories`);

        expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.responseType).toEqual('json');
            
        mockReq.flush(mockCategories);

        expect(data.length).toBe(13);
        expect(data).toBe(mockCategories);
    });

    it('#getDistinctProviders should return 7 providers', () => {
        const mockProviders: GameProvider[] = GAME_PROVIDERS;
        let data;
            
        gameService.getDistinctProviders().subscribe((providers: GameProvider[]) => {
            data = providers;
        });
        
        const mockReq = httpMock.expectOne(`${gameService.gamesUrl}/providers`);
        
        expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.responseType).toEqual('json');
        
        mockReq.flush(mockProviders);

        expect(data.length).toBe(7);
        expect(data).toBe(mockProviders);
    });

    it('#getGames should return 182 games', () => {
        const mockGames: Game[] = GAMES;
        let data;
            
        gameService.getGames().subscribe((games: Game[]) => {
            data = games;
        });
        
        const mockReq = httpMock.expectOne(`${gameService.gamesUrl}`);
        
        expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.responseType).toEqual('json');
        
        mockReq.flush(mockGames);

        expect(data.length).toBe(182);
        expect(data).toBe(mockGames);
    });

    it('#getGamesByProvider "VGS" should return 6 games', () => {
        const mockVGSGames: Game[] = VGS_GAMES;
        let data;
        let type = 'provider';
        let id = 'VGS';
            
        gameService.getGamesByTypeAndId(type, id).subscribe((games: Game[]) => {
            data = games;
        });
        
        const mockReq = httpMock.expectOne(`${gameService.gamesUrl}/by/${type}/${id}`);
        
        expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.responseType).toEqual('json');
        
        mockReq.flush(mockVGSGames);

        expect(data.length).toBe(6);
        expect(data).toBe(mockVGSGames);
    });

    it('#searchGames should return 5 games with term "vi"', () => {
        const mockGamesSearch: Game[] = GAMES_SEARCH;
        let term: string = 'vi';

        let data;
            
        gameService.searchGames(term).subscribe((games: Game[]) => {
            data = games;
        });
        
        const mockReq = httpMock.expectOne(`${gameService.gamesUrl}/search/by/name/${term}`);
        
        expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.responseType).toEqual('json');
        
        mockReq.flush(mockGamesSearch);

        expect(data.length).toBe(5);
        expect(data).toBe(mockGamesSearch);
    });
});