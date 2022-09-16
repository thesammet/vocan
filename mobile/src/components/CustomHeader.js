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
                        <TouchableOpacity onPress={() => { forwardBack() }} activeOpacity={0.8} style={{ marginRight: 4 }}>
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
    },
    textNavFalse: {
        fontSize: 33,
        color: COLORS.white,
        fontWeight: '400',
        fontFamily: 'DMSerifDisplay-Regular'
    },
});

export default HomeBasicHeader;
