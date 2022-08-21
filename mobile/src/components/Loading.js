import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { COLORS } from '../utils/colors'
const Loading = () => {
    return (
        <View style={styles.loading}>
            <ActivityIndicator size="large" color={COLORS.paleBlue} />
        </View>
    );
};

const styles = StyleSheet.create({
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.black,
        elevation: 10,
        zIndex: 10,
    },
});

export default Loading;
