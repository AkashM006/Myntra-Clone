import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FastImage from 'react-native-fast-image'
import ICONS from '../../icons/icons'
import CustomText from '../../components/Reusable/CustomText'
import { useNavigation } from '@react-navigation/native'
import { clearSelected, setIsEditing } from '../../redux/wishlistSlice'

const Header = () => {

    const { colors } = useSelector(state => state.theme)
    const { items, isEditing, selected } = useSelector(state => state.wishlist)
    const navigation = useNavigation()
    const dispatch = useDispatch()

    const backHandler = () => navigation.goBack()

    const editHandler = () => {
        if (!isEditing) dispatch(setIsEditing(true))
        else dispatch(clearSelected())
    }

    return (
        <View style={[styles.container, { backgroundColor: colors['LIGHT'] }]}>
            <View style={styles.innerContainer}>
                <TouchableOpacity onPress={backHandler}>
                    <FastImage
                        tintColor={colors['DARK']}
                        source={{ uri: ICONS.ICON_BACK }}
                        resizeMode={FastImage.resizeMode.contain}
                        style={styles.icon}
                    />
                </TouchableOpacity>
                <View>
                    <CustomText color={colors['DARK']} left={10} weight='light' size={16}>
                        WISHLIST
                    </CustomText>
                    <CustomText left={10} color={colors['SHADEDARK']}>
                        {items.length} Items
                    </CustomText>
                </View>
            </View>
            {items.length > 0 && <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={editHandler}>
                    <FastImage
                        source={{ uri: isEditing ? ICONS.ICON_DELETE : ICONS.ICON_EDIT }}
                        style={[styles.icon, styles.right]}
                        tintColor={isEditing && selected.length === 1 ? colors['SHADELIGHT'] : colors['DARK']}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <FastImage
                        source={{ uri: isEditing ? ICONS.ICON_SHARE : ICONS.ICON_BAG }}
                        style={[styles.icon, styles.right]}
                        tintColor={isEditing && selected.length === 1 ? colors['SHADELIGHT'] : colors['DARK']}
                    />
                </TouchableOpacity>
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
    },
    icon: { height: 25, width: 25 },
    right: { marginRight: 15 }
})

export default Header