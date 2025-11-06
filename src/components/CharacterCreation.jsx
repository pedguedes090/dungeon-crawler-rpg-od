import { useState } from 'react';
import { useGame } from '../context/GameContext';

function CharacterCreation() {
  const { setPlayer, setCurrentScreen, setLoading, saveData } = useGame();
  const [name, setName] = useState('');
  const [alert, setAlert] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if (format.test(name)) {
      setAlert('Your name cannot contain special characters!');
      return;
    }
    
    if (name.length < 3 || name.length > 15) {
      setAlert('Name should be between 3-15 characters!');
      return;
    }

    // Create new player
    const newPlayer = {
      name: name,
      lvl: 1,
      stats: {
        hp: null,
        hpMax: null,
        atk: null,
        def: null,
        pen: null,
        atkSpd: null,
        vamp: null,
        critRate: null,
        critDmg: null
      },
      baseStats: {
        hp: 500,
        atk: 100,
        def: 50,
        pen: 0,
        atkSpd: 0.6,
        vamp: 0,
        critRate: 0,
        critDmg: 50
      },
      equippedStats: {
        hp: 0,
        atk: 0,
        def: 0,
        pen: 0,
        atkSpd: 0,
        vamp: 0,
        critRate: 0,
        critDmg: 0,
        hpPct: 0,
        atkPct: 0,
        defPct: 0,
        penPct: 0,
      },
      bonusStats: {
        hp: 0,
        atk: 0,
        def: 0,
        atkSpd: 0,
        vamp: 0,
        critRate: 0,
        critDmg: 0
      },
      exp: {
        expCurr: 0,
        expMax: 100,
        expCurrLvl: 0,
        expMaxLvl: 100,
        lvlGained: 0
      },
      inventory: {
        consumables: [],
        equipment: []
      },
      equipped: [],
      gold: 0,
      playtime: 0,
      kills: 0,
      deaths: 0,
      inCombat: false,
      skills: [],
      tempStats: {
        atk: 0,
        atkSpd: 0
      }
    };

    // Calculate initial stats
    const calculateStats = (player) => {
      let equipmentAtkSpd = player.baseStats.atkSpd * (player.equippedStats.atkSpd / 100);
      let playerHpBase = player.baseStats.hp;
      let playerAtkBase = player.baseStats.atk;
      let playerDefBase = player.baseStats.def;
      let playerAtkSpdBase = player.baseStats.atkSpd;
      let playerVampBase = player.baseStats.vamp;
      let playerCRateBase = player.baseStats.critRate;
      let playerCDmgBase = player.baseStats.critDmg;

      player.stats.hpMax = Math.round((playerHpBase + playerHpBase * (player.bonusStats.hp / 100)) + player.equippedStats.hp);
      player.stats.atk = Math.round((playerAtkBase + playerAtkBase * (player.bonusStats.atk / 100)) + player.equippedStats.atk);
      player.stats.def = Math.round((playerDefBase + playerDefBase * (player.bonusStats.def / 100)) + player.equippedStats.def);
      player.stats.atkSpd = (playerAtkSpdBase + playerAtkSpdBase * (player.bonusStats.atkSpd / 100)) + equipmentAtkSpd + (equipmentAtkSpd * (player.equippedStats.atkSpd / 100));
      player.stats.vamp = playerVampBase + player.bonusStats.vamp + player.equippedStats.vamp;
      player.stats.critRate = playerCRateBase + player.bonusStats.critRate + player.equippedStats.critRate;
      player.stats.critDmg = playerCDmgBase + player.bonusStats.critDmg + player.equippedStats.critDmg;

      if (player.stats.atkSpd > 2.5) {
        player.stats.atkSpd = 2.5;
      }
    };

    calculateStats(newPlayer);
    newPlayer.stats.hp = newPlayer.stats.hpMax;
    
    setPlayer(newPlayer);
    saveData();
    
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setCurrentScreen('title');
    }, 1000);
  };

  return (
    <section id="character-creation" className="game-container">
      <form id="name-submit" onSubmit={handleSubmit}>
        <h1>What is your name?</h1>
        <input 
          type="text" 
          id="name-input" 
          autoComplete="off"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <p id="alert">{alert}</p>
        <button type="submit">Confirm</button>
      </form>
    </section>
  );
}

export default CharacterCreation;
