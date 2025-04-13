import BINGORULES from "config/bingo-rules";
import prisma from "database";

export async function generateNewGame(finished = false) {
  return await prisma.game.create({
    data: {
      finished,
    },
  });
}

export async function generateFullGame() {
  const game = await generateNewGame();

  const numbers = [];
  for (let i = 0; i < BINGORULES.max; i++) {
    numbers.push({
      value: i,
      gameId: game.id,
    });
  }

  await prisma.bingoNumber.createMany({
    data: numbers,
  });

  return game;
}
