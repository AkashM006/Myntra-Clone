import { StyleSheet, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import CustomText from '../Reusable/CustomText'
import FastImage from 'react-native-fast-image'
import ICONS from '../../icons/icons'
import MoreQueries from './MoreQueries'

const Body = () => {

    const { colors } = useSelector(state => state.theme)

    return (
        <View style={[{ backgroundColor: colors['LIGHT'] }, styles.container]}>
            <View style={styles.headerContainer}>
                <View style={{ width: '50%' }}>
                    <CustomText weight='light' size={24} color={colors['DARK']}>Help Center</CustomText>
                    <CustomText size={14} color={colors['SHADEDARK']}>
                        Please get in touch and we will be happy to help you
                    </CustomText>
                </View>
                <FastImage
                    source={{ uri: ICONS.ICON_CUSTOMER_CARE }}
                    style={{ height: 150, width: '50%', }}
                    resizeMode='contain'
                />
            </View>
            <MoreQueries />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: '5%',
    },
    headerContainer: {
        flexDirection: 'row',
        width: '100%',
        height: 170,
        justifyContent: 'space-between',
        alignItems: 'center',
    }
})

export default Body