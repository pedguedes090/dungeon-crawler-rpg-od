import { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { nFormatter } from '../utils/utility';

function DungeonMain() {
  const { player, dungeon } = useGame();
  const [showInventory, setShowInventory] = useState(false);

  if (!player) return null;

  return (
    <section id="dungeon-main" className="game-container scrollable">
      <header>
        <p id="player-name">{player.name} Lv.{player.lvl}</p>
        <p id="player-exp">EXP: {nFormatter(player.exp.expCurr)}/{nFormatter(player.exp.expMax)}</p>
        <p id="player-gold">Gold: {nFormatter(player.gold)}</p>
        <button onClick={() => setShowInventory(true)}>
          <i className="fas fa-bars" style={{fontSize: '1.3rem'}}></i>
        </button>
      </header>
      
      <div className="stat-panel">
        <div className="box">
          <h4>Stats</h4>
          <p><i className="fas fa-heart"></i>HP: <span id="player-hp">{player.stats.hp}/{player.stats.hpMax}</span></p>
          <p><i className="ra ra-sword"></i>ATK: <span id="player-atk">{player.stats.atk}</span></p>
          <p><i className="ra ra-round-shield"></i>DEF: <span id="player-def">{player.stats.def}</span></p>
          <p><i className="ra ra-plain-dagger"></i>ATK.SPD: <span id="player-atkspd">{player.stats.atkSpd?.toFixed(2)}</span></p>
          <p><i className="ra ra-dripping-blade"></i>VAMP: <span id="player-vamp">{player.stats.vamp}%</span></p>
          <p><i className="ra ra-lightning-bolt"></i>C.RATE: <span id="player-crate">{player.stats.critRate}%</span></p>
          <p><i className="ra ra-focused-lightning"></i>C.DMG: <span id="player-cdmg">{player.stats.critDmg}%</span></p>
        </div>
        <div className="box" id="bonus-stats">
          {/* Bonus stats will be rendered here */}
        </div>
      </div>
      
      <div className="dungeon-head">
        <p id="dungeonTime">Time: 00:00:00</p>
        <p id="floorCount">Floor: {dungeon.progress.floor}</p>
        <p id="roomCount">Room: {dungeon.progress.room}</p>
        <button id="dungeonActivity">Start</button>
      </div>
      
      <div className="logBox primary-panel">
        <p id="dungeonAction">Welcome to the dungeon!</p>
        <div id="dungeonLog">
          {/* Dungeon logs will be rendered here */}
        </div>
      </div>
    </section>
  );
}

export default DungeonMain;
