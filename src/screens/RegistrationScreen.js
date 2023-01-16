import { View, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import CustomText from '../components/Reusable/CustomText'
import Form from '../components/Profile/Form'
import { StackActions, useNavigation } from '@react-navigation/native'
import Overlay from '../components/Reusable/Overlay'

const RegistrationScreen = () => {

    const navigation = useNavigation()

    const [submitted, setSubmitted] = useState(false)

    const backHandler = () => {
        if (navigation.canGoBack) {
            setSubmitted(false)
            navigation.dispatch(StackActions.popToTop())
        }
    }
    return (
        <ScrollView style={styles.container}>
            <View style={styles.haederContainer}>
                <TouchableOpacity style={styles.back} onPress={backHandler}>
                    <Image source={require('../icons/back.png')} />
                </TouchableOpacity>
                <CustomText weight={'light'} size={18}>Complete your sign up</CustomText>
            </View>
            <Form setSubmitted={setSubmitted} submitted={submitted} />
            <Overlay render={submitted} />
        </ScrollView>
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
    container: {
        backgroundColor: 'white',
        flex: 1
    },
})

export default RegistrationScreen