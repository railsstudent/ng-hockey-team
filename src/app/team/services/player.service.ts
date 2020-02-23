import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { differenceInYears } from 'date-fns';
import { EMPTY, Observable, of, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { v4 as uuid } from 'uuid';
import { NewPlayer, Player } from '../models';

const PLAYERS_KEY = 'players';
const JSON_URL = 'assets/nationality.json';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private nationalitySub$ = new Subject<{ [key: string]: string }>();
  nationality$ = this.nationalitySub$.asObservable();

  constructor(private http: HttpClient) {}

  getAll(): Observable<Player[]> {
    const playerStr = localStorage.getItem(PLAYERS_KEY);
    const playerArray = playerStr ? (JSON.parse(playerStr) as Player[]) : [];
    return of(playerArray);
  }

  getPlayer(id: string): Observable<Player> {
    if (typeof id === 'undefined' || id === null || id === '') {
      return throwError('Playe id cannot be null');
    }

    const playerStr = localStorage.getItem(PLAYERS_KEY);
    const playerArray = playerStr ? (JSON.parse(playerStr) as Player[]) : [];
    const player = playerArray.find(p => p.id === id);
    if (!player) {
      return throwError(`Player ${id} does not exist`);
    }
    return of(player);
  }

  addPlayer(newPlayer: NewPlayer): Observable<Player> {
    const playerStr = localStorage.getItem(PLAYERS_KEY);
    const playerArray = playerStr ? (JSON.parse(playerStr) as Player[]) : [];

    const id = uuid();

    const age = differenceInYears(new Date(), newPlayer.dob);

    const player: Player = {
      id,
      ...newPlayer,
      age,
    };

    const newPlayerArray = [...playerArray, player];
    localStorage.setItem(PLAYERS_KEY, JSON.stringify(newPlayerArray));
    return of(player);
  }

  updatePlayer(player: Player): Observable<Player> {
    if (!player) {
      return throwError('Player cannot be null');
    }

    const playerStr = localStorage.getItem(PLAYERS_KEY);
    const playerArray = playerStr ? (JSON.parse(playerStr) as Player[]) : [];
    const existingPlayer = playerArray.find(p => p.id === player.id);
    if (!existingPlayer) {
      return throwError('Player does not exist.');
    }

    const updatedPlayer = {
      ...existingPlayer,
      ...player,
    };

    const updatedPlayerArray = playerArray.map(p => (p.id !== updatedPlayer.id ? p : updatedPlayer));
    localStorage.setItem(PLAYERS_KEY, JSON.stringify(updatedPlayerArray));

    return of(updatedPlayer);
  }

  deletePlayer(id: string): Observable<Player> {
    const playerStr = localStorage.getItem(PLAYERS_KEY);
    const playerArray = playerStr ? (JSON.parse(playerStr) as Player[]) : [];
    const player = playerArray.find(p => p.id === id);

    if (!player) {
      return throwError('Player does not exist');
    }

    const updatedPlayerArray = playerArray.filter(p => p.id !== id);
    localStorage.setItem(PLAYERS_KEY, JSON.stringify(updatedPlayerArray));
    return of(player);
  }

  getNationalities() {
    return this.http
      .get<{ [key: string]: string }>(JSON_URL)
      .pipe(
        tap(result => this.nationalitySub$.next({ '': '', ...result })),
        catchError(() => {
          this.nationalitySub$.next({});
          return EMPTY;
        }),
      )
      .subscribe();
  }
}
