import { useGame } from '../context/GameContext';
import { useMusic } from '../hooks/useMusic';

function TitleScreen() {
  const { player, setCurrentScreen, setLoading } = useGame();
  const music = useMusic();

  const handleClick = () => {
    if (music.sfxConfirm) {
      music.sfxConfirm.play();
    }
    const playerData = JSON.parse(localStorage.getItem('playerData'));
    
    if (playerData && playerData.allocated) {
      // Start loading and transition to dungeon
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setCurrentScreen('dungeon-main');
      }, 1000);
    } else {
      // Show stat allocation popup
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setCurrentScreen('dungeon-main');
      }, 1000);
    }
  };

  return (
    <section id="title-screen" className="game-container" onClick={handleClick}>
      <div>
        <i className="fa-solid fa-dungeon fa-5x"></i>
        <h1>Dungeon Crawler on Demand!</h1>
      </div>
      <p>Tap to explore the dungeon</p>
    </section>
  );
}

export default TitleScreen;
