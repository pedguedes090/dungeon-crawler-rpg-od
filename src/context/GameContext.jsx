import React, { createContext, useContext, useState, useEffect } from 'react';

const GameContext = createContext();

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

export const GameProvider = ({ children }) => {
  const [player, setPlayer] = useState(() => {
    const saved = localStorage.getItem('playerData');
    return saved ? JSON.parse(saved) : null;
  });

  const [dungeon, setDungeon] = useState(() => {
    const saved = localStorage.getItem('dungeonData');
    return saved ? JSON.parse(saved) : {
      rating: 500,
      grade: "E",
      progress: {
        floor: 1,
        room: 1,
        floorLimit: 100,
        roomLimit: 5,
      },
      settings: {
        enemyBaseLvl: 1,
        enemyLvlGap: 5,
        enemyBaseStats: 1,
        enemyScaling: 1.1,
      },
      status: {
        exploring: false,
        paused: true,
        event: false,
      },
      statistics: {
        kills: 0,
        runtime: 0,
      },
      backlog: [],
      action: 0,
    };
  });

  const [enemy, setEnemy] = useState(() => {
    const saved = localStorage.getItem('enemyData');
    return saved ? JSON.parse(saved) : null;
  });

  const [volume, setVolume] = useState(() => {
    const saved = localStorage.getItem('volumeData');
    return saved ? JSON.parse(saved) : {
      master: 1,
      bgm: 0.5,
      sfx: 1
    };
  });

  const [currentScreen, setCurrentScreen] = useState('title');
  const [loading, setLoading] = useState(false);

  // Save data to localStorage whenever state changes
  useEffect(() => {
    if (player) {
      localStorage.setItem('playerData', JSON.stringify(player));
    }
  }, [player]);

  useEffect(() => {
    if (dungeon) {
      localStorage.setItem('dungeonData', JSON.stringify(dungeon));
    }
  }, [dungeon]);

  useEffect(() => {
    if (enemy) {
      localStorage.setItem('enemyData', JSON.stringify(enemy));
    }
  }, [enemy]);

  useEffect(() => {
    if (volume) {
      localStorage.setItem('volumeData', JSON.stringify(volume));
    }
  }, [volume]);

  const saveData = () => {
    if (player) localStorage.setItem('playerData', JSON.stringify(player));
    if (dungeon) localStorage.setItem('dungeonData', JSON.stringify(dungeon));
    if (enemy) localStorage.setItem('enemyData', JSON.stringify(enemy));
    if (volume) localStorage.setItem('volumeData', JSON.stringify(volume));
  };

  const value = {
    player,
    setPlayer,
    dungeon,
    setDungeon,
    enemy,
    setEnemy,
    volume,
    setVolume,
    currentScreen,
    setCurrentScreen,
    loading,
    setLoading,
    saveData,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
