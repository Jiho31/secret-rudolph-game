import { useEffect, useRef, useState } from "react";
import { IRefPhaserGame, PhaserGame } from "./PhaserGame";
import { useRouter } from "next/router";

function App() {
  // The sprite can only be moved in the MainMenu Scene
  const [canMoveSprite, setCanMoveSprite] = useState(true);
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

  // Event emitted from the PhaserGame component
  const currentScene = (scene: Phaser.Scene) => {
    setCanMoveSprite(scene.scene.key !== "MainMenu");
  };

  return (
    <div id="app">
      <PhaserGame
        ref={phaserRef}
        currentActiveScene={currentScene}
        gameId={gameId}
      />
    </div>
  );
}

export default App;
