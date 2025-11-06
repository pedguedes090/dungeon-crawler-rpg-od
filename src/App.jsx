import { useState, useEffect } from 'react';
import { GameProvider, useGame } from './context/GameContext';
import TitleScreen from './components/TitleScreen';
import CharacterCreation from './components/CharacterCreation';
import DungeonMain from './components/DungeonMain';
import Loading from './components/Loading';

function AppContent() {
  const { player, currentScreen, setCurrentScreen, loading, setLoading } = useGame();

  useEffect(() => {
    // Google Analytics
    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', 'G-8HZ96T7NQD');

    // Prevent double-click zooming on mobile devices
    document.ondblclick = function (e) {
      e.preventDefault();
    }

    // Determine initial screen
    if (player === null) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setCurrentScreen('character-creation');
      }, 1000);
    } else {
      setCurrentScreen('title');
    }
  }, []);

  return (
    <main>
      {loading && <Loading />}
      {currentScreen === 'title' && <TitleScreen />}
      {currentScreen === 'character-creation' && <CharacterCreation />}
      {currentScreen === 'dungeon-main' && <DungeonMain />}
    </main>
  );
}

function App() {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  );
}

export default App;
