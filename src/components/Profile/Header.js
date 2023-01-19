import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import CustomText from '../Reusable/CustomText'
import { useNavigation } from '@react-navigation/native'

const Header = ({ title }) => {

    const navigation = useNavigation()

    const backHandler = () => {
        navigation.goBack()
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={backHandler}>
                <Image source={require('../../icons/back.png')} />
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