import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import CustomText from '../components/Reusable/CustomText'
import Form from '../components/Profile/Form'

const RegistrationScreen = () => {
    const backHandler = () => {

    }
    return (
        <View style={styles.container}>
            <View style={styles.haederContainer}>
                <TouchableOpacity style={styles.back} onPress={backHandler}>
                    <Image source={require('../icons/back.png')} />
                </TouchableOpacity>
                <CustomText style={styles.text}>Complete your sign up</CustomText>
            </View>
            <Form />
        </View>
    )
}

const styles = StyleSheet.create({
    haederContainer: {
        backgroundColor: 'white',
        paddingVertical: 20,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    back: {
        marginRight: 20
    },
    text: {
        color: 'black',
        fontSize: 18,
        fontWeight: '700'
    },
    container: {
        backgroundColor: 'white',
        flex: 1
    }
})

export default RegistrationScreen