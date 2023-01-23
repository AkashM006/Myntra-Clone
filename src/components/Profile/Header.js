import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import CustomText from '../Reusable/CustomText'
import { useNavigation } from '@react-navigation/native'
import FastImage from 'react-native-fast-image'
import ICONS from '../../icons/icons'

const Header = ({ title }) => {

    const navigation = useNavigation()

    const backHandler = () => {
        navigation.goBack()
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={backHandler}>
                <FastImage source={{ uri: ICONS.ICON_BACK }} />
            </TouchableOpacity>
            <CustomText size={16} weight='light' left={10}>
                {title}
            </CustomText>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: 60,
        elevation: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: '3.5%',
    }
})

export default Header