import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import CustomText from '../components/Reusable/CustomText'
import Form from '../components/Profile/Form'
import { StackActions, useNavigation } from '@react-navigation/native'
import CustomLoader from '../components/Reusable/CustomLoader'

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
                <CustomText style={styles.text}>Complete your sign up</CustomText>
            </View>
            <Form setSubmitted={setSubmitted} />
            {submitted && <View style={styles.overlay}>
                <CustomLoader />
            </View>}
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
    text: {
        color: 'black',
        fontSize: 18,
        fontWeight: '700'
    },
    container: {
        backgroundColor: 'white',
        flex: 1
    },
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.7)',
        width: ' 100%',
        height: '100%',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default RegistrationScreen