import React, { useState, useEffect } from 'react';
import {
    Text, View, StyleSheet, TouchableOpacity, FlatList
} from 'react-native';
import TYPOGRAPHY from '../utils/typography'
import { COLORS } from '../utils/colors'
import HomeBasicHeader from '../components/CustomHeader';
import HistoryItem from '../components/HistoryItem';
import FavItem from '../components/FavItem';
import { getAllWordsHistory, getWordById, favouriteWord, getFavouriteWords, deleteWord } from '../api/word';
import Loading from '../components/Loading'
import { Slash, Trash } from '../components/icons'

const HistoryFav = ({ navigation }) => {
    const [historyFavPicker, setHistoryFavPicker] = useState(1)
    const [historyData, setHistoryData] = useState([])
    const [favData, setFavData] = useState([])
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzAyMzdhM2UxMjY4MmI1ZTNiNzBjMWYiLCJpYXQiOjE2NjEwODk4NzR9.8Hy_U44EFZpaNaEyjdG0AQzVwnTICapax66vzJHz9Ss"
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingFav, setIsLoadingFav] = useState(false);

    const getAllWords = async () => {
        setIsLoading(true);
        let response = await getAllWordsHistory(token);
        if (response.error) {
            console.log("hata çıktı: " + JSON.stringify(error))
        } else {
            setHistoryData(response.data);
        }
        setIsLoading(false);
    };

    const getAllFavourites = async () => {
        setIsLoadingFav(true);
        let response = await getFavouriteWords(token);
        if (response.error) {
            console.log("hata çıktı: " + JSON.stringify(error))
        } else {
            console.log(response.data)
            setFavData(response.data);
        }
        setIsLoadingFav(false);
    };

    const postToFavourite = async (id) => {
        setIsLoadingFav(true);
        let response = await favouriteWord(token, id);
        if (response.error) {
            console.log("hata çıktı: " + JSON.stringify(error))
        } else {
            historyFavPicker == 1 ? getAllWords() : getAllFavourites()
        }
        setIsLoadingFav(false);
    };

    useEffect(() => {
        getAllWords()
        getAllFavourites()
    }, []);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getAllWords();
            getAllFavourites();
        });
        console.log("aa")
        return unsubscribe;
    }, [navigation]);

    const renderItem = ({ item }) => (
        historyFavPicker == 1 ? <HistoryItem item={item} fav={() => { postToFavourite(item._id) }} /> : <FavItem item={item} fav={() => { postToFavourite(item._id) }} />
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
                isLoading ?
                    <Loading />
                    :
                    historyData.length == 0 ?
                        <View style={styles.emptyView}>
                            <Slash width={100} height={100} color={COLORS.paleBlue}></Slash>
                            <Text style={[TYPOGRAPHY.H3Bold, { color: historyFavPicker == 2 ? COLORS.white : COLORS.inputHintText, alignSelf: 'center', marginTop: 8 }]}>You have no favourite word</Text>
                        </View>
                        :
                        <FlatList
                            data={historyData}
                            renderItem={renderItem}
                            keyExtractor={item => item._id}
                        /> : isLoadingFav ?
                    <Loading />
                    :
                    favData.length == 0 ?
                        <View style={styles.emptyView}>
                            <Slash width={100} height={100} color={COLORS.paleBlue}></Slash>
                            <Text style={[TYPOGRAPHY.H3Bold, { color: historyFavPicker == 2 ? COLORS.white : COLORS.inputHintText, alignSelf: 'center', marginTop: 8 }]}>You have no favourite word</Text>
                        </View>
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