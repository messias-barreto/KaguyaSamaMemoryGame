import React from "react";
import Routes from "./src/routes";

export default function App() {
//   const [sound, setSound] = useState();
  
//   async function playSound() {
//     console.log('Loading Sound');
//     const { sound } = await Audio.Sound.createAsync(
//       require('./src/sounds/fundo.mp3')
//     );
//     setSound(sound);
//     await sound.setVolumeAsync(0.4)
//     await sound.setIsLoopingAsync(true)
//     await sound.playAsync(); }

//   useEffect(() => {
//     return sound
//       ? () => {
//           sound.unloadAsync(); }
//       : undefined;
//   }, [sound]);

//   useEffect(() => {
//     playSound()
// }, [])
  return (
   <Routes />
  );
}

