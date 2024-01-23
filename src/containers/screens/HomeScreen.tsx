import React, { FC, useState, useEffect } from 'react';
import './HomeScreen.css';
import GameContainer from '../GameContainer';
import { fetchLobbies, createLobby } from '../../api/apiFunctions';
import { LobbyData } from '../../types/types';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const HomeScreen:FC = () => {
  const [roomName, setRoomName] = useState('');
  const [selectedPlayer, setSelectedPlayer] = useState('');
  const [name, setName] = useState('');
  const [guest, setGuest] = useState('');
  const [filter, setFilter] = useState('');
  const [filteredLobbies, setFilteredLobbies] = useState<LobbyData[]>([]);
  const [lobbies, setLobbies] = useState<LobbyData[]>([]);
  const [username, setUsername] = useState('');
  const isAuth=useAuth()
  const navigate = useNavigate();

  const handleLogout = () => {
    // Дополнительные операции, связанные с выходом пользователя
    navigate('/'); // Переход на страницу логина после выхода
  };
  

  useEffect(() => {
    // При загрузке компонента получаем список доступных комнат
    fetchLobbies().then((response) => {
      setLobbies(response.data);
    }).catch((error) => {
      console.error('Ошибка при получении списка комнат:', error);
    });
  }, []); // Вторым аргументом передаем [] чтобы запустить useEffect только при первой отрисовке

  
  const handleCreate = () => {
    fetch('api/lobbies/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: name, guest: guest }), 
    })
    .then(response => response.json())
    .then(data => {
      console.log('Room created:', data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };
  const handleCreateLobby = () => {
    const newLobbyData: LobbyData = { name: name, guests: [guest], id: 0 }; // Также используем значения из состояний name и guest
    createLobby(newLobbyData).then((response) => {
      console.log('Комната успешно создана:', response.data);
    }).catch((error) => {
      console.error('Ошибка при создании комнаты:', error);
    });
  };
  const handleApplyFilter = () => {
    const filtered = lobbies.filter(lobby => lobby.name.toLowerCase().includes(filter.toLowerCase()));
    setFilteredLobbies(filtered);
  };

  return (
    <div className='b'>
        <h1>{isAuth? <button onClick={handleLogout} className='out'>выйти</button>:null}</h1>
      <div className='left'>
        <h2>Создать новую комнату</h2>
        <input
          type="text"
          value={name}
          placeholder="Название комнаты"
          onChange={e => setName(e.target.value)}
        />
        <input
          type="text"
          value={guest}
          placeholder="Имя игрока"
          onChange={e => setGuest(e.target.value)}
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
        <h2>Выберите комнату для игры</h2>
        <input
          type="text"
          value={filter}
          placeholder="Название комнаты"
          onChange={(e) => setFilter(e.target.value)}
        />
        <button onClick={handleApplyFilter} className='fil'>Применить</button>
        <ul>
          {filteredLobbies.length > 0 ? ( // Если есть отфильтрованные комнаты, отображаем их
            filteredLobbies.map((lobby) => (
              <li key={lobby.id}><Link to={`/game/${lobby.id}`}>{lobby.name}</Link></li>
            ))
          ) : ( 
            lobbies.map((lobby) => (
                <li key={lobby.id}><Link to={`/game/${lobby.id}`}>{lobby.name}</Link></li>
              ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default HomeScreen;