import React, { useState } from 'react';
import {
    Text, View, StyleSheet, TouchableOpacity, Keyboard
} from 'react-native';
import TYPOGRAPHY from '../utils/typography'
import { COLORS } from '../utils/colors'
import HomeBasicHeader from '../components/CustomHeader';
import { CustomTextInputMultiline } from '../components/CustomInputText'
import { Swap } from '../components/icons';
import { InputArea } from '../components/CustomInputArea';
import TranslateButton from '../components/TranslateButton'

const Home = ({ navigation }) => {
    const [searchText, onchangeSearchText] = useState(null)

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
                        <Text style={[TYPOGRAPHY.H5Regular, { color: COLORS.inputHintText }]}>Translated language: </Text>
                        <Text style={[TYPOGRAPHY.H4Regular, { color: COLORS.white, marginLeft: 8 }]}>Turkish</Text>
                        <TouchableOpacity activeOpacity={0.5} onPress={() => { console.log("change icon") }}>
                            <Swap width={24} height={24} style={{ marginLeft: 12 }} />
                        </TouchableOpacity>
                    </View>
                    {/* <CustomTextInputMultiline
                        placeholder={"Enter word"}
                        maxLength={40}
                        onChangeText={searchText => onchangeSearchText(searchText)}
                        value={searchText} /> */}
                    <InputArea

                        edit={true}
                    />
                    <View style={{ marginBottom: 24, marginTop: 8 }}>
                        <TranslateButton
                            verticalPadding={16}
                            title={"Translate"}
                            onPress={() => {
                                console.log("translate")
                            }}
                            disabled={!searchText} />
                    </View>
                    <InputArea
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
        marginLeft: 4
    },
    disabledTranslateView: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 32,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'red'
    }
})
export default Home