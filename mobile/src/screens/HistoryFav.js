import React, { useState, useEffect, useContext } from 'react';
import {
    Text, View, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator
} from 'react-native';
import TYPOGRAPHY from '../utils/typography'
import { COLORS } from '../utils/colors'
import HomeBasicHeader from '../components/CustomHeader';
import HistoryFavItem from '../components/HistoryFavItem';
import { getAllWordsHistory, favouriteWord, getFavouriteWords } from '../api/word';
import { AuthContext } from '../context/Auth'
import NoWordView from '../components/NoWordView';
import { customFailMessage } from '../utils/show_messages';
import { strings } from '../utils/localization';
import { Search, SearchBold, Filter, FilterBold } from '../components/icons';
import FilterView from '../components/FilterView'

const HistoryFav = ({ navigation }) => {
    const [historyFavPicker, setHistoryFavPicker] = useState(1)
    const [historyData, setHistoryData] = useState([])
    const { token } = useContext(AuthContext)
    const [loadingHistory, setLoadingHistory] = useState(null)
    const [sortingOption, setSortingOption] = useState(0)
    const [filterAlphabetic, setFilterAlphabetic] = useState(false)
    const [filterDescending, setFilterDescending] = useState(false)

    const getAllWords = async (fav, filter) => {
        setLoadingHistory(true)
        let response = await getAllWordsHistory(token, `${fav == 2 ? "fav=true" : ""}&sortBy=createdAt:${filter ? "asc" : "desc"}`);
        if (response.error) {
            customFailMessage(strings.customFailMessage1)
        } else {
            setHistoryData(response.data)
        }
        setLoadingHistory(false)
    };

    const postToFavourite = async (id) => {
        let response = await favouriteWord(token, id);
        if (response.error) {
            customFailMessage(strings.customFailMessage1)
        } else {
            console.log(response.data.fav)
        }
    };

    let alphabeticSorting = () => {
        filterAlphabetic ? getAllWords() : setHistoryData([].concat(historyData).sort((a, b) => (a.main > b.main) ? 1 : -1))
        setFilterAlphabetic(!filterAlphabetic)
    }

    useEffect(() => {
        getAllWords(historyFavPicker, filterDescending)
        const unsubscribe = navigation.addListener('focus', () => {
            getAllWords(historyFavPicker, filterDescending)
        });
        return unsubscribe;
    }, [navigation]);

    const renderItem = ({ item }) => (
        <HistoryFavItem item={item} fav={() => { postToFavourite(item._id); }} />
    );

    return (
        <View style={styles.container}>
            <View style={styles.customHeaderContainer}>
                <Text style={styles.headerText}>{strings.historyFav}</Text>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity activeOpacity={.5} onPress={() => { setSortingOption(1) }}>
                        {sortingOption == 1 ? <FilterBold width="32" height="32" /> : <Filter width="32" height="32" />}
                    </TouchableOpacity>
                    <View style={{ width: 8 }} />
                    <TouchableOpacity activeOpacity={.5} onPress={() => { setSortingOption(2) }}>
                        {sortingOption == 2 ? <SearchBold width="32" height="32" /> : <Search width="32" height="32" />}
                    </TouchableOpacity>


                </View>
            </View>

            {sortingOption == 1 ?
                <FilterView alphabetic={filterAlphabetic}
                    descending={filterDescending}
                    setAlphabetic={() => {
                        alphabeticSorting()
                    }}
                    setDescending={() => {
                        setFilterDescending(!filterDescending);
                        getAllWords(historyFavPicker, !filterDescending);
                    }} /> :
                <Text style={[TYPOGRAPHY.H5Bold, { color: COLORS.white, alignSelf: 'center', marginTop: 21, marginBottom: 16 }]}>{"Search"}</Text>
            }

            <View style={[styles.historyFavGroup, { backgroundColor: COLORS.inputBg }]}>
                <TouchableOpacity activeOpacity={.5} style={{ width: '50%' }} onPress={() => { setHistoryFavPicker(1); getAllWords(1, filterDescending) }}>
                    <View style={{ padding: 16, backgroundColor: historyFavPicker == 1 ? COLORS.pickedFavHisColor : 'transparent', borderRadius: historyFavPicker == 1 ? 16 : 0, }}>
                        <Text style={[historyFavPicker == 1 ? TYPOGRAPHY.H5Regular : TYPOGRAPHY.H5Bold, { color: historyFavPicker == 1 ? COLORS.white : COLORS.inputHintText, alignSelf: 'center' }]}>{strings.history}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={.5} style={{ width: '50%', }} onPress={() => { setHistoryFavPicker(2); getAllWords(2, filterDescending) }}>
                    <View style={{ padding: 16, backgroundColor: historyFavPicker == 2 ? COLORS.pickedFavHisColor : 'transparent', borderRadius: historyFavPicker == 2 ? 16 : 0, }}>
                        <Text style={[historyFavPicker == 2 ? TYPOGRAPHY.H5Regular : TYPOGRAPHY.H5Bold, { color: historyFavPicker == 2 ? COLORS.white : COLORS.inputHintText, alignSelf: 'center' }]}>{strings.favorite}</Text>
                    </View>
                </TouchableOpacity>
            </View>

            {loadingHistory ?
                <View /> :
                <Text style={[TYPOGRAPHY.H6Regular, { color: COLORS.inputHintText, alignSelf: 'center', marginBottom: 8 }]}>{historyFavPicker == 1 ? historyData.length : historyData.length} {strings.result}</Text>
            }
            {loadingHistory ?
                <ActivityIndicator /> :
                historyData.length == 0 ?
                    <NoWordView subject={historyFavPicker == 1 ? strings.history : strings.favorite} />
                    :
                    <FlatList
                        data={historyData}
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
    customHeaderContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'black',
        paddingTop: 16,
        paddingBottom: 8,
        paddingLeft: 32,
        paddingRight: 24,
        shadowColor: 'white',
        shadowOffset: {
            width: 3,
            height: 5,
        },
        shadowOpacity: 0.1,
        shadowRadius: 15,
    },
    headerText: {
        fontSize: 33,
        color: COLORS.white,
        fontWeight: '400',
        fontFamily: 'DMSerifDisplay-Regular'
    },
    historyFavGroup: {
        flexDirection: 'row',
        marginBottom: 8,
        borderRadius: 20,
        borderWidth: 1,
        justifyContent: 'center',
        marginHorizontal: 32,
        padding: 5
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