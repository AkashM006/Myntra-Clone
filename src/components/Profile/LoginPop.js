import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Keyboard, ActivityIndicator, BackHandler, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Animated, { interpolate, interpolateColor, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { setLoginPopUpStatus } from '../../redux/uiSlice'
import CustomText from '../Reusable/CustomText'
import axios from 'axios'
import { Config } from 'react-native-config'
import { useNavigation } from '@react-navigation/native'

const LoginPop = () => {

    const visible = useSelector(state => state.ui.isLoginPopUpVisible)

    const visibility = useSharedValue(0)
    const submitting = useSharedValue(0)

    const dispatch = useDispatch()
    const navigation = useNavigation()

    const [phone, setPhone] = useState('')
    const [err, setErr] = useState(null)
    const [submitted, setSubmitted] = useState(false)

    const backActionHandler = () => {
        if (visibility.value === 1) {
            dispatch(setLoginPopUpStatus(false))
            setPhone('')
            setErr(null)
            setSubmitted(false)
            return true
        }
        setPhone('')
        setErr(null)
        setSubmitted(false)
        return false
    }

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', backActionHandler)

        return () => {
            backHandler.remove()
        }
    }, [phone])

    const rStyle = useAnimatedStyle(() => {
        return {
            transform: [{
                translateY: interpolate(visibility.value, [0, 1], [500, 0])
            }],
            backgroundColor: interpolateColor(submitting.value, [0, 1], ['rgba(255,255,255,1)', 'rgba(255,255,255,0.6)'])
        }
    }, [])

    useEffect(() => {

        let target = (visible === true) ? 1 : 0

        visibility.value = withTiming(target, { duration: 300 })

        if (visible === false) Keyboard.dismiss()
    }, [visible])

    const closeHandler = () => {
        dispatch(setLoginPopUpStatus(false))
        setErr(null)
        setPhone('')
    }

    useEffect(() => {
        if (err !== null) {
            validatePhone(phone)
        }

        const keyboardListener = Keyboard.addListener('keyboardDidHide', () => { validatePhone(phone) })

        return () => {
            keyboardListener.remove()
        }

    }, [phone])

    const termsHandler = () => { }
    const policyHandler = () => { }

    const validatePhone = (ph) => {

        if (ph.trim().length !== 10) {
            setErr('Phone number should be 10 digits long')
            return false
        }

        let k = [',', '.', '_', '-']
        let x = [...ph]
        for (let i of k) {
            if (x.includes(i)) {
                setErr('Please enter a valid phone number')
                return false
            }
        }
        if (isNaN(+ph)) {
            setErr('Please enter a valid phone number')
            return false
        }

        setErr(null)
        return true
    }

    const submitHandler = async () => {
        let isValid = validatePhone(phone)

        if (isValid) { // then proceed
            // then send request
            // disable the entire popup
            // then close it
            // then redirect to another page
            Keyboard.dismiss()
            setSubmitted(true)

            axios.post(`${Config.API_KEY}/authenticate/loginorsignup`, {
                phoneNumber: '+91 ' + phone
            })
                .then(res => {
                    const data = res.data

                    if (data.status === true) {
                        // then navigate to next page
                        navigation.navigate('Otp', {
                            phone,
                        })
                        setSubmitted(false)
                        dispatch(setLoginPopUpStatus(false))
                        setErr(null)
                        setPhone('')
                    } else {
                        // alert regarding the error
                        Alert.alert('Whoops!', data.message)
                        setSubmitted(false)
                    }
                })
                .catch(err => {
                    setSubmitted(false)
                    console.log("Err: ", err)
                })

        } else {
            setErr('Please enter valid mobile number')
        }
    }

    const textChangeHandler = newPhone => {
        setPhone(newPhone)
    }

    return (
        <Animated.View style={[styles.container, rStyle]}>
            {submitted && <View style={[styles.modal, { backgroundColor: submitted === true ? 'rgba(0,0,0,0.7)' : 'rgba(0,0,0,0)', }]}>
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size={'small'} color={'#FF69B4'} style={styles.loader} />
                </View>
            </View>}
            <View style={styles.iconContainer}>
                <Image source={require('../../icons/logo.png')} style={{ width: 40, height: 40 }} />
                <TouchableOpacity onPress={closeHandler}>
                    <Image source={require('../../icons/close.png')} style={{ width: 25, height: 25 }} />
                </TouchableOpacity>
            </View>
            <View>
                <View style={styles.titleContainer}>
                    <CustomText style={styles.bold}>
                        Login
                    </CustomText>
                    <CustomText style={styles.thin}>
                        {' '} or {' '}
                    </CustomText>
                    <CustomText style={styles.bold}>
                        Signup
                    </CustomText>
                </View>
                <Animated.View style={[styles.inputContainer, { borderColor: (err !== null) ? 'red' : '#717171', }]}>
                    <View style={styles.countryCode}>
                        <CustomText style={styles.countryCodeText}>
                            +91
                        </CustomText>
                    </View>
                    <View style={styles.separator} />
                    <TextInput
                        keyboardType='number-pad'
                        placeholder='Mobile Number'
                        placeholderTextColor={'#c5c5c5'}
                        style={styles.input}
                        maxLength={10}
                        defaultValue={phone}
                        onChangeText={textChangeHandler}
                    />
                </Animated.View>
                {err && <CustomText style={{ color: 'red' }}>
                    {err}
                </CustomText>}
                <View style={styles.termsContainer}>
                    <CustomText style={styles.text}>
                        By continuing I agree to the
                        <Text onPress={termsHandler}>
                            <CustomText style={styles.highlight}>
                                { } Terms of Use { }
                            </CustomText>
                        </Text>
                        { } & { }
                        <Text onPress={policyHandler}>
                            <CustomText style={styles.highlight}>
                                Privacy Policy
                            </CustomText>
                        </Text>
                    </CustomText>
                </View>
                <TouchableOpacity onPress={submitHandler} style={styles.button}>
                    <CustomText style={styles.buttonText}>CONTINUE</CustomText>
                </TouchableOpacity>
                <View style={styles.helpContainer}>
                    <CustomText style={styles.text}>
                        Having trouble logging in?
                        <Text>
                            <CustomText style={styles.highlight}>
                                { } Get help
                            </CustomText>
                        </Text>
                    </CustomText>
                </View>
            </View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    input: { marginLeft: 10, color: '#717171', flex: 1, paddingHorizontal: 5 },
    inputContainer: {
        marginTop: 20,
        borderWidth: 1,
        borderRadius: 2,
        flexDirection: 'row',
    },
    buttonText: {
        fontWeight: '700',
        color: 'white',
    },
    countryCode: {
        justifyContent: 'center',
        padding: 10,
    },
    helpContainer: { marginTop: 20 },
    text: { color: '#717171', fontSize: 16 },
    highlight: { color: '#ff406c', fontSize: 16 },
    countryCodeText: { color: '#717171', },
    button: {
        backgroundColor: '#ff406c',
        marginTop: 20,
        padding: 20,
        alignItems: 'center',
        borderRadius: 3,
        paddingVertical: 15
    },
    separator: {
        backgroundColor: '#717171',
        height: '30%',
        width: 1,
        alignSelf: 'center'
    },
    termsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20
    },
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        height: 450,
        transform: [{ translateY: 500 }],
        zIndex: 11,
        paddingTop: 20,
        paddingHorizontal: 30
    },
    icon: {
        height: 40,
        width: 40
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    bold: {
        fontWeight: '700',
        color: 'black',
        fontSize: 18
    },
    thin: {
        fontSize: 14,
        color: '#71727c',
    },
    titleContainer: {
        flexDirection: 'row',
        marginTop: 20,
        alignItems: 'center',
    },
    modal: {
        position: 'absolute',
        flex: 1,
        zIndex: 12,
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loaderContainer: {
        backgroundColor: 'white',
        alignSelf: 'center',
        borderRadius: 200,
        padding: 5
    }
})

export default LoginPop