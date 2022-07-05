import { Audio } from 'expo-av';
import React, { useState } from 'react';
import { View, Image, StyleSheet, TouchableHighlight } from 'react-native';

export default function Card(props){
    const cardOculto = require('../../assets/img/cards/card.jpg');
    const audios = [
        require('../../assets/sounds/click.mp3'), 
        require('../../assets/sounds/acerto.mp3'),
        require('../../assets/sounds/error.mp3')
    ];

    const [sound, setSound] = useState();
  
    async function playSound(value) {
        const audio = value[0] === 2 && value[1] === true ? audios[1] :
        value[0] === 2 && value[1] === false ? audios[2] : audios[0]
      
        const { sound } = await Audio.Sound.createAsync(audio);
        setSound(sound);
        await sound.playAsync(); 
        setTimeout(() => { 
            sound.unloadAsync();
        }, 1000) 
    }
   
    const atualizaList = () => {     
        if(props.status !== true){
            props.funcao().then((response) => {
                playSound(response) 
            })
        }
    }

    return(
            <View>
                <TouchableHighlight onPress={() => atualizaList()}>
                    <Image  source={ props.status === true ? props.image : cardOculto } 
                            style={styles.image} />
                </TouchableHighlight>
            </View>
    )
}


const styles = StyleSheet.create({
      image: { 
        width: 80, 
        height: 120,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 15,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 15,
        overflow: 'hidden'
    }
  });