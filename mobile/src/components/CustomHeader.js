import React from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Text,
    ImageBackground,
} from 'react-native';
import { COLORS } from '../utils/colors';
import { ArrowLeft, VocanIcon, ChevronLeft } from './icons';

const HomeBasicHeader = ({
    navigation,
    title = '',
    isNavBack = false,
    type = '',
    ...props
}) => {

    const forwardBack = () => {
        navigation.goBack();
    };

    return (
        <>
            {isNavBack ? (
                <View style={styles.container} {...props}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => { forwardBack }} activeOpacity={0.8} style={{ marginRight: 4 }}>
                            <ChevronLeft width={32} height={32} color="#124BDC" />
                        </TouchableOpacity>
                        <Text
                            style={[styles.textNavFalse]}>
                            {title}
                        </Text>
                    </View>
                    <VocanIcon width="42" height="42" />
                </View>
            ) : (
                <View style={styles.container} {...props}>
                    <Text style={styles.textNavFalse}>{title}</Text>
                    <VocanIcon width="42" height="42" />
                </View>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
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
    textNavFalse: {
        fontSize: 33,
        color: COLORS.white,
        fontWeight: '400',
        fontFamily: 'DMSerifDisplay-Regular'
    },
    textNavTrue: {
        fontSize: 21,
        color: 'white',
        fontWeight: '500',
    },
    textGame: {
        fontSize: 15,
        flexWrap: 'wrap',
        flex: 1,
        paddingHorizontal: 20,
        textAlign: 'center',
    },
    dividerSub: {
        borderBottomWidth: 1,
        borderRadius: 4,
        width: '100%',
    },
    arrowLeftContainer: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 8,
    },
    backgroundImage: {
        alignItems: 'flex-start',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.06,
        shadowRadius: 6,
    },
    backgroundImageHome: {
        alignItems: 'center',
        flex: 1,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.06,
        shadowRadius: 6,
    },
});

export default HomeBasicHeader;
