import React from "react";
// import AsyncStorage from '@react-native-async-storage/async-storage';

// export async function setCardSelected(cards){
//     try {
//         const jsonValue = JSON.stringify(cards)
//         await AsyncStorage.setItem('@card_selecionados', jsonValue)
//       } catch (error) {
//         return error
//       }
// }

export async function getCardsSelected(chave){
    try {
        const jsonValue = await AsyncStorage.getItem(chave)
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      // error reading value
    }
  }