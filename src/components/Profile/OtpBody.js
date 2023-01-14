import { View, Text, StyleSheet, Pressable, Keyboard, TextInput, Alert } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import CustomText from '../Reusable/CustomText'
import axios from 'axios'
import { Config } from 'react-native-config'
import { StackActions, useFocusEffect, useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { setPhone } from '../../redux/userSlice'
import { removeListener, startOtpListener } from 'react-native-otp-verify'

const OtpBody = ({ phone }) => {

    const [otp, setOtp] = useState('')
    const dispatch = useDispatch()

    const text1 = useRef(null)
    const [time, setTime] = useState(5)

    const [cleared, setCleared] = useState(false)

    const handleTextChange = value => {
        if (otp.length <= 4 && value.length <= 4) setOtp(value)
    }

    const navigation = useNavigation()

    let timer;

    useFocusEffect(
        useCallback(() => {
            timer = setInterval(() => {
                setTime(prev => prev - 1)
            }, 1000)
            return () => {
                clearInterval(timer)
            }
        }, [])
    )

    useFocusEffect(
        useCallback(() => {

            if (time > 0 && cleared === true) {
                timer = setInterval(() => {
                    setTime(15)
                    setCleared(false)
                }, 1000)
            }

            if (time === 0) {
                clearInterval(timer)
                setCleared(true)
            }
        }, [time, cleared])
    )

    useFocusEffect(
        useCallback(() => {
            startOtpListener(message => {
                if (message !== null) {
                    const otp = /(\d{4})/g.exec(message)[1];
                    setOtp(otp);
                }
            });
            return () => removeListener()
        }, [])
    )

    useEffect(() => {
        if (otp.length === 4) {
            // here send http request
            axios.post(`${Config.OTP_API_KEY}/authenticate/verifyotp`, {
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

    const handleLoginWithPassword = () => {
        navigation.navigate('Password', {
            phone
        })
    }

    const resendOtp = () => {
        axios.post(`${Config.OTP_API_KEY}/authenticate/loginorsignup`, {
            phoneNumber: '+91 ' + phone
        })
            .then(res => {
                const data = res.data

                if (data.status === true) {
                    setTime(15)
                }
            })
            .catch(err => {
                console.log("Err: ", err)
            })
    }


    return (
        <View style={styles.container}>
            <CustomText weight={'light'} style={styles.title}>
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
                {time <= 0 ?
                    <View style={styles.textInnerContainer}>
                        <CustomText style={styles.text}>Did not reveive OTP?</CustomText>
                        <Pressable onPress={resendOtp}>
                            <CustomText weight={'light'} style={styles.highlight}> Resend OTP</CustomText>
                        </Pressable>
                    </View> :
                    <View style={styles.textInnerContainer}>
                        <CustomText style={styles.light}>Trying to auto-fill OTP</CustomText>
                        <CustomText style={styles.text}> 00:{(time + '').padStart(2)}</CustomText>
                    </View>
                }
                <View style={styles.textInnerContainer}>
                    <CustomText style={styles.text}>Log in using </CustomText>
                    <Pressable onPress={handleLoginWithPassword}>
                        <CustomText weight={'light'} style={styles.highlight}>Password</CustomText>
                    </Pressable>
                </View>
                <View style={styles.textInnerContainer}>
                    <CustomText style={styles.text}>Having trouble logging in? </CustomText>
                    <Pressable>
                        <CustomText weight={'light'} style={styles.highlight}>Get help</CustomText>
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
    },
    light: {
        color: '#bbbbbb',
        fontSize: 12
    }
})

export default OtpBody