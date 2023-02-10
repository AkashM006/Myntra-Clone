import { View, StyleSheet, TouchableOpacity } from 'react-native'
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
            <TouchableOpacity style={{ padding: 5 }} onPress={() => navigation.goBack()}>
                <FastImage
                    source={{ uri: ICONS.ICON_BACK }}
                    style={{ height: 25, width: 25 }}
                    tintColor={colors['DARK']}
                />
            </TouchableOpacity>
            <CustomText weight='bold' size={14} left={10} color={colors['DARK']}>
                HELP CENTER
            </CustomText>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 60,
        paddingHorizontal: '3.5%',
        flexDirection: 'row',
        alignItems: 'center',
    }
})

export default Header