import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import CustomText from '../Reusable/CustomText'
import { useNavigation } from '@react-navigation/native'
import FastImage from 'react-native-fast-image'
import ICONS from '../../icons/icons'
import { useSelector } from 'react-redux'

const Header = ({ title, backPressHandler }) => {

    const navigation = useNavigation()
    const { colors } = useSelector(state => state.theme)

    const backHandler = () => {
        if (backPressHandler) backPressHandler()
        else navigation.goBack()
    }

    return (
        <View style={[styles.container, { backgroundColor: colors['LIGHT'] }]}>
            <TouchableOpacity onPress={backHandler}>
                <FastImage style={{ height: 25, width: 25 }} tintColor={colors['DARK']} source={{ uri: ICONS.ICON_BACK }} />
            </TouchableOpacity>
            <CustomText size={16} weight='light' left={10} color={colors['DARK']}>
                {title}
            </CustomText>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 60,
        elevation: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: '3.5%',
    }
})

export default Header