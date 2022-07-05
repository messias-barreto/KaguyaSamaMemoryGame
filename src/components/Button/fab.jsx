import React from "react";
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function BtnFab(props){
    return(
        <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={props.onclick(true)}
            style={styles.touchableOpacityStyle}>
            <Image
              source={require('../../assets/img/menu.png')}
              style={styles.floatingButtonStyle}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      height: 30,
      alignItems: 'flex-end'
    },

    touchableOpacityStyle: {
      position: 'absolute',
      height: 10,
      alignItems: 'stretch',
      justifyContent: 'center',
      right: 30,
      bottom: 30,
    },

    floatingButtonStyle: {
      resizeMode: 'contain',
      width: 50,
      height: 50,
      borderRadius: 50 / 2
    },
})
