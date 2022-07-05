import React, { useEffect, useState } from 'react'
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Card from '../../components/Card';
import Vidas from '../../components/vidas';
import ReactNativeModal from 'react-native-modal';
import BtnTouchableOpacity from '../../components/Button';
import Fab from '../../components/Button/fab';
import Hr from "react-native-hr-component";
import { playResultSoung, playSoundFundo } from '../../components/Musics';

//TABULEIRO VAZIO
const TABULEIRO = [
    { id: 1, index: 0, status: false, card: (status) => <Card /> },
    { id: 2, index: 0, status: false, card: (status) => <Card /> },
    { id: 3, index: 0, status: false, card: (status) => <Card /> },
    { id: 4, index: 0, status: false, card: (status) => <Card /> },
    { id: 5, index: 0, status: false, card: (status) => <Card /> },
    { id: 6, index: 0, status: false, card: (status) => <Card /> },
    { id: 7, index: 0, status: false, card: (status) => <Card /> },
    { id: 8, index: 0, status: false, card: (status) => <Card /> },
    { id: 9, index: 0, status: false, card: (status) => <Card /> },
    { id: 10, index: 0, status: false, card: (status) => <Card /> },
    { id: 11, index: 0, status: false, card: (status) => <Card /> },
    { id: 12, index: 0, status: false, card: (status) => <Card /> },
    { id: 13, index: 0, status: false, card: (status) => <Card /> },
    { id: 14, index: 0, status: false, card: (status) => <Card /> },
    { id: 15, index: 0, status: false, card: (status) => <Card /> },
    { id: 16, index: 0, status: false, card: (status) => <Card /> },
];

