import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import CustomText from '../Reusable/CustomText'
import { useNavigation } from '@react-navigation/native'
import ICONS from '../../icons/icons'
import FastImage from 'react-native-fast-image'

const Header = () => {

    const navigation = useNavigation()

    const backHandler = () => { navigation.goBack() }
    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <TouchableOpacity onPress={backHandler}>
                    <FastImage
                        source={{ uri: ICONS.ICON_BACK }}
                        resizeMode={FastImage.resizeMode.contain}
                        style={{ height: 25, width: 25 }}
                    />
                </TouchableOpacity>
                <CustomText left={10} weight='light' size={16}>
                    SHOPPING BAG
                </CustomText>
            </View>
            <TouchableOpacity>
                <FastImage source={{ uri: ICONS.ICON_HEART }} style={{ height: 25, width: 25 }} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
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
        borderColor: 'black',
    }
})

export default Header