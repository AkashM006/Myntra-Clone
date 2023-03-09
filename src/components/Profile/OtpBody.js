import { View, StyleSheet, Pressable, Keyboard, TextInput } from 'react-native'
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import CustomText from '../Reusable/CustomText'
import axios from 'axios'
import { Config } from 'react-native-config'
import { StackActions, useFocusEffect, useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { logout, setField, setPhone, setProfile, setToken } from '../../redux/userSlice'
// import { removeListener, startOtpListener } from 'react-native-otp-verify'
import OtpAutocomplete from 'react-native-otp-autocomplete'
import COLORS from '../../constants/Colors'
import { showToast } from '../../utils/utils'
import DeferredActionContext from '../../context/deferredActionContext'

const OtpBody = ({ phone, setSubmitted, isVerify, type, newUser }) => {

    const [otp, setOtp] = useState('')
    const dispatch = useDispatch()

    const text1 = useRef(null)
    const [time, setTime] = useState(15)

    const [cleared, setCleared] = useState(false)

    const [err, setErr] = useState(null)

    const handleTextChange = value => {
        if (otp.length <= 4 && value.length <= 4) setOtp(value)
    }

    const navigation = useNavigation()
    const user = useSelector(state => state.user.user)

    const {state, contextDispatch} = useContext(DeferredActionContext)

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

    const otpHandler = message => {
        try {
            const otp = /(\d{4})/g.exec(message)[1];
            setOtp(otp)
            OtpAutocomplete.removeListener();
            Keyboard.dismiss();
        } catch (error) {
            console.log("Error in OtpBody.js: ", error)
        }
    }

    const startListening = _ => {
        OtpAutocomplete.getOtp()
            .then(p => OtpAutocomplete.addListener(otpHandler))
            .catch(err => console.log("Error in OtpBody.js: ", err))
    }

    useFocusEffect(
        useCallback(() => {
            startListening()
            return () => OtpAutocomplete.removeListener()
        }, [startListening])
    )

    useEffect(() => {
        if (otp.length !== 4) return
        if (isVerify) {
            setSubmitted(true)
            Keyboard.dismiss()

            axios.post(`${Config.API_KEY}/profile/update/verifyotp`, {
                phoneNumber: phone.charAt(0) === '+' ? phone : '+91 ' + phone,
                otp
            })
                .then(async res => {
                    const data = res.data
                    if (data.status === false) {
                        setErr(data.message)
                        setSubmitted(false)
                        return
                    }
                    if (type === 'mobile') { // for editing mobile number
                        setSubmitted(false)
                        navigation.dispatch(StackActions.pop(1))
                        navigation.navigate('EditMobile')
                    }
                    else if (type === 'newMobile') {
                        // todo : send request to change mobile number and then navigate away
                        try {
                            const result = await axios.put(`${Config.API_KEY}/profile/updatenumber`, {
                                oldNumber: user.mobileNumber,
                                newNumber: phone.charAt(0) === '+' ? phone : '+91 ' + phone
                            })
                            const { data } = result
                            if (data.status) {
                                setSubmitted(false)
                                navigation.dispatch(StackActions.pop(3))
                                const token = data.data.jwt
                                console.log('Submitted: ', data)
                                dispatch(setToken(token))
                                showToast('Phone number updated successfully!')
                            } else {
                                setSubmitted(false)
                                showToast(data.message)
                            }
                        } catch (err) {
                            console.log("Error: ", err)
                            showToast('Something went wrong. Please try again later')
                            setSubmitted(false)
                        }
                    }
                    else if (type === 'save') { // for saving user
                        try {
                            const result = await axios.post(`${Config.API_KEY}/profile/update`, {
                                ...newUser
                            })
                            if (!result.status) {
                                showToast(result.message)
                                return
                            } else {
                                showToast('User details updated')
                                navigation.dispatch(StackActions.pop(2))
                                dispatch(setProfile(newUser))
                            }
                        } catch (err) {
                            console.log("Error: ", err)
                            showToast('Something went wrong. Please try again later')
                        }
                    }
                })
                .catch(err => {
                    console.log("Err: ", err)
                    setSubmitted(false)
                    showToast('Something went wrong. Please try again later!')
                })

        } else { // for login
            setSubmitted(true)
            Keyboard.dismiss()
            axios.post(`${Config.API_KEY}/loginorsignup/verifyotp`, {
                phoneNumber: '+91 ' + phone,
                otp
            })
                .then(res => {
                    setSubmitted(false)
                    const data = res.data
                    if (data.status === true) {
                        dispatch(setPhone(phone))
                        if (data.message === 'New User') navigation.navigate('Registration')
                        else {
                            const jwt = data.data.jwt
                            dispatch(setToken(jwt))
                            navigation.dispatch(StackActions.pop(1))
                            console.log('Callback: ', state.callback)
                            state.callback()
                            contextDispatch({
                                type: 'done'
                            })
                        }

                    } else setErr(data.message)


                })
                .catch(err => {
                    console.log("Err: ", err)
                    setSubmitted(false)
                    showToast('Something went wrong. Please try again later!')
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
        axios.post(`${Config.API_KEY}/loginorsignup/sendotp`, {
            phoneNumber: '+91 ' + phone
        })
            .then(res => {
                const data = res.data

                if (data.status === true) setTime(15)
                else showToast(data.message)
            })
            .catch(err => {
                showToast('Something went wrong! Please try again later!')
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
                {err &&
                    <CustomText top={20} color={COLORS.DANGER} >
                        {err}
                    </CustomText>
                }
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
                {!isVerify && <>
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
                </>}
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