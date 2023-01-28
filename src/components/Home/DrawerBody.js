import { Pressable, StyleSheet, View } from 'react-native'
import React from 'react'
import CustomText from '../Reusable/CustomText'
import { useSelector } from 'react-redux'
import FastImage from 'react-native-fast-image'
import ICONS from '../../icons/icons'
import { useNavigation } from '@react-navigation/native'

const DrawerBody = () => {

    const { colors } = useSelector(state => state.theme)
    const navigation = useNavigation()


    return (
        <View>
            <View style={[styles.textContainer, { borderBottomColor: colors['SHADELIGHT'] }]}>
                <FastImage
                    source={{ uri: ICONS.ICON_CATEGORIES_INACTIVE }}
                    style={{ height: 20, width: 20 }}
                    tintColor={colors['DARK']}
                />
                <CustomText color={colors['DARK']} weight='bold' size={14} left={20} >
                    Shop by Categories
                </CustomText>
            </View>
            <Pressable onPress={() => navigation.navigate('Profile')} style={[styles.textContainer, { borderBottomColor: colors['SHADELIGHT'] }]}>
                <FastImage
                    source={{ uri: ICONS.ICON_ORDERS }}
                    style={{ height: 20, width: 20 }}
                    tintColor={colors['DARK']}
                />
                <CustomText color={colors['DARK']} size={14} left={20}>
                    Orders
                </CustomText>
            </Pressable>
            <Pressable>
                <CustomText left={55} vertical={15} top={25} color={colors['DARK']}>
                    FAQs
                </CustomText>
            </Pressable>
            <Pressable>
                <CustomText left={55} vertical={15} color={colors['DARK']}>
                    CONTACT US
                </CustomText>
            </Pressable>
            <Pressable>
                <CustomText left={55} vertical={15} color={colors['DARK']}>
                    LEGAL
                </CustomText>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    textContainer: {
        paddingVertical: 25,
        flexDirection: 'row',
        borderBottomWidth: 1,
        paddingHorizontal: 15,
        alignItems: 'center',
    },
})

export default DrawerBody