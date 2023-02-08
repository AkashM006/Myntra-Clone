import { View } from 'react-native'
import React from 'react'
import CustomText from '../Reusable/CustomText'
import { useSelector } from 'react-redux'
import FastImage from 'react-native-fast-image'
import ICONS from '../../icons/icons'

const Empty = () => {

    const { colors } = useSelector(state => state.theme)

    return (
        <View style={{ flex: 1, backgroundColor: colors['LIGHT'], alignItems: 'center', paddingTop: 50, paddingHorizontal: '15%' }}>
            <FastImage
                source={{ uri: ICONS.ICON_NO_NOTIFICATION }}
                style={{ width: '100%', height: 150 }}
                resizeMode='contain'
            />
            <CustomText color={colors['DARK']} align='center' size={16} weight='bold' top={20}>
                NO NOTIFICATIONS
            </CustomText>
            <CustomText color={colors['SHADEDARK']} align='center' size={14} top={10}>
                We will notify you once we have something for you
            </CustomText>
        </View>
    )
}

export default Empty