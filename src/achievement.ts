export enum AchievementID {
  FIRST_GAME = 'FIRST_GAME',
  TEN_GAMES_WON = 'TEN_GAMES_WON',
  HAT_TRICK = 'HAT_TRICK',
}

export type Achievement = {
  id: AchievementID,
  name: string,
  description: string,
  current: number,
  target: number,
}

export default Achievement
