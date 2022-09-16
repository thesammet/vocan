import React, { useContext } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Dimensions
} from 'react-native';
import { strings } from '../../utils/localization';
import TYPOGRAPHY from '../../utils/typography'
import { COLORS } from '../../utils/colors'
import { VocanIcon } from '../../components/icons';
import CustomButton from '../../components/CustomButton';
import { GuestContext } from '../../context/Guest';

const UnauthorizedSettings = ({ navigation }) => {
    const windowHeight = Dimensions.get('window').height;
    let { removeGuest } = useContext(GuestContext)
    return (
        <View style={styles.container}>
            <VocanIcon width="100" height="100" style={{ alignSelf: 'center' }} />
            <View style={styles.mustLoginView}>
                <Text style={[TYPOGRAPHY.H4Regular, { color: COLORS.inputHintText, alignSelf: 'center', textAlign: 'center' }]}>{strings.mustLogin}</Text>
            </View>
            <View style={styles.loginButtonStyle}>

                <CustomButton
                    verticalPadding={windowHeight / 50}
                    title={strings.login}
                    onPress={() => {
                        removeGuest()
                    }}
                    disabled={false} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.black,
        justifyContent: 'center',
    },
    mustLoginView: {
        marginTop: 18,
        marginHorizontal: 48
    },
    loginButtonStyle: {
        marginTop: 32,
        marginHorizontal: 48
    }
})

export default UnauthorizedSettings