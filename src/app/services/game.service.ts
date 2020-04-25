import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { 
  Game,
  GameCategory,
  GameProvider
} from '../models/game';
import { MessageService } from './message.service';

@Injectable({ providedIn: 'root' })
export class GameService {
  gamesUrl = 'api/games';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET Game Categories from the server */
  getDistinctCategories(): Observable<GameCategory[]> {
    return this.http.get<GameCategory[]>(`${this.gamesUrl}/categories`)
      .pipe(
        tap(_ => this.log('fetched game categories')),
        catchError(this.handleError<GameCategory[]>('getDistinctCategories', []))
      );
  }

  /** GET Game Providers from the server */
  getDistinctProviders(): Observable<GameProvider[]> {
    return this.http.get<GameProvider[]>(`${this.gamesUrl}/providers`)
      .pipe(
        tap(_ => this.log('fetched game providers')),
        catchError(this.handleError<GameProvider[]>('getDistinctProviders', []))
      );
  }

  /** GET Games from the server */
  getGames(): Observable<Game[]> {
    return this.http.get<Game[]>(this.gamesUrl)
      .pipe(
        tap(_ => this.log('fetched games')),
        catchError(this.handleError<Game[]>('getGames', []))
      );
  }

  /** GET Game by id from the server */
  getGame(id: number): Observable<Game> {
    const url = `${this.gamesUrl}/id/${id}`;
    return this.http.get<Game>(url).pipe(
      tap(_ => this.log(`fetched game id=${id}`)),
      catchError(this.handleError<Game>(`getGame id=${id}`))
    );
  }

  /** GET Games whose name contains search term from the server */
  searchGames(term: string): Observable<Game[]> {
    if (!term.trim()) {
      // if not search term, return empty game array.
      return of([]);
    }
    return this.http.get<Game[]>(`${this.gamesUrl}/search/by/name/${term}`).pipe(
      tap(x => x.length ?
        this.log(`found games matching "${term}"`) :
        this.log(`no games matching "${term}"`)),
      catchError(this.handleError<Game[]>('searchGames', []))
    );
  }

  /** GET Games by type and type id from the server */
  getGamesByTypeAndId(type: string, id: string): Observable<Game[]> {
    return this.http.get<Game[]>(`${this.gamesUrl}/by/${type}/${id}`).pipe(
      tap(x => x.length ?
        this.log(`found games matching ${type} "${id}"`) :
        this.log(`no games matching ${type} "${id}"`)),
      catchError(this.handleError<Game[]>('getGamesByTypeAndId', []))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a GameService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`GameService: ${message}`);
  }
}
