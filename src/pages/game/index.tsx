// import { useEffect } from "react";
// import { useRouter } from "next/router";
import dynamic from "next/dynamic";

const AppWithoutSSR = dynamic(() => import("@/App"), { ssr: false });

export default function GameApp() {
  //  References to the PhaserGame component (game and scene are exposed)

  return <AppWithoutSSR />;
}

// export default function GameApp() {
//   //  References to the PhaserGame component (game and scene are exposed)

//   const router = useRouter();

//   useEffect(() => {
//     // redirect to main page
//     router.push("/main");
//     // console.log(router, "### router");
//     // console.log(router.query.gameId, "### gameId");
//   }, [router]);

//   return <div> Redirecting .. </div>;
// }
