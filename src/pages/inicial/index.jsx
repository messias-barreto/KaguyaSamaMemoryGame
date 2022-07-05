import React, { useState } from 'react'
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { useFonts, Pacifico_400Regular } from '@expo-google-fonts/pacifico';
import Modal from "react-native-modal";
import BtnTouchableOpacity from '../../components/Button';

export default function TelaInicial({ navigation }) {
    const [modal] = useState(false);

    let [fontsLoaded] = useFonts({
        Pacifico_400Regular,
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={require("../../assets/img/Fundo3.png")} resizeMode="cover" style={styles.imgBackground}>
                <View style={styles.start}>
                    <Text style={styles.title}>Kaguya-Sama <Ionicons name="ios-heart-outline" size={24} color="red" /></Text>
                </View>

                {
                    modal === false && (
                        <View style={styles.footer} isVisible={true}>
                            <TouchableOpacity style={styles.roundBtnStart} onPress={() => navigation.navigate("Tabuleiro")}>
                                <Text style={styles.titleBtn}>Iniciar Partida</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }

                <Modal isVisible={modal}>
                    <View style={styles.opcoes}>
                        <Text style={styles.title}>Selecione o Nível</Text>
                        <BtnTouchableOpacity navigate={() => navigation.navigate("Tabuleiro")} title='Fácil' />
                        <BtnTouchableOpacity navigate={() => navigation.navigate("Tabuleiro")} title='Médio' />
                        <BtnTouchableOpacity navigate={() => navigation.navigate("Tabuleiro")} title='Difícil' />
                    </View>
                </Modal>
            </ImageBackground>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ddd',
        justifyContent: 'center',
        borderBottomColor: '#ddd'
    },

    opcoes: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },

    imgBackground: {
        flex: 1,
        marginTop: 10,
        justifyContent: 'center'
    },

    start: {
        flex: 1,
        alignItems: 'center'
    },

    title: {
        fontSize: 45,
        color: '#FFB6C1',
        fontFamily: 'Pacifico_400Regular'
    },

    footer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },

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
});