import React, { FC, useState, useEffect } from 'react';
import './HomeScreen.css';
import GameContainer from '../GameContainer';
import { fetchLobbies, createLobby } from '../../api/apiFunctions';
import { LobbyData } from '../../types/types';

const HomeScreen:FC = () => {
  const [roomName, setRoomName] = useState('');
  const [selectedPlayer, setSelectedPlayer] = useState('');
  const [filter, setFilter] = useState('');
  const [lobbies, setLobbies] = useState<LobbyData[]>([]);

  useEffect(() => {
    // При загрузке компонента получаем список доступных комнат
    fetchLobbies().then((response) => {
      setLobbies(response.data);
    }).catch((error) => {
      console.error('Ошибка при получении списка комнат:', error);
    });
  }, []); // Вторым аргументом передаем [] чтобы запустить useEffect только при первой отрисовке

  const handleCreateLobby = () => {
    const newLobbyData: LobbyData = { name: roomName, guests: [selectedPlayer], id: 0 };
    createLobby(newLobbyData).then((response) => {
      // Обработка успешного создания комнаты
      console.log('Комната успешно создана:', response.data);
      // Тут можно добавить новую комнату в список комнат lobbies, если это необходимо
    }).catch((error) => {
      console.error('Ошибка при создании комнаты:', error);
    });
  };

  const handleApplyFilter = () => {
    // Здесь можно реализовать фильтрацию доступных комнат
    // Можно использовать filter() для отфильтровывания списка комнат и обновления состояния lobbies
  };

  return (
    <div className='b'>
      <div className='left'>
        <h2>Создать новую комнату</h2>
        <input
          type="text"
          value={roomName}
          placeholder="Название комнаты"
          onChange={(e) => setRoomName(e.target.value)}
        />
        <input
          type="text"
          value={selectedPlayer}
          placeholder="Имя игрока"
          onChange={(e) => setSelectedPlayer(e.target.value)}
        />
        <button onClick={handleCreateLobby} className='btn'>Создать</button>
      </div>
      <div
        style={{
          flex: 1,
          borderLeft: '1px solid white',
          padding: '20px',
        }}
      >
        <h2>Выберите существующую комнату</h2>
        <input
          type="text"
          value={filter}
          placeholder="Название комнаты"
          onChange={(e) => setFilter(e.target.value)}
        />
        <button onClick={handleApplyFilter} className='fil'>Применить</button>
        <ul>
          {lobbies.map((lobby) => (
            <li key={lobby.id}>{lobby.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HomeScreen;