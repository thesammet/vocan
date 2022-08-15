import React from 'react';
import {
    Text, View, StyleSheet
} from 'react-native';
import TYPOGRAPHY from '../utils/typography'
import { COLORS } from '../utils/colors'
import HomeBasicHeader from '../components/CustomHeader';
const SettingsScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <HomeBasicHeader
                navigation={navigation}
                title="Settings"
                isNavBack={false}
            />
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.black,
    }
})
export default SettingsScreen