import React, { useState, useEffect, useContext } from 'react';
import {
    Text, View, StyleSheet, TouchableOpacity, FlatList
} from 'react-native';
import TYPOGRAPHY from '../utils/typography'
import { COLORS } from '../utils/colors'
import HomeBasicHeader from '../components/CustomHeader';
import HistoryFavItem from '../components/HistoryFavItem';
import { getAllWordsHistory, favouriteWord, getFavouriteWords } from '../api/word';
import { AuthContext } from '../context/Auth'
import NoWordView from '../components/NoWordView';
import { customFailMessage } from '../utils/show_messages';

const HistoryFav = ({ navigation }) => {
    const [historyFavPicker, setHistoryFavPicker] = useState(1)
    const [historyData, setHistoryData] = useState([])
    const [favData, setFavData] = useState([])
    const { token } = useContext(AuthContext)

    const getAllWords = async () => {
        let response = await getAllWordsHistory(token);
        if (response.error) {
            customFailMessage("Something went wrong!")
        } else {
            setHistoryData(response.data)
        }
    };

    const getAllFavourites = async () => {
        let response = await getFavouriteWords(token);
        if (response.error) {
            customFailMessage("Something went wrong!")
        } else {
            setFavData(response.data);
        }
    };

    const postToFavourite = async (id) => {
        let response = await favouriteWord(token, id);
        if (response.error) {
            customFailMessage("Something went wrong!")
        } else {
            //customSuccessMessage(response.data.fav == true ? "Added to favourites" : "Removed from favorites")
            console.log(response.data.fav)
        }
    };

    useEffect(() => {
        getAllWords()
        getAllFavourites()
    }, []);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getAllWords()
            getAllFavourites()
        });
        return unsubscribe;
    }, [navigation]);

    const renderItem = ({ item }) => (
        <HistoryFavItem item={item} fav={() => { postToFavourite(item._id); }} />
    );

    return (
        <View style={styles.container}>
            <HomeBasicHeader
                navigation={navigation}
                title="History/Fav"
                isNavBack={false}
            />
            <View style={[styles.historyFavGroup, { backgroundColor: COLORS.inputBg }]}>
                <TouchableOpacity activeOpacity={.5} style={{ width: '50%' }} onPress={() => { setHistoryFavPicker(1); getAllWords() }}>
                    <View style={{ padding: 16, backgroundColor: historyFavPicker == 1 ? COLORS.pickedFavHisColor : 'transparent', borderRadius: historyFavPicker == 1 ? 16 : 0, }}>
                        <Text style={[historyFavPicker == 1 ? TYPOGRAPHY.H5Regular : TYPOGRAPHY.H5Bold, { color: historyFavPicker == 1 ? COLORS.white : COLORS.inputHintText, alignSelf: 'center' }]}>History</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={.5} style={{ width: '50%', }} onPress={() => { setHistoryFavPicker(2); getAllFavourites() }}>
                    <View style={{ padding: 16, backgroundColor: historyFavPicker == 2 ? COLORS.pickedFavHisColor : 'transparent', borderRadius: historyFavPicker == 2 ? 16 : 0, }}>
                        <Text style={[historyFavPicker == 2 ? TYPOGRAPHY.H5Regular : TYPOGRAPHY.H5Bold, { color: historyFavPicker == 2 ? COLORS.white : COLORS.inputHintText, alignSelf: 'center' }]}>Favorite</Text>
                    </View>
                </TouchableOpacity>
            </View>
            {historyFavPicker == 1 ?

                historyData.length == 0 ?
                    <NoWordView subject={"history"} />
                    :
                    <FlatList
                        data={historyData}
                        renderItem={renderItem}
                        keyExtractor={item => item._id}
                    />
                :
                favData.length == 0 ?
                    <NoWordView subject={"favourite"} />
                    :
                    <FlatList
                        data={favData}
                        renderItem={renderItem}
                        keyExtractor={item => item._id}
                    />}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.black,
    },
    historyFavGroup: {
        flexDirection: 'row',
        marginTop: 16,
        marginBottom: 24,
        borderRadius: 20,
        borderWidth: 1,
        padding: 4,
        width: '100%',
        justifyContent: 'center',

    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
    emptyView: {
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: 36,

    }
})

export default HistoryFav