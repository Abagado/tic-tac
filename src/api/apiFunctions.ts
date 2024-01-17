import { AxiosResponse, AxiosError } from 'axios'; // Импорт типов для axios
import { LobbyData, MoveData } from '../types/types';
import { instance } from './axios.api';

export const fetchLobbies = (): Promise<AxiosResponse<LobbyData[]>> => {
  return instance.get('/lobbies/');
}

export const createLobby = (data: LobbyData): Promise<AxiosResponse<LobbyData>> => {
 return instance.post('/lobbies/', data);
}

export const fetchMoves = (): Promise<AxiosResponse<MoveData[]>> => {
  return instance.get('/moves/');
}

export const createMove = (data: MoveData): Promise<AxiosResponse<MoveData>> => {
  return instance.post('/moves/', data);
}