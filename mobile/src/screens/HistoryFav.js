import React, { useState } from 'react';
import {
    Text, View, StyleSheet, TouchableOpacity, FlatList
} from 'react-native';
import TYPOGRAPHY from '../utils/typography'
import { COLORS } from '../utils/colors'
import HomeBasicHeader from '../components/CustomHeader';
import HistoryItem from '../components/HistoryItem';
import FavItem from '../components/FavItem';

const HistoryFav = ({ navigation }) => {
    const DATA = [
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            title: 'First Item',
        },
        {
            id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
            title: 'Second Item',
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d72',
            title: 'Third Item',
        },
        {
            id: '58294a0f-3da1-471f-bd96-145571e29d72',
            title: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
        },
    ];

    const DATA2 = [
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            title: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
        },
        {
            id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
            title: 'Turkish',
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d72',
            title: 'Spanish',
        },
        {
            id: '58494a0f-3da1-471f-bd96-145571e29d72',
            title: 'Arabic',
        },
    ];
    const [historyFavPicker, setHistoryFavPicker] = useState(1)
    const [historyData, setHistoryData] = useState(DATA)
    const [favData, setFavData] = useState(DATA2)

    const Item = ({ title }) => (
        (historyFavPicker == 1 ? <HistoryItem title={title} /> : <FavItem title={title} />)
    );
    const renderItem = ({ item }) => (
        <Item title={item.title} />
    );

    return (
        <View style={styles.container}>
            <HomeBasicHeader
                navigation={navigation}
                title="History/Fav"
                isNavBack={false}
            />
            <View style={[styles.historyFavGroup, { backgroundColor: COLORS.inputBg }]}>
                <TouchableOpacity activeOpacity={.5} style={{ width: '50%' }} onPress={() => { setHistoryFavPicker(1) }}>
                    <View style={{ padding: 16, backgroundColor: historyFavPicker == 1 ? COLORS.pickedFavHisColor : 'transparent', borderRadius: historyFavPicker == 1 ? 16 : 0, }}>
                        <Text style={[historyFavPicker == 1 ? TYPOGRAPHY.H5Regular : TYPOGRAPHY.H5Bold, { color: historyFavPicker == 1 ? COLORS.white : COLORS.inputHintText, alignSelf: 'center' }]}>History</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={.5} style={{ width: '50%', }} onPress={() => { setHistoryFavPicker(2) }}>
                    <View style={{ padding: 16, backgroundColor: historyFavPicker == 2 ? COLORS.pickedFavHisColor : 'transparent', borderRadius: historyFavPicker == 2 ? 16 : 0, }}>
                        <Text style={[historyFavPicker == 2 ? TYPOGRAPHY.H5Regular : TYPOGRAPHY.H5Bold, { color: historyFavPicker == 2 ? COLORS.white : COLORS.inputHintText, alignSelf: 'center' }]}>Favorite</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <FlatList
                data={historyFavPicker == 1 ? historyData : favData}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
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
})

export default HistoryFav