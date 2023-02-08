import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import FastImage from 'react-native-fast-image'
import ICONS from '../../icons/icons'
import CustomText from '../Reusable/CustomText'
import { useNavigation } from '@react-navigation/native'

const Header = () => {

    const { colors } = useSelector(state => state.theme)
    const navigation = useNavigation()

    return (
        <View style={[styles.container, { backgroundColor: colors['LIGHT'] }]}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.button}>
                <FastImage
                    source={{ uri: ICONS.ICON_BACK }}
                    style={{ height: 25, width: 25 }}
                    tintColor={colors['DARK']}
                />
            </TouchableOpacity>
            <CustomText left={10} weight='bold' size={14} color={colors['DARK']}>
                NOTIFICATIONS
            </CustomText>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 60,
        paddingHorizontal: '3.5%',
        elevation: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        padding: 5
    }
})

export default Header