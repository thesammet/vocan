import React, { useState, useRef, useEffect, useContext } from 'react';
import {
    Text, View, StyleSheet, TouchableOpacity, Keyboard, Dimensions, FlatList
} from 'react-native';
import TYPOGRAPHY from '../utils/typography'
import { COLORS } from '../utils/colors'
import HomeBasicHeader from '../components/CustomHeader';
import { CustomTextInputMultiline } from '../components/CustomInputText'
import { Swap, ChevronDown } from '../components/icons';
import { InputArea } from '../components/CustomInputArea';
import TranslateButton from '../components/TranslateButton'
import BottomSheet from 'react-native-gesture-bottom-sheet';
import { languages } from '../assets/sources/languages'
import { LanguageContext } from '../context/Language';

const Home = ({ navigation }) => {
    //async
    const { mainLanguage, addMainLanguage, translatedLanguage, addTranslatedLanguage } = useContext(LanguageContext)

    console.log(mainLanguage + " / " + translatedLanguage)
    //
    const [text, setText] = useState("");
    const bottomSheet = useRef();
    const windowHeight = Dimensions.get('window').height;
    const [languageSelector, setLanguageSelector] = useState(null)
    const selectedLanguage = languageSelector === 1 ? mainLanguage.code : translatedLanguage.code

    const renderItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => languageSelector == 1 ? addMainLanguage({ name: item.name, code: item.code }) : addTranslatedLanguage({ name: item.name, code: item.code })}>
            <View style={styles.renderItem}>
                <Text style={[TYPOGRAPHY.H4Regular, { color: COLORS.white, margin: 10, flex: 1 }]}>{item.name}</Text>
                <View
                    style={[styles.roundButton, { backgroundColor: item.code == selectedLanguage ? COLORS.mainBlue : 'transparent' }]}>
                </View>
            </View>
        </TouchableOpacity>

    );
    return (
        <TouchableOpacity activeOpacity={1} onPress={Keyboard.dismiss} style={styles.keyboarDismissContainer}>
            <View style={styles.container}>
                <BottomSheet hasDraggableIcon={false} ref={bottomSheet} height={windowHeight - windowHeight / 4.5} radius={32} sheetBackgroundColor={'#101010'} backgroundColor={'transparent'} draggable={false} >
                    <FlatList
                        data={languages}
                        renderItem={renderItem}
                        keyExtractor={item => item.code}
                    />
                </BottomSheet>
                <HomeBasicHeader
                    navigation={navigation}
                    title="Translate Area"
                    isNavBack={false}
                />
                <View style={styles.searchView}>
                    <View style={styles.translatedLanguageGroup}>
                        <TouchableOpacity activeOpacity={0.5} onPress={() => { setLanguageSelector(1); bottomSheet.current.show(); }}>
                            <View style={styles.languageSelectView}>
                                <Text style={[TYPOGRAPHY.H5Regular, { color: COLORS.inputHintText, textAlign: 'center', margin: 10 }]}>{mainLanguage.name}</Text>
                                <ChevronDown width={24} height={24} fill={COLORS.switchInactiveCircleColor} style={{ marginRight: 8 }} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.5} onPress={() => { console.log("Swap language") }}>
                            <Swap width={24} height={24} />
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.5} onPress={() => { setLanguageSelector(2); bottomSheet.current.show(); }}>
                            <View style={styles.languageSelectView}>
                                <Text style={[TYPOGRAPHY.H5Regular, { color: COLORS.inputHintText, textAlign: 'center', margin: 10 }]}>{translatedLanguage.name}</Text>
                                <ChevronDown width={24} height={24} fill={COLORS.switchInactiveCircleColor} style={{ marginRight: 8 }} />
                            </View>
                        </TouchableOpacity>
                    </View>

                    <InputArea
                        placeholder={'Enter text'}
                        value={text}
                        onChangeText={(value) => setText(value)}
                        edit={true}
                        clearText={() => setText('')}
                        text={text}
                    />
                    <View style={{ marginVertical: 16 }}>
                        <TranslateButton
                            verticalPadding={16}
                            title={"Translate"}
                            onPress={() => {
                                console.log("translate")
                            }}
                            disabled={!text} />
                    </View>
                    <InputArea
                        placeholder={'Translation'}
                        editable={false}
                        edit={false}
                        selectTextOnFocus={false}
                    />
                </View>
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.black,
    },
    keyboarDismissContainer: {
        flex: 1,
    },
    searchView: {
        marginHorizontal: 28
    },
    translatedLanguageGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16,
        marginBottom: 18,
        justifyContent: 'space-between',

    },
    disabledTranslateView: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 32,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'red'
    },
    languageSelectView: {
        backgroundColor: COLORS.inputBg,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 12,
        justifyContent: 'center',
    },
    renderItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 32
    },

    roundButton: {
        alignSelf: 'center',
        width: 24,
        height: 24,
        borderRadius: 100,
        borderColor: COLORS.switchInactiveCircleColor,
        borderWidth: 1
    }
})
export default Home