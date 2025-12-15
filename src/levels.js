// 0 = empty, 1 = player, 2 = goal, 3 = wall
import levelsJson from './levels.json'

export const TILE = {
  EMPTY: 0,
  PLAYER: 1,
  GOAL: 2,
  WALL: 3,
}

export const levels = levelsJson.levels

export const validateBoards = () => {
  const errors = []
  levels.forEach((level) => {
    level.boards.forEach((board, bIdx) => {
      if (board.length !== 10) {
        errors.push(`Level ${level.id} board ${bIdx + 1}: must have 10 rows`)
      }
      let players = 0
      let goals = 0
      board.forEach((row, rIdx) => {
        if (row.length !== 10) {
          errors.push(`Level ${level.id} board ${bIdx + 1} row ${rIdx + 1}: must have 10 cols`)
        }
        row.forEach((cell) => {
          if (cell === TILE.PLAYER) players += 1
          if (cell === TILE.GOAL) goals += 1
        })
      })
      if (players !== 1) {
        errors.push(
          `Level ${level.id} board ${bIdx + 1}: must have exactly 1 player, got ${players}`,
        )
      }
      if (goals !== 1) {
        errors.push(`Level ${level.id} board ${bIdx + 1}: must have exactly 1 goal, got ${goals}`)
      }
    })
  })
  return errors
}
