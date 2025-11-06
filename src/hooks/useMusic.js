import { useEffect, useRef } from 'react';
import { Howl } from 'howler';
import { useGame } from '../context/GameContext';

export const useMusic = () => {
  const { volume } = useGame();
  const soundsRef = useRef({});

  useEffect(() => {
    // Initialize all sounds
    soundsRef.current = {
      // BGM
      bgmDungeon: new Howl({
        src: ['/assets/bgm/dungeon.webm', '/assets/bgm/dungeon.mp3'],
        volume: volume.bgm * volume.master,
        loop: true
      }),
      bgmBattleMain: new Howl({
        src: ['/assets/bgm/battle_main.webm', '/assets/bgm/battle_main.mp3'],
        volume: volume.bgm * volume.master,
        loop: true
      }),
      bgmBattleBoss: new Howl({
        src: ['/assets/bgm/battle_boss.webm', '/assets/bgm/battle_boss.mp3'],
        volume: volume.bgm * volume.master,
        loop: true
      }),
      bgmBattleGuardian: new Howl({
        src: ['/assets/bgm/battle_guardian.webm', '/assets/bgm/battle_guardian.mp3'],
        volume: volume.bgm * volume.master,
        loop: true
      }),
      // SFX
      sfxEncounter: new Howl({
        src: ['/assets/sfx/encounter.wav'],
        volume: volume.sfx * volume.master
      }),
      sfxCombatEnd: new Howl({
        src: ['/assets/sfx/combat_end.wav'],
        volume: volume.sfx * volume.master
      }),
      sfxAttack: new Howl({
        src: ['/assets/sfx/attack.wav'],
        volume: volume.sfx * volume.master
      }),
      sfxLvlUp: new Howl({
        src: ['/assets/sfx/level_up.wav'],
        volume: volume.sfx * volume.master
      }),
      sfxConfirm: new Howl({
        src: ['/assets/sfx/confirm.wav'],
        volume: volume.sfx * volume.master
      }),
      sfxDecline: new Howl({
        src: ['/assets/sfx/decline.wav'],
        volume: volume.sfx * volume.master
      }),
      sfxDeny: new Howl({
        src: ['/assets/sfx/denied.wav'],
        volume: volume.sfx * volume.master
      }),
      sfxEquip: new Howl({
        src: ['/assets/sfx/equip.wav'],
        volume: volume.sfx * volume.master
      }),
      sfxUnequip: new Howl({
        src: ['/assets/sfx/unequip.wav'],
        volume: volume.sfx * volume.master
      }),
      sfxOpen: new Howl({
        src: ['/assets/sfx/hover.wav'],
        volume: volume.sfx * volume.master
      }),
      sfxPause: new Howl({
        src: ['/assets/sfx/pause.wav'],
        volume: volume.sfx * volume.master
      }),
      sfxUnpause: new Howl({
        src: ['/assets/sfx/unpause.wav'],
        volume: volume.sfx * volume.master
      }),
      sfxSell: new Howl({
        src: ['/assets/sfx/sell.wav'],
        volume: volume.sfx * volume.master
      }),
      sfxItem: new Howl({
        src: ['/assets/sfx/item_use.wav'],
        volume: volume.sfx * volume.master
      }),
      sfxBuff: new Howl({
        src: ['/assets/sfx/buff.wav'],
        volume: volume.sfx * volume.master
      })
    };

    return () => {
      // Cleanup: stop and unload all sounds
      Object.values(soundsRef.current).forEach(sound => {
        if (sound) {
          sound.stop();
          sound.unload();
        }
      });
    };
  }, [volume]);

  return soundsRef.current;
};
