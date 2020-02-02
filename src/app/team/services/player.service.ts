import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { v4 as uuid } from 'uuid';
import { NewPlayer, Player } from '../models';

const PLAYERS_KEY = 'players';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
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
    const player: Player = {
      id,
      ...newPlayer,
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
}
