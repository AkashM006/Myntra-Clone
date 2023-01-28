import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import FastImage from 'react-native-fast-image'
import ICONS from '../../icons/icons'
import CustomText from '../../components/Reusable/CustomText'
import { useNavigation } from '@react-navigation/native'

const Header = () => {

    const { colors } = useSelector(state => state.theme)
    const { items } = useSelector(state => state.wishlist)
    const navigation = useNavigation()

    const backHandler = () => navigation.goBack()

    return (
        <View style={[styles.container, { backgroundColor: colors['LIGHT'] }]}>
            <View style={styles.innerContainer}>
                <TouchableOpacity onPress={backHandler}>
                    <FastImage
                        tintColor={colors['DARK']}
                        source={{ uri: ICONS.ICON_BACK }}
                        resizeMode={FastImage.resizeMode.contain}
                        style={{ height: 25, width: 25 }}
                    />
                </TouchableOpacity>
                <View>
                    <CustomText color={colors['DARK']} left={10} weight='light' size={16}>
                        SHOPPING BAG
                    </CustomText>
                    <CustomText left={10} color={colors['SHADEDARK']}>
                        {items.length} Items
                    </CustomText>
                </View>
            </View>
            {items.length > 0 && <View>

            </View>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 60,
        elevation: 3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: '3.5%'
    },
    innerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    }
})

export default Header