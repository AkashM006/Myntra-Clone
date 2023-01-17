import { View, StyleSheet, Pressable, Keyboard, TextInput, Alert } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import CustomText from '../Reusable/CustomText'
import axios from 'axios'
import { Config } from 'react-native-config'
import { StackActions, useFocusEffect, useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { setPhone, setToken } from '../../redux/userSlice'
import { removeListener, startOtpListener } from 'react-native-otp-verify'
import COLORS from '../../constants/Colors'

const OtpBody = ({ phone, setSubmitted }) => {

    const [otp, setOtp] = useState('')
    const dispatch = useDispatch()

    const text1 = useRef(null)
    const [time, setTime] = useState(15)

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
                    try {
                        const otp = /(\d{4})/g.exec(message)[1];
                        setOtp(otp);
                    } catch (err) {
                        console.log("Err: ", err)
                    }
                }
            });
            return () => removeListener()
        }, [])
    )

    useEffect(() => {
        if (otp.length === 4) {
            // here send http request
            setSubmitted(true)
            Keyboard.dismiss()
            axios.post(`${Config.OTP_API_KEY}/authenticate/verifyotp`, {
                phoneNumber: '+91 ' + phone,
                otp
            })
                .then(res => {
                    // console.log("Res: ", res.data)
                    setSubmitted(false)
                    const data = res.data
                    if (data.status === true) {
                        dispatch(setPhone(phone))
                        if (data.message === 'New User') navigation.navigate('Registration')
                        else {
                            const jwt = data.data.jwt
                            dispatch(setToken(jwt))
                            navigation.dispatch(StackActions.popToTop())
                        }

                    } else Alert.alert('Whoops!', data.message)


                })
                .catch(err => {
                    console.log("Err: ", err)
                    setSubmitted(false)
                    Alert.alert('Whoops!', 'Something went wrong. Please try again later!')
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

                if (data.status === true) setTime(15)
                else Alert.alert("Whoops!", 'Something went wrong! Please try again later')
            })
            .catch(err => {
                Alert.alert("Whoops!", 'Something went wrong! Please try again later')
                console.log("Err: ", err)
            })
    }


    return (
        <View style={styles.container}>
            <CustomText weight={'light'} size={24}>
                Verify with OTP
            </CustomText>
            <CustomText bottom={20} vertical={10} color={COLORS.SHADELIGHT}>
                Sent via SMS to {phone}
            </CustomText>
            <View style={styles.numberContainer}>
                <TextInput style={styles.number} cursorColor='white' defaultValue={otp.charAt(0)} maxLength={1} textAlign='center' keyboardType='decimal-pad' onFocus={focused} />
                <TextInput style={styles.number} cursorColor='white' defaultValue={otp.charAt(1)} maxLength={1} textAlign='center' keyboardType='decimal-pad' onFocus={focused} />
                <TextInput style={styles.number} cursorColor='white' defaultValue={otp.charAt(2)} maxLength={1} textAlign='center' keyboardType='decimal-pad' onFocus={focused} />
                <TextInput style={styles.number} cursorColor='white' defaultValue={otp.charAt(3)} maxLength={1} textAlign='center' keyboardType='decimal-pad' onFocus={focused} />
                <TextInput
                    value={otp}
                    accessible={false}
                    style={{ color: 'white' }}
                    cursorColor='white'
                    ref={text1}
                    keyboardType='decimal-pad'
                    onChangeText={handleTextChange}
                    contextMenuHidden={true}
                />
            </View>
            <View style={styles.textContainer}>
                {time <= 0 ?
                    <View style={styles.textInnerContainer}>
                        <CustomText color={COLORS.SHADEDARK}>Did not reveive OTP?</CustomText>
                        <Pressable onPress={resendOtp}>
                            <CustomText weight={'light'} color={COLORS.PRIMARY}> Resend OTP</CustomText>
                        </Pressable>
                    </View> :
                    <View style={styles.textInnerContainer}>
                        <CustomText color={COLORS.SHADELIGHT}>Trying to auto-fill OTP</CustomText>
                        <CustomText color={COLORS.SHADEDARK}> 00:{(time + '').padStart(2, '0')}</CustomText>
                    </View>
                }
                <View style={styles.textInnerContainer}>
                    <CustomText color={COLORS.SHADEDARK}>Log in using </CustomText>
                    <Pressable onPress={handleLoginWithPassword}>
                        <CustomText weight={'light'} color={COLORS.PRIMARY}>Password</CustomText>
                    </Pressable>
                </View>
                <View style={styles.textInnerContainer}>
                    <CustomText color={COLORS.SHADEDARK}>Having trouble logging in? </CustomText>
                    <Pressable>
                        <CustomText weight={'light'} color={COLORS.PRIMARY}>Get help</CustomText>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
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
})

export default OtpBody