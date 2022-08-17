import React, { useState } from 'react';
import {
    Text, View, StyleSheet, TouchableOpacity, Keyboard
} from 'react-native';
import TYPOGRAPHY from '../utils/typography'
import { COLORS } from '../utils/colors'
import HomeBasicHeader from '../components/CustomHeader';
import { CustomTextInputMultiline } from '../components/CustomInputText'
import { Swap, ChevronDown } from '../components/icons';
import { InputArea } from '../components/CustomInputArea';
import TranslateButton from '../components/TranslateButton'

const Home = ({ navigation }) => {
    const [text, setText] = useState("");

    return (
        <TouchableOpacity activeOpacity={1} onPress={Keyboard.dismiss} style={styles.keyboarDismissContainer}>
            <View style={styles.container}>

                <HomeBasicHeader
                    navigation={navigation}
                    title="Translate Area"
                    isNavBack={false}
                />
                <View style={styles.searchView}>
                    <View style={styles.translatedLanguageGroup}>
                        <View style={styles.languageSelectView}>
                            <Text style={[TYPOGRAPHY.H5Regular, { color: COLORS.inputHintText, textAlign: 'center', margin: 10 }]}>Auto-detect</Text>
                            <ChevronDown width={24} height={24} fill={COLORS.switchInactiveCircleColor} style={{ marginRight: 8 }} />
                        </View>
                        <TouchableOpacity activeOpacity={0.5} onPress={() => { console.log("change icon") }}>
                            <Swap width={24} height={24} />
                        </TouchableOpacity>
                        <View style={styles.languageSelectView}>
                            <Text style={[TYPOGRAPHY.H5Regular, { color: COLORS.inputHintText, textAlign: 'center', margin: 10 }]}>Auto-detect</Text>
                            <ChevronDown width={24} height={24} fill={COLORS.switchInactiveCircleColor} style={{ marginRight: 8 }} />
                        </View>
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
        justifyContent: 'center'
    }
})
export default Home