export default function TelaTabuleiro({ navigation }) {
    const [coracao, setCoracao] = useState(6);
    const [pontos, setPontos] = useState(0);
    const [tabuleiro, setTabuleiro] = useState(TABULEIRO);
    const [qtdCartasViradas, setQtdCartasViradas] = useState(1);
    const [game, setGame] = useState(true);
    const [modal, setModal] = useState(false);
    const [modalMenu, setModalMenu] = useState(false);
    const [contador, setContador] = useState(10)
    const [result, setResult] = useState('EM JOGO')
    let idCartas = 1;

    /* BOTÕES do card */
    const [botao1, setBotao1] = useState(false);
    const [botao2, setBotao2] = useState(false);
    const [botao3, setBotao3] = useState(false);
    const [botao4, setBotao4] = useState(false);

    const [botao5, setBotao5] = useState(false);
    const [botao6, setBotao6] = useState(false);
    const [botao7, setBotao7] = useState(false);
    const [botao8, setBotao8] = useState(false);

    const [botao9, setBotao9] = useState(false);
    const [botao10, setBotao10] = useState(false);
    const [botao11, setBotao11] = useState(false);
    const [botao12, setBotao12] = useState(false);

    const [botao13, setBotao13] = useState(false);
    const [botao14, setBotao14] = useState(false);
    const [botao15, setBotao15] = useState(false);
    const [botao16, setBotao16] = useState(false);

    const [soundFundo, setSoundFundo] = useState();
    const [faixa, setFaixa] = useState(5);

    async function play(valueFaixa) {
        playSoundFundo(valueFaixa).then((response) => {
            setSoundFundo(response)
            response.setVolumeAsync(0.3)
            response.setIsLoopingAsync(true)
            response.playAsync();
        });
    }

    async function playSound(value) {
        playResultSoung(value).then((response) => {
            response.playAsync();
        });
    }

    async function stopSound() {
        playSoundFundo(faixa).then((response) => {
            soundFundo.pauseAsync();
            setSoundFundo(undefined)
        });
    }

    async function trocarSound(valueFaixa) {
        valueFaixa === 8 && (valueFaixa = 5);
        setFaixa(valueFaixa);
        play(valueFaixa);
    }

    const setCardsStorage = async (chave, cards) => {
        try {
            const jsonValue = JSON.stringify(cards)
            await AsyncStorage.setItem(chave, jsonValue)
        } catch (e) { }
    }

    const getCardsStorage = async (chave) => {
        try {
            const jsonValue = await AsyncStorage.getItem(chave)
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) { }
    }

    /** EMBARALHAR AS CARTAS */
    const shuffle = () => {
        const cards = [
            require('../../assets/img/cards/1.jpg'),
            require('../../assets/img/cards/2.jpg'),
            require('../../assets/img/cards/3.jpg'),
            require('../../assets/img/cards/4.jpg'),
            require('../../assets/img/cards/5.jpg'),
            require('../../assets/img/cards/6.jpg'),
            require('../../assets/img/cards/7.jpg'),
            require('../../assets/img/cards/8.jpg')
        ];

        let i = 1;
        let arrayPopulado = new Array();

        while (i <= 8) {
            let value = Math.floor(Math.random() * 8 + 1)

            if (arrayPopulado.find(e => e.index === value) === undefined) {
                arrayPopulado.push({
                    id: idCartas,
                    index: value,
                    setstate: () => { },
                    card: (index, funcao, status) =>
                        <Card index={index} status={status} image={cards[value - 1]}
                            funcao={() => funcao()} />
                });

                i++;
                idCartas++;
            }
        }

        return arrayPopulado;
    }

    const travarTela = (status) => {
        setGame(status)
    }

    const addCarta = (id, chave, state) => {
        let cartaSelecionada = tabuleiro.find(c => c.id === id);
        cartaSelecionada.setstate = state;
        setCardsStorage(chave, cartaSelecionada);
    }

    const removeCoracao = () => {
        setCoracao(coracao - 1)
    }

    const addAcerto = () => {
        setPontos(pontos + 1)
    }

    const adicionarQtdCartasViradas = () => {
        setQtdCartasViradas(qtdCartasViradas + 1)
    }

    const decrementarTime = () => {
        setTimeout(() => {
            if (contador > 0) {
                setContador(contador - 1)
            }
        }, 1000)

        if (contador === 0) {
            travarTela(true)
            virarTodasCartas(false)
        }
    }

    const atualizarTabuleiro = async (status) => {
        let carta1 = await getCardsStorage('@primeira_carta_adicionada').then((response) => { return response })
        let carta2 = await getCardsStorage('@segunda_carta_adicionada').then((response) => { return response })

        tabuleiro.map(carta => {
            if (carta.id === carta1.id || carta.id === carta2.id) {
                carta.status = status
                setTimeout(() => { carta.setstate(status) }, 1000);
            }
        })
    }

    const virarTodasCartas = (status) => {
        setBotao1(status); setBotao2(status); setBotao3(status);
        setBotao4(status); setBotao5(status); setBotao6(status);
        setBotao7(status); setBotao8(status); setBotao9(status);
        setBotao10(status); setBotao11(status); setBotao12(status);
        setBotao13(status); setBotao14(status); setBotao15(status);
        setBotao16(status);
    }

    const compararCartas = (card1, card2) => {
        const valida = card1 === card2 ? true : false

        switch (valida) {
            case true:
                addAcerto()
                atualizarTabuleiro(true)
                break;

            case false:
                removeCoracao()
                atualizarTabuleiro(false);
                break
        }

        return valida
    }

    const finalDePartida = () => {
        if (coracao === 0) {
            setCoracao(6) // Não cair na Condição
            setPontos(0)

            setResult('Você Perdeu!!')
            travarTela(false)
            virarTodasCartas(true)
            setModal(true)
            playSound('PERDEU')

            return ['PERDEU', false];
        }

        if (pontos === 8) {
            setCoracao(6) // Não cair na Condição
            setPontos(0)
            virarTodasCartas(true)
            setResult('Você Venceu!!');
            setModal(true)
            playSound('GANHOU');
            return ['GANHOU', true];
        }

        return ['EM JOGO', false];
    }

    useEffect(() => {
        finalDePartida()
    }, [game])

    useEffect(() => {
        return soundFundo !== undefined ? () => { soundFundo.unloadAsync(); } : undefined;
    }, [soundFundo]);

    async function realizarJogada(value, setstate) {
        if (game === true) {
            travarTela(false)
            setstate(true)
            adicionarQtdCartasViradas()
            let chave = qtdCartasViradas === 1 ? '@primeira_carta_adicionada' : '@segunda_carta_adicionada';
            addCarta(value, chave, setstate)

            if (qtdCartasViradas === 2) {
                let primeira_carta_adicionada = await getCardsStorage('@primeira_carta_adicionada').then((response) => { return response });
                let segunda_carta_adicionada = await getCardsStorage('@segunda_carta_adicionada').then((response) => { return response });
                setQtdCartasViradas(1)

                let validaCartasViraras = compararCartas(primeira_carta_adicionada.index, segunda_carta_adicionada.index);
                let validaFinalPartida = finalDePartida()

                if (validaFinalPartida[0] === 'EM JOGO') {
                    setTimeout(() => { setstate(validaCartasViraras) }, 1000);
                    setTimeout(() => { travarTela(true) }, 1000);
                }

                if (validaFinalPartida[0] === 'GANHOU' || validaFinalPartida[0] === 'PERDEU') {
                    setTimeout(() => { setstate(true) }, 1000);
                    setTimeout(() => { travarTela(true) }, 1000);
                }

                return [2, validaCartasViraras]
            }

            travarTela(true)
            return [1, ''];
        }
    }

    const reiniciarPartida = async () => {
        setContador(10)
        setQtdCartasViradas(1)
        idCartas = 1;

        setTabuleiro([...shuffle(), ...shuffle()]) //array Populado pelas Cartas
        virarTodasCartas(true)
        setModal(false)
        setModalMenu(false)
        setCoracao(6)
        setPontos(0)
    }

    useEffect(() => {
        setTabuleiro([...shuffle(), ...shuffle()]) //array Populado
        virarTodasCartas(true)
        setModalMenu(false)
        decrementarTime()
        play(5)
    }, [])

    useEffect(() => {
        decrementarTime()
    }, [contador])

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../../assets/img/Tabuleiro.jpg')} resizeMode="cover" style={styles.imgBackground}>
                <View style={styles.start}>
                    {
                        contador !== 0 ?
                            <Text style={styles.subtitle}>{contador}</Text> :
                            <>
                                <Vidas coracao={coracao >= 1 ? true : false} />
                                <Vidas coracao={coracao >= 2 ? true : false} />
                                <Vidas coracao={coracao >= 3 ? true : false} />
                                <Vidas coracao={coracao >= 4 ? true : false} />
                                <Vidas coracao={coracao >= 5 ? true : false} />
                                <Vidas coracao={coracao >= 6 ? true : false} />
                            </>
                    }
                </View>

                <View style={styles.tabuleiro}>
                    {tabuleiro[0].card(tabuleiro[0].index, () => realizarJogada(tabuleiro[0].id, setBotao1), botao1)}
                    {tabuleiro[1].card(tabuleiro[1].index, () => realizarJogada(tabuleiro[1].id, setBotao2), botao2)}
                    {tabuleiro[2].card(tabuleiro[2].index, () => realizarJogada(tabuleiro[2].id, setBotao3), botao3)}
                    {tabuleiro[3].card(tabuleiro[3].index, () => realizarJogada(tabuleiro[3].id, setBotao4), botao4)}
                </View>

                <View style={styles.tabuleiro}>
                    {tabuleiro[4].card(tabuleiro[4].index, () => realizarJogada(tabuleiro[4].id, setBotao5), botao5)}
                    {tabuleiro[5].card(tabuleiro[5].index, () => realizarJogada(tabuleiro[5].id, setBotao6), botao6)}
                    {tabuleiro[6].card(tabuleiro[6].index, () => realizarJogada(tabuleiro[6].id, setBotao7), botao7)}
                    {tabuleiro[7].card(tabuleiro[7].index, () => realizarJogada(tabuleiro[7].id, setBotao8), botao8)}
                </View>

                <View style={styles.tabuleiro}>
                    {tabuleiro[8].card(tabuleiro[8].index, () => realizarJogada(tabuleiro[8].id, setBotao9), botao9)}
                    {tabuleiro[9].card(tabuleiro[9].index, () => realizarJogada(tabuleiro[9].id, setBotao10), botao10)}
                    {tabuleiro[10].card(tabuleiro[10].index, () => realizarJogada(tabuleiro[10].id, setBotao11), botao11)}
                    {tabuleiro[11].card(tabuleiro[11].index, () => realizarJogada(tabuleiro[11].id, setBotao12), botao12)}
                </View>

                <View style={styles.tabuleiro}>
                    {tabuleiro[12].card(tabuleiro[12].index, () => realizarJogada(tabuleiro[12].id, setBotao13), botao13)}
                    {tabuleiro[13].card(tabuleiro[13].index, () => realizarJogada(tabuleiro[13].id, setBotao14), botao14)}
                    {tabuleiro[14].card(tabuleiro[14].index, () => realizarJogada(tabuleiro[14].id, setBotao15), botao15)}
                    {tabuleiro[15].card(tabuleiro[15].index, () => realizarJogada(tabuleiro[15].id, setBotao16), botao16)}
                </View>

                <Fab onclick={() => setModalMenu} />

                <ReactNativeModal isVisible={modalMenu} animationInTiming={1000}>
                    <View style={styles.modalMenu}>
                        <Hr lineColor="#eee" width={1} text="Aúdio" textStyles={styles.title} />
                        <View style={styles.modalMenuItens}>
                            <TouchableOpacity style={styles.modalMenuItensBtn} onPress={soundFundo ? stopSound : () => play(faixa)}><Ionicons name={soundFundo ? 'stop' : 'play'} size={20} /></TouchableOpacity>
                            <TouchableOpacity style={styles.modalMenuItensBtn} onPress={() => trocarSound(faixa + 1)} ><Ionicons name='play-forward' size={20} /></TouchableOpacity>
                        </View>

                        <Hr lineColor="#eee" width={1} text="Opções" textStyles={styles.title} />

                        <View style={styles.modalMenuItens}>
                            <TouchableOpacity style={styles.modalMenuItensBtn} onPress={() => navigation.navigate('Inicial')}><Ionicons name='home' size={20} /></TouchableOpacity>
                            <TouchableOpacity style={styles.modalMenuItensBtn} onPress={() => reiniciarPartida(false)}><Ionicons name='refresh' size={20} /></TouchableOpacity>
                            <TouchableOpacity style={styles.modalMenuItensBtn} onPress={() => setModalMenu(false)}><Ionicons name='backspace' size={20} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </ReactNativeModal>

                <ReactNativeModal isVisible={modal} animationInTiming={1000}>
                    <View style={styles.result}>
                        <Text style={styles.title}>{result}</Text>
                        <Image source={result === 'Você Venceu!!' ?
                            require('../../assets/img/venceu.jpg') :
                            require('../../assets/img/perdeu.jpg')} style={styles.imageModal} />
                        <BtnTouchableOpacity navigate={() => reiniciarPartida()} title='Jogar Novamente' />
                    </View>
                </ReactNativeModal>

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

    modalMenu: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderBottomColor: 'black'
    },

    modalMenuItens: {
        marginBottom: 10,
        height: 120,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomColor: 'black'
    },

    modalMenuItensBtn: {
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        width: 80,
        height: 80,
        backgroundColor: '#fff',
        borderRadius: 50
    },

    imgBackground: {
        flex: 1,
        marginTop: 10,
        justifyContent: 'center'
    },

    start: {
        height: 70,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginTop: 15
    },

    tabuleiro: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-around'
    },

    subtitle: {
        fontSize: 25,
        color: '#F8F8FF',
        fontFamily: 'Pacifico_400Regular',
        textAlign: 'center'
    },

    imageModal: {
        width: 140,
        height: 180,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 15,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 15,
        overflow: 'hidden',
        marginBottom: 30
    },

    result: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },

    title: {
        fontSize: 30,
        color: '#F8F8FF',
        fontFamily: 'Pacifico_400Regular'
    }
});