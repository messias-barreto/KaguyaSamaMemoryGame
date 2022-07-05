import { Audio } from 'expo-av';
import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, TouchableHighlight, Button } from 'react-native';

const audios = [
  require('../../assets/sounds/click.mp3'), 
  require('../../assets/sounds/acerto.mp3'),
  require('../../assets/sounds/error.mp3'),
  require('../../assets/sounds/venceu.mp3'),
  require('../../assets/sounds/perdeu.mp3'),
  require('../../assets/sounds/tabuleiro/DADDY_DADDY_DO.mp3'),
  require('../../assets/sounds/tabuleiro/Giri_Giri.mp3'),
  require('../../assets/sounds/tabuleiro/Love_Dramatic.mp3')
];

export async function playSoundFundo(faixa) {
  const audio = audios[faixa]  
  const { sound } = await Audio.Sound.createAsync(audio);
          
  return sound;
}

export async function playResultSoung(value) {  
  const audio = value === 'GANHOU' ? audios[3] : audios[4];
  const { sound } = await Audio.Sound.createAsync(audio);
  return sound;
}

export async function playButtonCardSoung(){
  
}

export async function stopSoundFundo() {
  const { sound } = await Audio.Sound.stopAndUnloadAsync();
  return sound;
}


// export default function Musics(props){
//     const [sound, setSound] = useState();

//     const audios = [
//         require('../../assets/sounds/click.mp3'), 
//         require('../../assets/sounds/acerto.mp3'),
//         require('../../assets/sounds/error.mp3'),
//         require('../../assets/sounds/tabuleiro/DADDY_DADDY_DO.mp3'),
//         require('../../assets/sounds/tabuleiro/Giri_Giri.mp3'),
//         require('../../assets/sounds/tabuleiro/Love_Dramatic.mp3')
//     ];

//     async function playSound() {
//         const audio = audios[3]  
//         const { sound } = await Audio.Sound.createAsync(audio);
//         setSound(sound);
        
//         await sound.setVolumeAsync(0.3)
//         await sound.setIsLoopingAsync(true)
//         await sound.playAsync(); 
//     }

//       useEffect(() => {
//     return sound
//       ? () => {
//         sound.unloadAsync(); }
//       : undefined;
//   }, [sound]);

//   useEffect(() => {
//     playSound()
// }, [])

//     return (
//         <View style={styles.container}>
//           <>
//             <Button title="" onPress={playSound} />
//           </>
//         </View>
//       );
// }


// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
      
//     image: { 
//         width: 80, 
//         height: 120,
//         borderBottomLeftRadius: 30,
//         borderBottomRightRadius: 15,
//         borderTopRightRadius: 30,
//         borderTopLeftRadius: 15,
//         overflow: 'hidden'
//     }
//   });