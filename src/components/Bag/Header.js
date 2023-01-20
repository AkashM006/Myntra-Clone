import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import CustomText from '../Reusable/CustomText'
import { useNavigation } from '@react-navigation/native'

const Header = () => {

    const navigation = useNavigation()

    const backHandler = () => { navigation.goBack() }
    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <TouchableOpacity onPress={backHandler}>
                    <Image
                        source={require('../../icons/back.png')}
                    />
                </TouchableOpacity>
                <CustomText left={10} weight='light' size={16}>
                    SHOPPING BAG
                </CustomText>
            </View>
            <TouchableOpacity>
                <Image source={require('../../icons/heart.png')} style={{ height: 25, width: 25 }} />
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