import React, { useState, useEffect, useContext } from 'react';
import {
    Text, View, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator, Keyboard
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
import { SearchInputView } from '../components/SearchInputView';

const HistoryFav = ({ navigation }) => {
    const [historyFavPicker, setHistoryFavPicker] = useState(1)
    const [historyData, setHistoryData] = useState([])
    const { token } = useContext(AuthContext)
    const [loadingHistory, setLoadingHistory] = useState(null)
    const [sortingOption, setSortingOption] = useState(0)
    const [filterAlphabetic, setFilterAlphabetic] = useState(false)
    const [filterDescending, setFilterDescending] = useState(false)
    const [filteredData, setFilteredData] = useState([])
    const [searchText, setSearchText] = useState("")

    const getAllWords = async (fav, filter) => {
        setLoadingHistory(true)
        let response = await getAllWordsHistory(token, `${fav == 2 ? "fav=true" : ""}&sortBy=createdAt:${filter ? "asc" : "desc"}`);
        if (response.error) {
            customFailMessage(strings.customFailMessage1)
        } else {
            setHistoryData(response.data)
            setFilteredData(response.data)
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
        filterAlphabetic ? setFilteredData([].concat(historyData).sort((a, b) => (b.main > a.main) ? 1 : -1)) : setFilteredData([].concat(historyData).sort((a, b) => (a.main > b.main) ? 1 : -1))
        setFilterAlphabetic(!filterAlphabetic)
    }

    const searchAlgorithm = (text) => {
        if (text) {
            const newData = historyData.filter(function (item) {
                const itemData = item.main
                    ? item.main.toUpperCase()
                    : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setFilteredData(newData);
            setSearchText(text);
        } else {
            // Inserted text is blank
            // Update FilteredDataSource with masterDataSource
            setFilteredData(historyData);
            setSearchText(text);
        }
    };

    const searchOut = () => {
        setSearchText('');
        Keyboard.dismiss();
        setFilteredData(historyData);
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
                    <TouchableOpacity activeOpacity={.5} onPress={() => {
                        setSortingOption(1);
                        searchOut()
                        sortingOption == 1 && setSortingOption(0)
                    }}>
                        {sortingOption == 1 ? <FilterBold width="32" height="32" /> : <Filter width="32" height="32" />}
                    </TouchableOpacity>
                    <View style={{ width: 8 }} />
                    <TouchableOpacity activeOpacity={.5} onPress={() => {
                        setSortingOption(2);
                        searchOut()
                        sortingOption == 2 && setSortingOption(0)
                    }}>
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
                sortingOption == 2 ?
                    <View style={{ marginHorizontal: 32, marginTop: 20 }}>
                        <SearchInputView
                            placeholder={strings.search}
                            value={searchText}
                            onChangeText={(value) => { setSearchText(value); searchAlgorithm(value) }}
                            edit={true}
                            clearText={() => { setSearchText(''); Keyboard.dismiss(); setFilteredData(historyData) }}
                            text={searchText}
                        />
                    </View>
                    : <View />
            }

            <View style={[styles.historyFavGroup, { backgroundColor: COLORS.inputBg }]}>
                <TouchableOpacity activeOpacity={.5} style={{ width: '50%' }} onPress={() => {
                    setHistoryFavPicker(1)
                    getAllWords(1, filterDescending)
                    searchOut()
                }}>
                    <View style={{ padding: 16, backgroundColor: historyFavPicker == 1 ? COLORS.pickedFavHisColor : 'transparent', borderRadius: historyFavPicker == 1 ? 16 : 0, }}>
                        <Text style={[historyFavPicker == 1 ? TYPOGRAPHY.H5Regular : TYPOGRAPHY.H5Bold, { color: historyFavPicker == 1 ? COLORS.white : COLORS.inputHintText, alignSelf: 'center' }]}>{strings.history}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={.5} style={{ width: '50%', }} onPress={() => {
                    setHistoryFavPicker(2)
                    getAllWords(2, filterDescending)
                    searchOut()
                }}>
                    <View style={{ padding: 16, backgroundColor: historyFavPicker == 2 ? COLORS.pickedFavHisColor : 'transparent', borderRadius: historyFavPicker == 2 ? 16 : 0, }}>
                        <Text style={[historyFavPicker == 2 ? TYPOGRAPHY.H5Regular : TYPOGRAPHY.H5Bold, { color: historyFavPicker == 2 ? COLORS.white : COLORS.inputHintText, alignSelf: 'center' }]}>{strings.favorite}</Text>
                    </View>
                </TouchableOpacity>
            </View>

            {loadingHistory ?
                <View /> :
                <Text style={[TYPOGRAPHY.H6Regular, { color: COLORS.inputHintText, alignSelf: 'center', marginBottom: 8 }]}>{historyFavPicker == 1 ? filteredData.length : filteredData.length} {strings.result}</Text>
            }
            {loadingHistory ?
                <View style={{ marginTop: 8 }}>
                    <ActivityIndicator color={COLORS.paleBlue} />
                </View> :
                filteredData.length == 0 ?
                    <NoWordView subject={historyFavPicker == 1 ? strings.history : strings.favorite} />
                    :
                    <FlatList
                        data={filteredData}
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
        padding: 5,
        marginTop: 20
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

    },
    innerContainer: {
        flex: 1,
    },
})

export default HistoryFav