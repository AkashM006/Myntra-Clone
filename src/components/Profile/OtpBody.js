import { View, Text, StyleSheet, Pressable, Keyboard, TextInput, Alert } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import CustomText from '../Reusable/CustomText'
import axios from 'axios'
import { Config } from 'react-native-config'
import { StackActions, useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { setPhone } from '../../redux/userSlice'

const OtpBody = ({ phone }) => {

    const [otp, setOtp] = useState('')
    const dispatch = useDispatch()

    const text1 = useRef(null)

    const handleTextChange = value => {
        if (otp.length <= 4 && value.length <= 4) setOtp(value)
    }

    const navigation = useNavigation()

    useEffect(() => {
        if (otp.length === 4) {
            // here send http request
            axios.post(`${Config.API_KEY}/authenticate/verifyotp`, {
                phoneNumber: '+91 ' + phone,
                otp
            })
                .then(res => {
                    const data = res.data
                    dispatch(setPhone(phone))
                    if (data.status === true) {
                        if (data.message === 'New User') { // then redirect to registration page
                            navigation.navigate('Registration')
                        } else { // then existing user redirect back
                            const popAction = StackActions.pop(2)
                            navigation.dispatch(popAction)
                        }
                    } else {
                        Alert.alert('Whoops!', data.message)
                    }

                })
                .catch(err => {
                    console.log("Err: ", err)
                })
        }
    }, [otp])

    const focused = _ => text1.current.focus()


    return (
        <View style={styles.container}>
            <CustomText style={styles.title}>
                Verify with OTP
            </CustomText>
            <CustomText style={styles.subtitle}>
                Sent via SMS to {phone}
            </CustomText>
            <View style={styles.numberContainer}>
                <TextInput style={styles.number} cursorColor='white' defaultValue={otp.charAt(0)} maxLength={1} textAlign='center' keyboardType='decimal-pad' onFocus={focused} />
                <TextInput style={styles.number} cursorColor='white' defaultValue={otp.charAt(1)} maxLength={1} textAlign='center' keyboardType='decimal-pad' onFocus={focused} />
                <TextInput style={styles.number} cursorColor='white' defaultValue={otp.charAt(2)} maxLength={1} textAlign='center' keyboardType='decimal-pad' onFocus={focused} />
                <TextInput style={styles.number} cursorColor='white' defaultValue={otp.charAt(3)} maxLength={1} textAlign='center' keyboardType='decimal-pad' onFocus={focused} />
                <TextInput value={otp} style={{ opacity: 1 }} cursorColor='white' ref={text1} keyboardType='decimal-pad' onChangeText={handleTextChange} />
            </View>
            <View style={styles.textContainer}>
                <View style={styles.textInnerContainer}>
                    <CustomText style={styles.text}>Did not reveive OTP?</CustomText>
                    <Pressable>
                        <CustomText style={styles.highlight}> Resend OTP</CustomText>
                    </Pressable>
                </View>
                <View style={styles.textInnerContainer}>
                    <CustomText style={styles.text}>Log in using </CustomText>
                    <Pressable>
                        <CustomText style={styles.highlight}>Password</CustomText>
                    </Pressable>
                </View>
                <View style={styles.textInnerContainer}>
                    <CustomText style={styles.text}>Having trouble logging in? </CustomText>
                    <Pressable>
                        <CustomText style={styles.highlight}>Get help</CustomText>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        color: '#717171',
        fontSize: 12
    },
    highlight: {
        color: '#ff406c',
        fontSize: 12,
        fontWeight: '700'
    },
    textInnerContainer: {
        flexDirection: 'row',
        marginTop: 30
    },
    textContainer: {
    },
    container: {
        backgroundColor: 'white',
        marginTop: 50,
        paddingHorizontal: 40
    },
    title: {
        color: 'black',
        fontWeight: '700',
        fontSize: 24,
        marginBottom: 10
    },
    subtitle: {
        color: '#bfbfbf',
        fontSize: 12,
        marginBottom: 20
    },
    number: {
        borderColor: '#aaaaaa',
        borderWidth: 1,
        padding: 10,
        borderRadius: 3,
        marginRight: 10,
        width: 35,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        color: 'black'
    },
    numberContainer: {
        flexDirection: 'row',
        marginTop: 10
    }
})

export default OtpBody