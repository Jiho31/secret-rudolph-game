// {
//   name: "owner", // owner name
//   likes: selectedLikes,
//   dislikes: selectedDislikes,
//   result: [], // { player: 'anonymous', score: 5 }

import { ItemKey } from "@/game/items";

// };
type GameInformation = {
  name: string;
  likes: ItemKey[];
  dislikes: ItemKey[];
  result: Array<{ player: string; score: number }>;
};

export { type GameInformation };
