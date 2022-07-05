import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TelaInicial  from '../pages/inicial';
import TelaTabuleiro from '../pages/tabuleiro';

const {Screen, Navigator} = createNativeStackNavigator();

export default function StackRouter() {
  return (
    <Navigator>
      <Screen name="Inicial" component={TelaInicial} options={{headerShown: false}}/>
      <Screen name="Tabuleiro" component={TelaTabuleiro} options={{headerShown: false}} />
    </Navigator>
  );
}

