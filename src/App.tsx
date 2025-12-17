import { useEffect, useRef, useState } from "react";
import { IRefPhaserGame, PhaserGame } from "./PhaserGame";
import { useRouter } from "next/router";
import { RudolphGame } from "./game/scenes/RudolphGame";
import { MainMenu } from "./game/scenes/MainMenu";

function App() {
  // The sprite can only be moved in the MainMenu Scene
  const [canMoveSprite, setCanMoveSprite] = useState(true);
  const [spritePosition, setSpritePosition] = useState({ x: 0, y: 0 });

  const router = useRouter();
  const [gameId, setGameId] = useState("");

  //  References to the PhaserGame component (game and scene are exposed)
  const phaserRef = useRef<IRefPhaserGame | null>(null);

  useEffect(() => {
    console.log(router.query.gameId);
    if (router.query.gameId && typeof router.query.gameId == "string") {
      setGameId(router.query.gameId);
    }
  }, [router]);

  const callGameover = () => {
    if (phaserRef.current) {
      const scene = phaserRef.current.scene as RudolphGame;
      if (scene && scene.scene.key === "RudolphGame") {
        scene.handleGameOver();
      }
    }
  };

  // const moveSprite = () => {
  //   if (phaserRef.current) {
  //     const scene = phaserRef.current.scene as MainMenu;

  //     if (scene && scene.scene.key === "MainMenu") {
  //       // Get the update logo position
  //       scene.moveLogo(({ x, y }) => {
  //         setSpritePosition({ x, y });
  //       });

  //       scene.spawnItem("cash");
  //     }
  //   }
  // };

  const spawnBeer = () => {
    if (phaserRef.current) {
      const scene = phaserRef.current.scene as RudolphGame;
      if (scene && scene.scene.key === "RudolphGame") {
        scene.spawnLikedItems(Math.floor(Math.random() * 300), ["beer"]);
      }
    }
  };

  const start = () => {
    if (phaserRef.current) {
      const scene = phaserRef.current.scene as RudolphGame;

      const likes = ["beer", "ring"];
      if (scene && scene.scene.key === "RudolphGame") {
        scene.startGame(likes);
      }
    }
  };

  // Event emitted from the PhaserGame component
  const currentScene = (scene: Phaser.Scene) => {
    setCanMoveSprite(scene.scene.key !== "MainMenu");
  };

  return (
    <div id="app">
      {/* <button onClick={moveSprite}>spawn item</button> */}
      <div>
        <div>
          <button className="button" onClick={callGameover}>
            Trigger Game over
          </button>
        </div>
        {/* <div>
          <button
            disabled={canMoveSprite}
            className="button"
            onClick={moveSprite}
          >
            Toggle Movement
          </button>
        </div> */}
        <div className="spritePosition">
          Sprite Position:
          <pre>{`{\n  x: ${spritePosition.x}\n  y: ${spritePosition.y}\n}`}</pre>
        </div>
        <div>
          <button className="button" onClick={start}>
            Start
          </button>
          {/* <button className="button" onClick={spawnBeer}>
            Spawn beer
          </button> */}
        </div>
      </div>
      <PhaserGame
        ref={phaserRef}
        currentActiveScene={currentScene}
        gameId={gameId}
      />
    </div>
  );
}

export default App;
