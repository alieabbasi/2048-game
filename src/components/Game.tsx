import { FC, useEffect, useState } from "react";
import { Moves, The2048Game } from "../logic/game-logic";

interface GameProps {}

const Game: FC<GameProps> = () => {
  const [gameClass, setGameClass] = useState<The2048Game>();
  const [matrix, setMatrix] = useState<number[][]>();

  useEffect(() => {
    if (!gameClass) {
      setGameClass(new The2048Game(4, 4));
    }
    setMatrix(gameClass?.matrix);
  }, [gameClass]);

  const moveHandler = (dir: Moves) => {
    switch (dir) {
      case Moves.TOP:
        gameClass?.moveUp();
        break;
      case Moves.BOTTOM:
        gameClass?.moveDown();
        break;
      case Moves.RIGHT:
        gameClass?.moveRight();
        break;
      case Moves.LEFT:
        gameClass?.moveLeft();
        break;
      default:
        break;
    }

    setMatrix(gameClass?.matrix);
  };
  

  return (
    <div>
      <div>
        {matrix?.map((col) => (
          <div key={Math.random() * Math.random()} style={{width: "120px", display: "flex", justifyContent: "space-between"}}>
            {col.map((num) => (
              <span key={Math.random() * Math.random()}>{num}</span>
            ))}
            <br />
          </div>
        ))}
      </div>
      <div>
        <button onClick={() => moveHandler(Moves.TOP)}>UP</button>
        <button onClick={() => moveHandler(Moves.BOTTOM)}>DOWN</button>
        <button onClick={() => moveHandler(Moves.LEFT)}>LEFT</button>
        <button onClick={() => moveHandler(Moves.RIGHT)}>RIGHT</button>
      </div>
    </div>
  );
};

export default Game;
