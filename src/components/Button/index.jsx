import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function Button(props){
    return(
        <TouchableOpacity 
            style={styles.roundBtnStart} 
            onPress={props.navigate}>
            <Text style={styles.titleBtn}>{props.title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    roundBtnStart: {
        width: 200,
        height: 80,
        color: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        borderRadius: 100,
        backgroundColor: '#FFB6C1',
        marginBottom: 10
    },

    titleBtn: {
        fontSize: 20,
        color: '#F8F8FF',
        fontFamily: 'Pacifico_400Regular'
    }
})
